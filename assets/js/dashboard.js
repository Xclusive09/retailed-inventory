import { getAllItems } from './inventory.js';
import { getAllSales, getSalesStats } from './sales.js';
import { getAllPurchases } from './purchase.js';
import { getCurrentUser } from './auth.js';
import { getData } from './utils.js';

export default class Dashboard {
    constructor() {
        this.salesChart = null;
        this.init();
    }

    async init() {
        await this.loadDashboardData();
        this.setupEventListeners();
        this.initializeCharts();
        this.updateRecentActivities();
        this.updateLowStockAlerts();
    }

    async loadDashboardData() {
        const items = getAllItems();
        const sales = getAllSales();
        const purchases = getAllPurchases();
        const salesStats = getSalesStats();

        // Update stats cards
        this.updateStatsCards(items, sales, salesStats);
    }

    updateStatsCards(items, sales, salesStats) {
        // Total Sales
        const totalSalesEl = document.getElementById('total-sales');
        if (totalSalesEl) {
            totalSalesEl.textContent = `₦${sales.reduce((sum, sale) => sum + (sale.finalTotal || sale.total), 0).toLocaleString()}`;
        }

        // Total Items
        const totalItemsEl = document.getElementById('total-items');
        if (totalItemsEl) {
            totalItemsEl.textContent = items.reduce((sum, item) => sum + item.quantity, 0).toLocaleString();
        }

        // Low Stock Count
        const lowStockEl = document.getElementById('low-stock-count');
        if (lowStockEl) {
            const lowStockCount = items.filter(item => item.quantity <= item.lowStockThreshold).length;
            lowStockEl.textContent = lowStockCount;
        }

        // Total Revenue
        const totalRevenueEl = document.getElementById('total-revenue');
        if (totalRevenueEl) {
            const currentMonth = new Date().getMonth();
            const monthlyRevenue = sales
                .filter(sale => new Date(sale.date).getMonth() === currentMonth)
                .reduce((sum, sale) => sum + (sale.finalTotal || sale.total), 0);
            totalRevenueEl.textContent = `₦${monthlyRevenue.toLocaleString()}`;
        }
    }

    initializeCharts() {
        const salesChartCanvas = document.getElementById('salesChart');
        if (salesChartCanvas && window.Chart) {
            const ctx = salesChartCanvas.getContext('2d');

            // Get last 7 days of sales data
            const salesData = this.getSalesChartData();

            this.salesChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: salesData.labels,
                    datasets: [{
                        label: 'Daily Sales',
                        data: salesData.values,
                        borderColor: 'rgb(59, 130, 246)',
                        backgroundColor: 'rgba(59, 130, 246, 0.1)',
                        tension: 0.4,
                        fill: true
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                callback: function(value) {
                                    return '₦' + value.toLocaleString();
                                }
                            }
                        }
                    }
                }
            });
        }
    }

    getSalesChartData() {
        const sales = getAllSales();
        const last7Days = [];
        const today = new Date();

        // Generate last 7 days
        for (let i = 6; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);
            last7Days.push(date.toDateString());
        }

        const salesByDay = {};
        last7Days.forEach(day => salesByDay[day] = 0);

        sales.forEach(sale => {
            const saleDate = new Date(sale.date).toDateString();
            if (salesByDay.hasOwnProperty(saleDate)) {
                salesByDay[saleDate] += sale.finalTotal || sale.total;
            }
        });

        return {
            labels: last7Days.map(day => {
                const date = new Date(day);
                return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
            }),
            values: last7Days.map(day => salesByDay[day])
        };
    }

    updateRecentActivities() {
        const activitiesContainer = document.getElementById('recent-activities');
        if (!activitiesContainer) return;

        const sales = getAllSales().slice(-5).reverse();
        const purchases = getAllPurchases().slice(-3).reverse();

        let activities = [];

        // Add recent sales
        sales.forEach(sale => {
            activities.push({
                type: 'sale',
                message: `Sale of ${sale.itemName || 'Multiple items'}`,
                amount: `₦${(sale.finalTotal || sale.total).toLocaleString()}`,
                time: this.getTimeAgo(sale.date),
                icon: 'fa-shopping-cart',
                iconColor: 'text-green-600'
            });
        });

        // Add recent purchases
        purchases.forEach(purchase => {
            activities.push({
                type: 'purchase',
                message: `Purchase: ${purchase.itemName}`,
                amount: `₦${purchase.total.toLocaleString()}`,
                time: this.getTimeAgo(purchase.date),
                icon: 'fa-truck',
                iconColor: 'text-blue-600'
            });
        });

        // Sort by time and take latest 5
        activities = activities.slice(0, 5);

        activitiesContainer.innerHTML = activities.map(activity => `
            <div class="flex items-center space-x-3">
                <div class="flex-shrink-0">
                    <div class="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                        <i class="fas ${activity.icon} ${activity.iconColor}"></i>
                    </div>
                </div>
                <div class="flex-1 min-w-0">
                    <p class="text-sm font-medium text-gray-900">${activity.message}</p>
                    <p class="text-sm text-gray-500">${activity.time}</p>
                </div>
                <div class="text-sm font-semibold text-gray-900">
                    ${activity.amount}
                </div>
            </div>
        `).join('');
    }

    updateLowStockAlerts() {
        const alertsContainer = document.getElementById('low-stock-alerts');
        if (!alertsContainer) return;

        const items = getAllItems();
        const lowStockItems = items.filter(item => item.quantity <= item.lowStockThreshold);

        if (lowStockItems.length === 0) {
            alertsContainer.innerHTML = `
                <div class="text-center py-8">
                    <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i class="fas fa-check-circle text-green-600 text-2xl"></i>
                    </div>
                    <p class="text-gray-500">No low stock alerts</p>
                </div>
            `;
            return;
        }

        alertsContainer.innerHTML = lowStockItems.map(item => `
            <div class="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-200">
                <div class="flex items-center space-x-3">
                    <div class="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                        <i class="fas fa-exclamation-triangle text-red-600"></i>
                    </div>
                    <div>
                        <p class="text-sm font-medium text-gray-900">${item.name}</p>
                        <p class="text-sm text-gray-500">Only ${item.quantity} left (threshold: ${item.lowStockThreshold})</p>
                    </div>
                </div>
                <button onclick="reorderItem(${item.id})" class="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    Reorder
                </button>
            </div>
        `).join('');
    }

    getTimeAgo(dateString) {
        const now = new Date();
        const date = new Date(dateString);
        const diffInMinutes = Math.floor((now - date) / (1000 * 60));

        if (diffInMinutes < 1) return 'Just now';
        if (diffInMinutes < 60) return `${diffInMinutes}m ago`;

        const diffInHours = Math.floor(diffInMinutes / 60);
        if (diffInHours < 24) return `${diffInHours}h ago`;

        const diffInDays = Math.floor(diffInHours / 24);
        return `${diffInDays}d ago`;
    }

    setupEventListeners() {
        // Refresh dashboard
        const refreshBtn = document.getElementById('refresh-dashboard');
        if (refreshBtn) {
            refreshBtn.addEventListener('click', () => this.loadDashboardData());
        }
    }
}

