// components/sidebar.js
export function insertSidebar(activePage = '') {
    return `
        <div class="bg-blue-800 text-white w-64 flex-shrink-0 flex flex-col">
            <div class="px-6 py-4 border-b border-blue-700">
                <h1 class="text-xl font-bold">Boutique Inventory</h1>
            </div>
            <nav class="flex-1 overflow-y-auto py-4">
                <a href="/pages/dashboard.html" 
                   class="flex items-center px-6 py-3 ${activePage === 'dashboard' ? 'bg-blue-900' : 'hover:bg-blue-700'}"
                   data-tooltip="Dashboard Overview">
                    <i class="fas fa-chart-line w-5 mr-3"></i>
                    <span>Dashboard</span>
                </a>
                <a href="/pages/inventory.html" 
                   class="flex items-center px-6 py-3 ${activePage === 'inventory' ? 'bg-blue-900' : 'hover:bg-blue-700'}"
                   data-tooltip="Manage Inventory">
                    <i class="fas fa-box w-5 mr-3"></i>
                    <span>Inventory</span>
                </a>
                <a href="/pages/sales.html" 
                   class="flex items-center px-6 py-3 ${activePage === 'sales' ? 'bg-blue-900' : 'hover:bg-blue-700'}"
                   data-tooltip="Sales Management">
                    <i class="fas fa-shopping-cart w-5 mr-3"></i>
                    <span>Sales</span>
                </a>
                <a href="/pages/purchase.html" 
                   class="flex items-center px-6 py-3 ${activePage === 'purchase' ? 'bg-blue-900' : 'hover:bg-blue-700'}"
                   data-tooltip="Purchase Orders">
                    <i class="fas fa-truck w-5 mr-3"></i>
                    <span>Purchases</span>
                </a>
                <a href="/pages/settings.html" 
                   class="flex items-center px-6 py-3 ${activePage === 'settings' ? 'bg-blue-900' : 'hover:bg-blue-700'}"
                   data-tooltip="System Settings">
                    <i class="fas fa-cog w-5 mr-3"></i>
                    <span>Settings</span>
                </a>
            </nav>
            <div class="px-6 py-4 border-t border-blue-700">
                <button onclick="logout()" class="flex items-center text-white hover:text-blue-200">
                    <i class="fas fa-sign-out-alt w-5 mr-3"></i>
                    <span>Logout</span>
                </button>
            </div>
        </div>
    `;
}

// Global functions for sidebar functionality
window.toggleMobileSidebar = function() {
    const overlay = document.getElementById('mobile-sidebar-overlay');
    const sidebar = overlay.querySelector('aside');

    if (overlay.classList.contains('hidden')) {
        overlay.classList.remove('hidden');
        setTimeout(() => {
            sidebar.classList.remove('-translate-x-full');
        }, 10);
    } else {
        sidebar.classList.add('-translate-x-full');
        setTimeout(() => {
            overlay.classList.add('hidden');
        }, 300);
    }
};

window.logout = function() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('current_user');
        window.location.href = '/index.html';
    }
};

// Add mobile menu button functionality
document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', toggleMobileSidebar);
    }
});