
import { getStorageKey } from '../data/mock-data.js';

class SettingsManager {
    constructor() {
        this.init();
    }

    init() {
        this.loadSettings();
        this.setupEventListeners();
    }

    loadSettings() {
        const settings = this.getSettings();

        // Business Information
        document.getElementById('business-name').value = settings.businessName || '';
        document.getElementById('business-email').value = settings.businessEmail || '';
        document.getElementById('business-phone').value = settings.businessPhone || '';
        document.getElementById('business-website').value = settings.businessWebsite || '';
        document.getElementById('business-address').value = settings.businessAddress || '';

        // System Settings
        document.getElementById('currency').value = settings.currency || 'NGN';
        document.getElementById('tax-rate').value = settings.taxRate || 10;
        document.getElementById('language').value = settings.language || 'en';
        document.getElementById('timezone').value = settings.timeZone || 'Africa/Lagos';

        // Toggle switches
        this.setToggleState('low-stock-toggle', settings.lowStockAlert !== false);
        this.setToggleState('auto-sku-toggle', settings.autoGenerateSKU !== false);
        this.setToggleState('track-history-toggle', settings.trackItemHistory !== false);
        this.setToggleState('email-notifications', settings.emailNotifications !== false);
        this.setToggleState('sms-notifications', settings.smsNotifications || false);
        this.setToggleState('browser-notifications', settings.browserNotifications !== false);
    }

    getSettings() {
        return JSON.parse(localStorage.getItem(getStorageKey('SETTINGS'))) || {};
    }

    saveSettings() {
        const settings = {
            // Business Information
            businessName: document.getElementById('business-name').value,
            businessEmail: document.getElementById('business-email').value,
            businessPhone: document.getElementById('business-phone').value,
            businessWebsite: document.getElementById('business-website').value,
            businessAddress: document.getElementById('business-address').value,

            // System Settings
            currency: document.getElementById('currency').value,
            taxRate: parseFloat(document.getElementById('tax-rate').value) || 10,
            language: document.getElementById('language').value,
            timeZone: document.getElementById('timezone').value,

            // Toggle Settings
            lowStockAlert: this.getToggleState('low-stock-toggle'),
            autoGenerateSKU: this.getToggleState('auto-sku-toggle'),
            trackItemHistory: this.getToggleState('track-history-toggle'),
            emailNotifications: this.getToggleState('email-notifications'),
            smsNotifications: this.getToggleState('sms-notifications'),
            browserNotifications: this.getToggleState('browser-notifications'),

            lastUpdated: new Date().toISOString()
        };

        localStorage.setItem(getStorageKey('SETTINGS'), JSON.stringify(settings));
        this.showNotification('Settings saved successfully!', 'success');
    }

    setToggleState(toggleId, enabled) {
        const toggle = document.getElementById(toggleId);
        if (toggle) {
            toggle.setAttribute('data-enabled', enabled);
            toggle.classList.toggle('enabled', enabled);
        }
    }

    getToggleState(toggleId) {
        const toggle = document.getElementById(toggleId);
        return toggle ? toggle.getAttribute('data-enabled') === 'true' : false;
    }

    setupEventListeners() {
        // Save all settings button
        document.getElementById('save-all-settings')?.addEventListener('click', () => {
            this.saveSettings();
        });

        // Toggle switches
        document.querySelectorAll('.toggle-switch').forEach(toggle => {
            toggle.addEventListener('click', () => {
                const currentState = toggle.getAttribute('data-enabled') === 'true';
                const newState = !currentState;
                toggle.setAttribute('data-enabled', newState);
                toggle.classList.toggle('enabled', newState);
            });
        });

        // Auto-save on form changes
        const formInputs = document.querySelectorAll('#business-form input, #business-form textarea, #business-form select, .system-settings input, .system-settings select');
        formInputs.forEach(input => {
            input.addEventListener('change', () => {
                this.autoSave();
            });
        });

        // Export data
        document.getElementById('export-data')?.addEventListener('click', () => {
            this.exportData();
        });

        // Import data
        document.getElementById('import-data')?.addEventListener('click', () => {
            this.importData();
        });
    }

    autoSave() {
        clearTimeout(this.autoSaveTimeout);
        this.autoSaveTimeout = setTimeout(() => {
            this.saveSettings();
        }, 2000);
    }

    exportData() {
        const data = {
            inventory: JSON.parse(localStorage.getItem(getStorageKey('INVENTORY'))),
            sales: JSON.parse(localStorage.getItem(getStorageKey('SALES'))),
            purchases: JSON.parse(localStorage.getItem(getStorageKey('PURCHASES'))),
            settings: JSON.parse(localStorage.getItem(getStorageKey('SETTINGS')))
        };

        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `boutique-data-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        this.showNotification('Data exported successfully!', 'success');
    }

    importData() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        input.onchange = (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    try {
                        const data = JSON.parse(e.target.result);

                        if (confirm('This will overwrite your current data. Are you sure?')) {
                            localStorage.setItem(getStorageKey('INVENTORY'), JSON.stringify(data.inventory || []));
                            localStorage.setItem(getStorageKey('SALES'), JSON.stringify(data.sales || []));
                            localStorage.setItem(getStorageKey('PURCHASES'), JSON.stringify(data.purchases || []));
                            localStorage.setItem(getStorageKey('SETTINGS'), JSON.stringify(data.settings || {}));

                            this.showNotification('Data imported successfully! Page will reload.', 'success');
                            setTimeout(() => window.location.reload(), 2000);
                        }
                    } catch (error) {
                        this.showNotification('Invalid file format!', 'error');
                    }
                };
                reader.readAsText(file);
            }
        };
        input.click();
    }

    showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg text-white ${
            type === 'success' ? 'bg-green-500' : 'bg-red-500'
        }`;
        notification.textContent = message;

        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 3000);
    }
}

// Initialize settings manager
document.addEventListener('DOMContentLoaded', () => {
    new SettingsManager();
});