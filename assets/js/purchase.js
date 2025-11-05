import { getStorageKey } from '../data/mock-data.js';
import { updateItem, getItemById } from './inventory.js';

// Purchase functions
export function getAllPurchases() {
    return JSON.parse(localStorage.getItem(getStorageKey('PURCHASES'))) || [];
}

export function addPurchase(purchaseData) {
    const purchases = getAllPurchases();
    const newPurchase = {
        id: Math.max(...purchases.map(p => p.id), 0) + 1,
        ...purchaseData,
        date: new Date().toISOString(),
        invoiceNumber: purchaseData.invoiceNumber || generateInvoiceNumber(),
        status: 'pending'
    };

    purchases.push(newPurchase);
    localStorage.setItem(getStorageKey('PURCHASES'), JSON.stringify(purchases));

    // Update inventory quantity
    const item = getItemById(purchaseData.itemId);
    if (item) {
        item.quantity += purchaseData.quantity;
        item.lastUpdated = new Date().toISOString();
        updateItem(item.id, item);
    }

    return newPurchase;
}

export function updatePurchase(id, updateData) {
    const purchases = getAllPurchases();
    const index = purchases.findIndex(p => p.id === id);

    if (index !== -1) {
        purchases[index] = { ...purchases[index], ...updateData };
        localStorage.setItem(getStorageKey('PURCHASES'), JSON.stringify(purchases));
        return purchases[index];
    }

    throw new Error('Purchase not found');
}

export function deletePurchase(id) {
    const purchases = getAllPurchases();
    const purchase = purchases.find(p => p.id === id);

    if (purchase) {
        // Adjust inventory if purchase was delivered
        if (purchase.status === 'delivered') {
            const item = getItemById(purchase.itemId);
            if (item) {
                item.quantity -= purchase.quantity;
                updateItem(item.id, item);
            }
        }
    }

    const updatedPurchases = purchases.filter(p => p.id !== id);
    localStorage.setItem(getStorageKey('PURCHASES'), JSON.stringify(updatedPurchases));
}

export function getPurchaseStats() {
    const purchases = getAllPurchases();
    const suppliers = new Set(purchases.map(p => p.supplier)).size;

    return {
        totalPurchases: purchases.length,
        totalSpent: purchases.reduce((sum, p) => sum + p.total, 0),
        pendingOrders: purchases.filter(p => p.status === 'pending').length,
        suppliersCount: suppliers
    };
}

function generateInvoiceNumber() {
    const timestamp = Date.now().toString().slice(-6);
    return `PUR-${timestamp}`;
}

export function getPurchaseById(id) {
    const purchases = getAllPurchases();
    return purchases.find(p => p.id === id);
}