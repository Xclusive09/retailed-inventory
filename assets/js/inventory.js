import { getStorageKey } from '../data/mock-data.js';

// Inventory functions
export function getAllItems() {
  return JSON.parse(localStorage.getItem(getStorageKey('INVENTORY'))) || [];
}

export function addItem(itemData) {
  const items = getAllItems();
  const newItem = {
    id: Math.max(...items.map(item => item.id), 0) + 1,
    ...itemData,
    dateAdded: new Date().toISOString(),
    lastUpdated: new Date().toISOString()
  };

  items.push(newItem);
  localStorage.setItem(getStorageKey('INVENTORY'), JSON.stringify(items));
  return newItem;
}

export function updateItem(id, itemData) {
  const items = getAllItems();
  const index = items.findIndex(item => item.id === id);

  if (index !== -1) {
    items[index] = {
      ...items[index],
      ...itemData,
      lastUpdated: new Date().toISOString()
    };
    localStorage.setItem(getStorageKey('INVENTORY'), JSON.stringify(items));
    return items[index];
  }

  throw new Error('Item not found');
}

export function deleteItem(id) {
  const items = getAllItems();
  const updatedItems = items.filter(item => item.id !== id);
  localStorage.setItem(getStorageKey('INVENTORY'), JSON.stringify(updatedItems));
}

export function getItemById(id) {
  const items = getAllItems();
  return items.find(item => item.id === id);
}

export function getLowStockItems() {
  const items = getAllItems();
  return items.filter(item => item.quantity <= item.lowStockThreshold);
}

export function searchItems(searchTerm, category, stockFilter) {
  const items = getAllItems();

  return items.filter(item => {
    const matchesSearch = !searchTerm ||
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.sku && item.sku.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.brand && item.brand.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory = !category || item.category === category;

    let matchesStock = true;
    if (stockFilter === 'low') matchesStock = item.quantity <= item.lowStockThreshold;
    else if (stockFilter === 'in-stock') matchesStock = item.quantity > item.lowStockThreshold;
    else if (stockFilter === 'out-of-stock') matchesStock = item.quantity === 0;

    return matchesSearch && matchesCategory && matchesStock;
  });
}

export function getInventoryStats() {
  const items = getAllItems();
  const totalValue = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const lowStockCount = items.filter(item => item.quantity <= item.lowStockThreshold).length;
  const categories = new Set(items.map(item => item.category)).size;

  return {
    totalItems: items.length,
    totalValue,
    lowStockCount,
    categories
  };
}