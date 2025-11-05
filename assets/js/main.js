// assets/js/main.js
import { initializeMockData } from '../data/mock-data.js';
import { protectRoute } from './auth.js';

document.addEventListener('DOMContentLoaded', () => {
    // Initialize mock data first
    initializeMockData();

    // Only protect routes that are not the login page
    const currentPath = window.location.pathname;
    if (currentPath !== '/' && currentPath !== '/index.html') {
        protectRoute();
    }
});