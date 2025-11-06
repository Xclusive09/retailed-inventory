// Mock data for inventory categories
export const categories = [
    { id: 1, name: 'Clothing', description: 'Fashion wear and apparel' },
    { id: 2, name: 'Accessories', description: 'Bags, jewelry, and other accessories' },
    { id: 3, name: 'Footwear', description: 'Shoes, sandals, and boots' },
    { id: 4, name: 'Traditional', description: 'Traditional and cultural wear' }
];

// Mock data for suppliers
export const suppliers = [
    { id: 1, name: 'Fashion Hub Ltd', contact: '+234 801 234 5678', email: 'orders@fashionhub.com' },
    { id: 2, name: 'Style Imports', contact: '+234 802 345 6789', email: 'sales@styleimports.com' },
    { id: 3, name: 'Luxury Brands Co', contact: '+234 803 456 7890', email: 'support@luxurybrands.com' }
];

// Mock data for trending items
export const trendingItems = [
    { id: 1, name: 'Designer Gown', sales: 45, revenue: 1125000, growth: 15 },
    { id: 2, name: 'Leather Handbag', sales: 38, revenue: 570000, growth: 8 },
    { id: 3, name: 'High Heels', sales: 32, revenue: 384000, growth: 12 }
];

// Mock data for recent activities
export const recentActivities = [
    { 
        id: 1, 
        type: 'sale',
        description: 'New sale recorded',
        amount: 25000,
        timestamp: '2025-07-29T14:30:00Z',
        user: 'admin'
    },
    {
        id: 2,
        type: 'stock',
        description: 'Low stock alert',
        item: 'Ankara Dress',
        quantity: 2,
        timestamp: '2025-07-29T13:45:00Z'
    },
    {
        id: 3,
        type: 'purchase',
        description: 'Purchase order created',
        amount: 150000,
        timestamp: '2025-07-29T12:15:00Z',
        supplier: 'Fashion Hub Ltd'
    }
];

// Mock data for sales statistics
export const salesStats = {
    daily: {
        total: 245000,
        orders: 12,
        averageOrder: 20416.67,
        topSeller: 'Designer Gown'
    },
    weekly: {
        total: 1568000,
        orders: 73,
        averageOrder: 21479.45,
        growth: 8.5
    },
    monthly: {
        total: 6245000,
        orders: 286,
        averageOrder: 21835.66,
        growth: 12.3
    }
};

// Mock data for inventory alerts
export const inventoryAlerts = [
    {
        id: 1,
        type: 'low_stock',
        item: 'Leather Handbag',
        current: 3,
        threshold: 5,
        priority: 'high'
    },
    {
        id: 2,
        type: 'out_of_stock',
        item: 'Silk Scarf',
        current: 0,
        threshold: 8,
        priority: 'critical'
    },
    {
        id: 3,
        type: 'expiring',
        item: 'Summer Collection',
        daysLeft: 15,
        priority: 'medium'
    }
];

// Mock data for user activity
export const userActivity = [
    {
        id: 1,
        user: 'admin',
        action: 'login',
        timestamp: '2025-07-29T09:00:00Z',
        details: 'Logged in from Chrome/Windows'
    },
    {
        id: 2,
        user: 'admin',
        action: 'inventory_update',
        timestamp: '2025-07-29T09:15:00Z',
        details: 'Updated stock levels for 5 items'
    },
    {
        id: 3,
        user: 'staff',
        action: 'sale_complete',
        timestamp: '2025-07-29T10:30:00Z',
        details: 'Processed sale #1234 for ₦45,000'
    }
];