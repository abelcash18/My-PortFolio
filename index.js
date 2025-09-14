const themeToggle = document.getElementById('theme-toggle');
const mobileThemeToggle = document.getElementById('mobile-theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const mobileThemeIcon = document.getElementById('mobile-theme-icon');
const body = document.body;
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

// Function to update theme icons
function updateThemeIcons() {
    if (body.classList.contains('dark')) {
        themeIcon.className = 'fas fa-moon text-info-600 light:text-gray-300';
        mobileThemeIcon.className = 'fas fa-moon text-white-600 light:text-gray-300';
    } else {
        themeIcon.className = 'fas fa-sun text-gray-600 dark:text-white-300';
        mobileThemeIcon.className = 'fas fa-sun text-light-600 dark:text-white-300';
    }
}

// Function to apply saved theme
function applyTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('light');
    } else {
        body.classList.remove('dark');
    }
    updateThemeIcons();
}

// Apply theme on page load
applyTheme();

// Theme toggle event listeners
themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark');
    localStorage.setItem('theme', body.classList.contains('dark') ? 'dark' : 'light');
    updateThemeIcons();
});

mobileThemeToggle.addEventListener('click', () => {
    body.classList.toggle('light');
    localStorage.setItem('theme', body.classList.contains('light') ? 'light' : 'dark');
    updateThemeIcons();
});

mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});
