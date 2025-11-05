
// components/header.js
export function insertHeader(title) {
    return `
        <header class="bg-white shadow-sm">
            <div class="px-4 sm:px-6 py-4 flex items-center justify-between">
                <button id="mobile-menu-btn" class="lg:hidden text-gray-500 hover:text-gray-700 focus:outline-none">
                    <i class="fas fa-bars text-xl"></i>
                </button>
                <h2 class="text-xl font-semibold text-gray-800">${title}</h2>
                <div class="flex items-center space-x-4">
                    <button class="text-gray-500 hover:text-gray-700">
                        <i class="fas fa-bell"></i>
                    </button>
                    <div class="relative">
                        <button class="text-gray-500 hover:text-gray-700">
                            <i class="fas fa-search"></i>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    `;
}