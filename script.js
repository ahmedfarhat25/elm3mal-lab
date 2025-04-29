// Dark Mode Toggle
const darkModeToggle = document.getElementById('dark-mode-toggle');
const body = document.body;

// Check for saved theme preference or prefer-color-scheme
const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

// Set initial theme
if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    body.setAttribute('data-theme', 'dark');
    darkModeToggle.checked = true;
}

// Toggle theme when the switch is clicked
darkModeToggle.addEventListener('change', () => {
    if (darkModeToggle.checked) {
        body.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    } else {
        body.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
    }
});

// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');

if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
        mainNav.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });
}

// FAQ Accordion (on services page)
const faqItems = document.querySelectorAll('.faq-item');

if (faqItems.length > 0) {
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            // Close other open FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle the current FAQ item
            item.classList.toggle('active');
        });
    });
}

// Dashboard Tab Switching (on dashboard page)
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

if (tabButtons.length > 0 && tabContents.length > 0) {
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and content
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to the clicked button
            button.classList.add('active');
            
            // Show the corresponding content
            const tabId = button.getAttribute('data-tab');
            document.getElementById(`${tabId}-tab`).classList.add('active');
        });
    });
}

// Login/Dashboard Toggle (for demo purpose only)
const loginBtn = document.getElementById('login-btn');
const visitBtn = document.getElementById('visit-btn');
const logoutBtn = document.getElementById('logout-btn');
const loginSection = document.getElementById('login-section');
const dashboardSection = document.getElementById('dashboard-section');

if (loginBtn && dashboardSection && loginSection) {
    loginBtn.addEventListener('click', () => {
        loginSection.style.display = 'none';
        dashboardSection.style.display = 'block';
    });
}

if (visitBtn && dashboardSection && loginSection) {
    visitBtn.addEventListener('click', () => {
        loginSection.style.display = 'none';
        dashboardSection.style.display = 'block';
    });
}

if (logoutBtn && dashboardSection && loginSection) {
    logoutBtn.addEventListener('click', () => {
        dashboardSection.style.display = 'none';
        loginSection.style.display = 'block';
    });
}

// Result Popup (on dashboard page)
const viewResultButtons = document.querySelectorAll('.view-result, .view-results');
const resultPopup = document.getElementById('result-popup');
const closePopup = document.querySelector('.close-popup');

if (viewResultButtons.length > 0 && resultPopup) {
    viewResultButtons.forEach(button => {
        button.addEventListener('click', () => {
            resultPopup.style.display = 'flex';
        });
    });
}

if (closePopup && resultPopup) {
    closePopup.addEventListener('click', () => {
        resultPopup.style.display = 'none';
    });
    
    // Close popup when clicking outside the content
    resultPopup.addEventListener('click', (e) => {
        if (e.target === resultPopup) {
            resultPopup.style.display = 'none';
        }
    });
}

// Smooth scroll for in-page anchors
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Get the sticky header height
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (mainNav && mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        }
    });
});

// Services Filtering (on services page)
const categoryTabs = document.querySelectorAll('.category-tabs li');
const serviceCards = document.querySelectorAll('.service-card');
const serviceSearch = document.getElementById('service-search');

if (categoryTabs.length > 0 && serviceCards.length > 0) {
    categoryTabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Set active tab
            categoryTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            const category = tab.querySelector('a').getAttribute('href').replace('#', '');
            
            // Show all services if "all" is selected
            if (category === 'all') {
                serviceCards.forEach(card => {
                    card.style.display = 'block';
                });
                return;
            }
            
            // Filter services based on category
            serviceCards.forEach(card => {
                const serviceCategory = card.querySelector('.service-category').getAttribute('data-category');
                if (serviceCategory === category) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// Service Search
if (serviceSearch && serviceCards.length > 0) {
    serviceSearch.addEventListener('input', () => {
        const searchTerm = serviceSearch.value.trim().toLowerCase();
        
        if (searchTerm === '') {
            // Show all or respect the current category filter
            const activeCategory = document.querySelector('.category-tabs li.active a').getAttribute('href').replace('#', '');
            
            serviceCards.forEach(card => {
                if (activeCategory === 'all') {
                    card.style.display = 'block';
                } else {
                    const serviceCategory = card.querySelector('.service-category').getAttribute('data-category');
                    card.style.display = serviceCategory === activeCategory ? 'block' : 'none';
                }
            });
            return;
        }
        
        // Filter by search term
        serviceCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('p').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || description.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
}

// Testimonial Slider Auto-scroll (on home page)
const testimonialSlider = document.querySelector('.testimonials-slider');

if (testimonialSlider && testimonialSlider.children.length > 1) {
    let scrollPosition = 0;
    const testimonialCards = testimonialSlider.querySelectorAll('.testimonial-card');
    const cardWidth = testimonialCards[0].offsetWidth + parseInt(getComputedStyle(testimonialCards[0]).marginRight);
    
    setInterval(() => {
        scrollPosition += cardWidth;
        if (scrollPosition >= testimonialSlider.scrollWidth - testimonialSlider.offsetWidth) {
            scrollPosition = 0;
        }
        testimonialSlider.scrollTo({
            left: scrollPosition,
            behavior: 'smooth'
        });
    }, 5000);
}