// Global functions
window.reorderItem = function(itemId) {
    window.location.href = `/pages/purchase.html?reorder=${itemId}`;
};

// Auto-initialize if imported directly
if (typeof window !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
        new Dashboard();
    });
}

// Mock data update function
function updateDashboardStats() {
    const data = getData();
    const today = new Date().toISOString().split('T')[0];
    
    // Calculate total sales
    const totalSales = data.sales.reduce((sum, sale) => sum + sale.total, 0);
    document.getElementById('total-sales').textContent = `₦${totalSales.toLocaleString()}`;
    
    // Count total items
    const totalItems = data.inventory.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('total-items').textContent = totalItems.toString();
    
    // Count low stock items
    const lowStockCount = data.inventory.filter(item => item.quantity <= item.lowStockThreshold).length;
    document.getElementById('low-stock-count').textContent = lowStockCount.toString();
    
    // Calculate total revenue
    const todaysSales = data.sales
        .filter(sale => sale.date.startsWith(today))
        .reduce((sum, sale) => sum + sale.total, 0);
    document.getElementById('total-revenue').textContent = `₦${todaysSales.toLocaleString()}`;
    
    // Update low stock table
    updateLowStockTable(data.inventory);
    
    // Update recent activities
    updateRecentActivities(data.sales);
    
    // Initialize sales chart
    initializeSalesChart(data.sales);
}

function updateLowStockTable(inventory) {
    const lowStockItems = inventory.filter(item => item.quantity <= item.lowStockThreshold);
    const tbody = document.getElementById('low-stock-items');
    
    tbody.innerHTML = lowStockItems.map(item => `
        <tr>
            <td class="px-6 py-4 whitespace-nowrap">${item.name}</td>
            <td class="px-6 py-4 whitespace-nowrap">${item.quantity}</td>
            <td class="px-6 py-4 whitespace-nowrap">${item.lowStockThreshold}</td>
            <td class="px-6 py-4 whitespace-nowrap">${item.category}</td>
            <td class="px-6 py-4 whitespace-nowrap">
                <button class="text-blue-600 hover:text-blue-800" onclick="location.href='/pages/inventory.html'">
                    <i class="fas fa-edit"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

function updateRecentActivities(sales) {
    const recentSales = sales.slice(-5).reverse();
    const activitiesDiv = document.getElementById('recent-activities');
    
    activitiesDiv.innerHTML = recentSales.map(sale => `
        <div class="flex items-center space-x-4">
            <div class="flex-shrink-0">
                <span class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <i class="fas fa-shopping-cart text-green-600"></i>
                </span>
            </div>
            <div class="flex-1">
                <p class="text-sm font-medium text-gray-900">
                    New sale recorded
                </p>
                <p class="text-sm text-gray-500">
                    Total: ₦${sale.total.toLocaleString()}
                </p>
            </div>
            <div class="text-sm text-gray-500">
                ${new Date(sale.date).toLocaleTimeString()}
            </div>
        </div>
    `).join('');
}

function initializeSalesChart(sales) {
    const ctx = document.getElementById('salesChart').getContext('2d');
    const dailySales = {};
    
    sales.forEach(sale => {
        const date = sale.date.split('T')[0];
        dailySales[date] = (dailySales[date] || 0) + sale.total;
    });
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: Object.keys(dailySales),
            datasets: [{
                label: 'Daily Sales',
                data: Object.values(dailySales),
                borderColor: '#2563eb',
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: value => '₦' + value.toLocaleString()
                    }
                }
            }
        }
    });
}

// Initialize dashboard
updateDashboardStats();
setInterval(updateDashboardStats, 30000); // Update every 30 seconds