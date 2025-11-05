import { initializeMockData, getStorageKey } from '../data/mock-data.js';

// Initialize data when the module loads
try {
    initializeMockData();
    console.log('Mock data initialized');
} catch (error) {
    console.error('Failed to initialize mock data:', error);
    showNotification('Failed to load system data. Please try again.', 'error');
}

// Authentication functions
export function login(username, password) {
    try {
        const users = JSON.parse(localStorage.getItem(getStorageKey('USERS')));

        if (!users || !Array.isArray(users)) {
            console.error('No users found in storage');
            return { success: false, message: 'System error: No users found' };
        }

        const user = users.find(u => u.username === username && u.password === password);

        if (user) {
            user.lastLogin = new Date().toISOString();
            localStorage.setItem(getStorageKey('USERS'), JSON.stringify(users));
            localStorage.setItem('currentUser', JSON.stringify({
                id: user.id,
                username: user.username,
                name: user.name,
                role: user.role,
                email: user.email
            }));
            return { success: true, user };
        }

        return { success: false, message: 'Invalid username or password' };
    } catch (error) {
        console.error('Login error:', error);
        return { success: false, message: 'Login failed. Please try again.' };
    }
}

// export function login(username, password) {
//     try {
//         // Skip all authentication checks - allow any credentials
//         if (!username || !password) {
//             return { success: false, message: 'Please enter both username and password' };
//         }
//
//         // Create a dummy user with the provided credentials
//         const dummyUser = {
//             id: 1,
//             username: username,
//             name: username, // Use username as display name
//             role: 'admin', // Give admin role by default
//             email: `${username}@example.com`,
//             lastLogin: new Date().toISOString()
//         };
//
//         // Store the current user without checking against any user database
//         localStorage.setItem('currentUser', JSON.stringify({
//             id: dummyUser.id,
//             username: dummyUser.username,
//             name: dummyUser.name,
//             role: dummyUser.role,
//             email: dummyUser.email
//         }));
//
//         return { success: true, user: dummyUser };
//     } catch (error) {
//         console.error('Login error:', error);
//         return { success: false, message: 'Login failed. Please try again.' };
//     }
// }

export function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = '../index.html';
}

export function getCurrentUser() {
    try {
        const user = localStorage.getItem('currentUser');
        return user ? JSON.parse(user) : null;
    } catch (error) {
        console.error('Error getting current user:', error);
        return null;
    }
}

export function isAuthenticated() {
    return getCurrentUser() !== null;
}

function redirectUser(user) {
    const dashboardPaths = [
        './pages/dashboard.html',
        '/pages/dashboard.html',
        'pages/dashboard.html'
    ];
    try {
        window.location.href = dashboardPaths[0];
    } catch (error) {
        console.error('Redirect failed:', error);
        showNotification('Redirect failed. Please navigate to the dashboard manually.', 'error');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const usernameInput = document.getElementById('username');
            const passwordInput = document.getElementById('password');

            usernameInput.classList.remove('border-red-500');
            passwordInput.classList.remove('border-red-500');

            if (!usernameInput || !passwordInput) {
                showNotification('Form elements not found', 'error');
                return;
            }

            const username = usernameInput.value.trim();
            const password = passwordInput.value.trim();

            if (!username || !password) {
                if (!username) usernameInput.classList.add('border-red-500');
                if (!password) passwordInput.classList.add('border-red-500');
                showNotification('Please enter both username and password', 'error');
                return;
            }

            const submitButton = e.target.querySelector('button[type="submit"]');
            if (submitButton) {
                submitButton.disabled = true;
                submitButton.textContent = 'Signing In...';
            }

            try {
                const result = login(username, password);

                if (result.success) {
                    showNotification('Login successful! Redirecting...', 'success');
                    setTimeout(() => {
                        redirectUser(result.user);
                    }, 1000);
                } else {
                    showNotification(result.message, 'error');
                    if (submitButton) {
                        submitButton.disabled = false;
                        submitButton.textContent = 'Sign In';
                    }
                }
            } catch (error) {
                console.error('Login submission error:', error);
                showNotification('Login failed. Please try again.', 'error');
                if (submitButton) {
                    submitButton.disabled = false;
                    submitButton.textContent = 'Sign In';
                }
            }
        });
    }

    const demoCredentials = document.querySelectorAll('.demo-credential');
    demoCredentials.forEach(element => {
        element.addEventListener('click', (e) => {
            e.preventDefault();
            const [usernameRaw, password] = element.textContent.split(' / ');
            const username = usernameRaw.replace(/^.*?:\s*/, ''); // Remove prefix
            document.getElementById('username').value = username;
            document.getElementById('password').value = password;
        });
    });
});

function showNotification(message, type = 'info') {
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notif => notif.remove());

    const notification = document.createElement('div');
    notification.className = `notification fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg text-white transition-all duration-300 transform translate-x-full ${
        type === 'success' ? 'bg-green-500' :
            type === 'error' ? 'bg-red-500' :
                type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
    }`;
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.remove('translate-x-full');
    }, 100);

    setTimeout(() => {
        notification.classList.add('translate-x-full');
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

export function checkAuthStatus() {
    if (!isAuthenticated()) {
        window.location.href = '../index.html';
        return false;
    }
    return true;
}