const themeToggle = document.getElementById('theme-toggle');
const mobileThemeToggle = document.getElementById('mobile-theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const mobileThemeIcon = document.getElementById('mobile-theme-icon');
const body = document.body;
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

// Load and apply saved theme configuration without mutating state
const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    body.classList.add('dark');
    document.documentElement.classList.add('dark'); // Syncs Tailwind's class strategy
} else {
    body.classList.remove('dark');
    document.documentElement.classList.remove('dark');
}

// Separate icon visual updates from logic mutations
function updateIcons() {
    const isDark = body.classList.contains('dark');
    const targetIconClass = isDark ? 'fas fa-moon' : 'fas fa-sun';
    
    if (themeIcon) themeIcon.className = targetIconClass;
    if (mobileThemeIcon) mobileThemeIcon.className = targetIconClass;
}

// Theme toggle state logic modifier
function toggleTheme() {
    body.classList.toggle('dark');
    document.documentElement.classList.toggle('dark');
    
    const isDark = body.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    updateIcons();
}

// Event Listeners for theme triggers
if (themeToggle) themeToggle.addEventListener('click', toggleTheme);
if (mobileThemeToggle) mobileThemeToggle.addEventListener('click', toggleTheme);

// Mobile navigation toggle with proper ARIA accessibility state tracking
if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', () => {
        const isHidden = mobileMenu.classList.toggle('hidden');
        mobileMenuButton.setAttribute('aria-expanded', !isHidden);
    });
}

// Set up UI visuals appropriately on page loading cycle
updateIcons();

// Smooth navigation behaviors with automatic mobile-menu hiding closures
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });

            // Automatically hide mobile layout overlay upon link activation
            if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
                if (mobileMenuButton) mobileMenuButton.setAttribute('aria-expanded', 'false');
            }
        }
    });
});