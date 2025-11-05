// assets/data/mock-data.js
// Storage keys
const STORAGE_KEYS = {
    INVENTORY: 'inventory_data',
    SALES: 'sales_data',
    PURCHASES: 'purchases_data',
    USERS: 'users_data'
};

// Mock inventory data
const mockInventory = [
    { id: 1, name: 'Designer Gown', category: 'Clothing', quantity: 15, price: 25000, lowStockThreshold: 5 },
    { id: 2, name: 'Leather Handbag', category: 'Accessories', quantity: 3, price: 15000, lowStockThreshold: 5 },
    { id: 3, name: 'High Heels', category: 'Footwear', quantity: 8, price: 12000, lowStockThreshold: 4 },
    { id: 4, name: 'Silk Scarf', category: 'Accessories', quantity: 20, price: 5000, lowStockThreshold: 8 },
    { id: 5, name: 'Ankara Dress', category: 'Clothing', quantity: 2, price: 18000, lowStockThreshold: 5 }
];

// Mock sales data with recent transactions
const mockSales = [
    { id: 1, itemId: 1, quantity: 2, total: 50000, date: '2025-07-29T10:00:00Z' },
    { id: 2, itemId: 3, quantity: 1, total: 12000, date: '2025-07-29T11:30:00Z' },
    { id: 3, itemId: 2, quantity: 1, total: 15000, date: '2025-07-29T14:15:00Z' },
    { id: 4, itemId: 5, quantity: 1, total: 18000, date: '2025-07-29T16:45:00Z' }
];

// Mock users data
const mockUsers = [
    {
        id: 1,
        username: 'admin',
        password: 'admin123',
        name: 'Admin User',
        role: 'admin',
        email: 'admin@boutique.com',
        lastLogin: '2025-07-29T09:00:00Z'
    }
];

export function getStorageKey(key) {
    return STORAGE_KEYS[key];
}

export function initializeMockData() {
    if (!localStorage.getItem(STORAGE_KEYS.INVENTORY)) {
        localStorage.setItem(STORAGE_KEYS.INVENTORY, JSON.stringify(mockInventory));
    }
    if (!localStorage.getItem(STORAGE_KEYS.SALES)) {
        localStorage.setItem(STORAGE_KEYS.SALES, JSON.stringify(mockSales));
    }
    if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
        localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(mockUsers));
    }
}