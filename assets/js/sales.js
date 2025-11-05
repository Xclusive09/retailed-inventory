
import { getStorageKey } from '../data/mock-data.js';
import { getAllItems, updateItem } from './inventory.js';

// Sales functions
export function getAllSales() {
    return JSON.parse(localStorage.getItem(getStorageKey('SALES'))) || [];
}

export function addSale(saleData) {
    const sales = getAllSales();
    const newSale = {
        id: Math.max(...sales.map(s => s.id), 0) + 1,
        ...saleData,
        date: new Date().toISOString()
    };

    sales.push(newSale);
    localStorage.setItem(getStorageKey('SALES'), JSON.stringify(sales));

    // Update inventory quantities
    saleData.items.forEach(item => {
        const inventoryItem = JSON.parse(localStorage.getItem(getStorageKey('INVENTORY')))
            .find(inv => inv.id === item.itemId);
        if (inventoryItem) {
            inventoryItem.quantity -= item.quantity;
            inventoryItem.lastUpdated = new Date().toISOString();
            updateItem(inventoryItem.id, inventoryItem);
        }
    });

    return newSale;
}

export function getSalesStats() {
    const sales = getAllSales();
    const today = new Date().toDateString();

    const todaySales = sales.filter(sale =>
        new Date(sale.date).toDateString() === today
    );

    return {
        todayTotal: todaySales.reduce((sum, sale) => sum + sale.finalTotal, 0),
        totalTransactions: sales.length,
        averageSale: sales.length > 0 ?
            sales.reduce((sum, sale) => sum + sale.finalTotal, 0) / sales.length : 0,
        bestSeller: getBestSellingItem()
    };
}

function getBestSellingItem() {
    const sales = getAllSales();
    const itemCounts = {};

    sales.forEach(sale => {
        if (sale.items) {
            sale.items.forEach(item => {
                itemCounts[item.itemName] = (itemCounts[item.itemName] || 0) + item.quantity;
            });
        } else {
            // Legacy single item sales
            itemCounts[sale.itemName] = (itemCounts[sale.itemName] || 0) + sale.quantity;
        }
    });

    const bestSeller = Object.keys(itemCounts).reduce((a, b) =>
        itemCounts[a] > itemCounts[b] ? a : b, '');

    return bestSeller || 'N/A';
}

export function deleteSale(id) {
    const sales = getAllSales();
    const updatedSales = sales.filter(sale => sale.id !== id);
    localStorage.setItem(getStorageKey('SALES'), JSON.stringify(updatedSales));
}

export function getSaleById(id) {
    const sales = getAllSales();
    return sales.find(sale => sale.id === id);
}