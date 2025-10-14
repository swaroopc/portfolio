// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all elements with fade-in class
document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger?.classList.remove('active');
        navMenu?.classList.remove('active');
    });
});

// Floating cards interaction
document.querySelectorAll('.floating-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) rotate(10deg) scale(1.05)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) rotate(0deg) scale(1)';
    });
});

// Skill tags interaction
document.querySelectorAll('.skill-tag').forEach(tag => {
    tag.addEventListener('click', () => {
        tag.style.animation = 'bounce 0.6s ease';
        setTimeout(() => {
            tag.style.animation = '';
        }, 600);
    });
});

// Typing effect for hero title (optional enhancement)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Add bounce animation keyframes via JavaScript
const style = document.createElement('style');
style.textContent = `
    @keyframes bounce {
        0%, 20%, 53%, 80%, 100% {
            transform: translate3d(0,0,0);
        }
        40%, 43% {
            transform: translate3d(0, -10px, 0);
        }
        70% {
            transform: translate3d(0, -5px, 0);
        }
        90% {
            transform: translate3d(0, -2px, 0);
        }
    }
`;
document.head.appendChild(style);

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.floating-card');
    
    parallaxElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.1);
        const yPos = -(scrolled * speed);
        element.style.transform += ` translateY(${yPos}px)`;
    });
});

// Add smooth reveal animation for timeline items
const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, index * 200);
        }
    });
}, observerOptions);

document.querySelectorAll('.timeline-item').forEach(item => {
    timelineObserver.observe(item);
});

// Enhanced mobile responsiveness
function handleResize() {
    if (window.innerWidth <= 768) {
        document.querySelectorAll('.floating-card').forEach(card => {
            card.style.position = 'relative';
            card.style.display = 'inline-block';
            card.style.margin = '10px';
        });
    }
}

window.addEventListener('resize', handleResize);
handleResize(); // Call on page load

// Smooth page load animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Projects Navigation Only
function initializeNavigation() {
    // Projects navigation
    const projectsGrid = document.getElementById('projects-grid');
    const projectsPrev = document.getElementById('projects-prev');
    const projectsNext = document.getElementById('projects-next');
    
    let projectsCurrentIndex = 0;
    
    // Get number of items per view based on screen size
    function getItemsPerView() {
        const width = window.innerWidth;
        if (width >= 1200) return 3; // 3 items on large screens
        if (width >= 900) return 2;  // 2 items on medium screens
        return 1; // 1 item on small screens and mobile
    }
    
    // Projects navigation functions
    function updateProjectsView() {
        const itemsPerView = getItemsPerView();
        const projectCards = projectsGrid.children;
        const maxIndex = Math.max(0, projectCards.length - itemsPerView);
        
        // Clamp current index
        projectsCurrentIndex = Math.max(0, Math.min(projectsCurrentIndex, maxIndex));
        
        // Hide all items first
        Array.from(projectCards).forEach((item, index) => {
            item.style.display = 'none';
        });
        
        // Show current items
        for (let i = projectsCurrentIndex; i < projectsCurrentIndex + itemsPerView && i < projectCards.length; i++) {
            projectCards[i].style.display = 'block';
        }
        
        // Update button states
        projectsPrev.disabled = projectsCurrentIndex === 0;
        projectsNext.disabled = projectsCurrentIndex >= maxIndex;
    }
    
    // Event listeners for projects navigation
    projectsPrev?.addEventListener('click', () => {
        projectsCurrentIndex = Math.max(0, projectsCurrentIndex - 1);
        updateProjectsView();
    });
    
    projectsNext?.addEventListener('click', () => {
        const itemsPerView = getItemsPerView();
        const maxIndex = Math.max(0, projectsGrid.children.length - itemsPerView);
        projectsCurrentIndex = Math.min(maxIndex, projectsCurrentIndex + 1);
        updateProjectsView();
    });
    
    // Initialize view
    updateProjectsView();
    
    // Update on window resize
    window.addEventListener('resize', () => {
        updateProjectsView();
    });
}

// Initialize navigation when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeNavigation);

console.log('Portfolio website loaded successfully! 🚀');