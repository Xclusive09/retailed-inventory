// Get data from localStorage
export const getData = () => {
    return {
        inventory: JSON.parse(localStorage.getItem('inventory_data') || '[]'),
        sales: JSON.parse(localStorage.getItem('sales_data') || '[]'),
        purchases: JSON.parse(localStorage.getItem('purchases_data') || '[]')
    };
};

// Save data to localStorage
export const saveData = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
};

// Update item quantity
export const updateItemQuantity = (itemId, changeAmount) => {
    const data = getData();
    const item = data.inventory.find(i => i.id === itemId);
    if (item) {
        item.quantity += changeAmount;
        item.lastUpdated = new Date().toISOString();
        saveData('inventory_data', data.inventory);
    }
};

// Format date
export const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-NG', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};

// Format currency (Naira)
export const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: 'NGN',
        minimumFractionDigits: 0
    }).format(amount);
};

// Validate input
export const validateInput = (value, type) => {
    switch(type) {
        case 'number':
            return !isNaN(value) && value >= 0;
        case 'string':
            return value.trim().length > 0;
        default:
            return false;
    }
};

// Generate unique ID
export const generateId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
};
