// Check if user is authenticated
export function checkAuth() {
    if (!localStorage.getItem('currentUser')) {
        window.location.href = '/index.html';
        return false;
    }
    return true;
}

// Handle logout
export function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = '/index.html';
}

// Toggle mobile sidebar
export function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('mobile-overlay');
    
    if (sidebar) {
        sidebar.classList.toggle('translate-x-0');
        sidebar.classList.toggle('-translate-x-full');
    }
    
    if (overlay) {
        overlay.classList.toggle('hidden');
    }
}

// Initialize page with sidebar
export function initializePage(currentPage) {
    if (!checkAuth()) return;
    
    // Add mobile overlay if it doesn't exist
    if (!document.getElementById('mobile-overlay')) {
        const overlay = document.createElement('div');
        overlay.id = 'mobile-overlay';
        overlay.className = 'fixed inset-0 bg-black bg-opacity-50 z-20 hidden lg:hidden';
        overlay.onclick = toggleSidebar;
        document.body.appendChild(overlay);
    }

    // Add responsive classes to sidebar
    const sidebar = document.getElementById('sidebar');
    if (sidebar) {
        sidebar.classList.add('lg:translate-x-0', 'fixed', 'lg:relative', 'z-30', 'transform', 'transition-transform', '-translate-x-full');
    }
}