document.addEventListener('DOMContentLoaded', function() {
    
    // 1. INITIALIZE GSAP & SCROLLTRIGGER
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.defaults({
    markers: false
});
    
    // Set default animation preferences
    gsap.defaults({
        ease: "power2.out",
        duration: 0.8
    });
    
    // 2. HERO SECTION ANIMATIONS
    function initHeroAnimations() {
        const heroLines = document.querySelectorAll('.hero-line');
        const resumeButton = document.querySelector('#resume');
        const profileImage = document.querySelector('.profile-image');
        const introElements = document.querySelectorAll('.intro-text, .role-title, .role-description');
        
        // Animate "Hello" box
        gsap.from('.hellobox', {
            y: -50,
            opacity: 0,
            duration: 0.8,
            delay: 0.2,
            ease: "back.out(1.7)"
        });
        
        // Split hero text into characters for animation
        heroLines.forEach((line, index) => {
            const chars = line.querySelectorAll('.letters');
            
            // Animate characters with delay
            gsap.from(chars, {
                y: 50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.05,
                delay: 0.3 + (index * 0.5),
                ease: "back.out(1.7)"
            });
            
            // Animate red letter separately
            const redLetter = line.querySelector('.red-letter');
            if (redLetter) {
                gsap.from(redLetter, {
                    scale: 0,
                    opacity: 0,
                    duration: 0.6,
                    delay: 0.9,
                    ease: "elastic.out(1, 0.5)"
                });
            }
        });
        
        // Animate resume button after text
        gsap.from(resumeButton, {
            y: 30,
            opacity: 0,
            duration: 0.8,
            delay: 2.0,
            ease: "back.out(1.7)"
        });
        
        // Animate profile image
        gsap.from(profileImage, {
            scale: 0.8,
            opacity: 0,
            rotation: -5,
            duration: 1,
            delay: 1.2,
            ease: "power2.out"
        });
        
        // Animate intro text elements with slight delay
        introElements.forEach((el, index) => {
            gsap.from(el, {
                y: 30,
                opacity: 0,
                duration: 0.8,
                delay: 1.5 + (index * 0.2),
                ease: "power2.out"
            });
        });
        
        // Add floating animation to profile image
        gsap.to(profileImage, {
            y: -10,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: 3
        });
    }
    
    // 3. NAVIGATION ANIMATIONS
    function initNavAnimations() {
        const navbar = document.querySelector('#navbar');
        const navItems = document.querySelectorAll('#navbar > a');
        
        // Animate navbar on load
        gsap.from(navbar, {
            y: -100,
            opacity: 0,
            duration: 0.8,
            delay: 0.1,
            ease: "power2.out"
        });
        
        // Animate nav items with stagger
        gsap.from(navItems, {
            y: -20,
            opacity: 0,
            duration: 0.5,
            stagger: 0.1,
            delay: 0.3,
            ease: "back.out(1.7)"
        });
        
        // Animate logo
        const logo = document.querySelector('#navbar > h3');
        gsap.from(logo, {
            scale: 0,
            rotation: 360,
            duration: 0.8,
            delay: 0.5,
            ease: "back.out(1.7)"
        });
    }
    
    // 4. SECTION REVEAL ANIMATIONS
    function initSectionReveals() {
        // Services section
        const services = document.querySelector('#service');
        const serviceCards = document.querySelectorAll('.servicecard');
        
        gsap.from(services, {
            scrollTrigger: {
                trigger: services,
                start: "top 80%",
                toggleActions: "play none none reverse"
            },
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "power2.out"
        });
        
        // Animate service cards with stagger
        serviceCards.forEach((card, index) => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                },
                y: 30,
                opacity: 0,
                duration: 0.8,
                delay: index * 0.1,
                ease: "power2.out"
            });
        });
        
        // Skills section
        const skillsSection = document.querySelector('#skills');
        
        gsap.from(skillsSection, {
            scrollTrigger: {
                trigger: skillsSection,
                start: "top 80%",
                toggleActions: "play none none reverse"
            },
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "power2.out"
        });
        
        // Projects section
        const projectsSection = document.querySelector('#projects');
        
        gsap.from(projectsSection, {
            scrollTrigger: {
                trigger: projectsSection,
                start: "top 80%",
                toggleActions: "play none none reverse"
            },
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "power2.out"
        });
        
        // Footer section
        const footerSection = document.querySelector('#contact-footer');
        
        gsap.from(footerSection, {
            scrollTrigger: {
                trigger: footerSection,
                start: "top 90%",
                toggleActions: "play none none reverse"
            },
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "power2.out"
        });
    }
    
    // 5. SKILL BARS ANIMATION
    function initSkillBars() {
        const skillBars = document.querySelectorAll('.skill-bar');
        
        skillBars.forEach(bar => {
            const progress = bar.querySelector('.skill-progress');
            const width = progress.getAttribute('data-width');
            
            ScrollTrigger.create({
                trigger: bar,
                start: "top 90%",
                onEnter: () => {
                    gsap.to(progress, {
                        width: `${width}%`,
                        duration: 1.5,
                        ease: "power2.out"
                    });
                }
            });
        });
        
        // Animate tech icons
        const techIcons = document.querySelectorAll('.tech-icon');
        gsap.from(techIcons, {
            scrollTrigger: {
                trigger: '.tech-icons',
                start: "top 85%",
                toggleActions: "play none none reverse"
            },
            y: 30,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out"
        });
    }
    
    // 6. PROJECT TABS ANIMATION
    function initProjectTabs() {
        const tabBtns = document.querySelectorAll('.tab-btn');
        const projectTabs = document.querySelectorAll('.project-tab');
        
        tabBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const tabId = this.getAttribute('data-tab');
                
                // Remove active class from all tabs and buttons
                tabBtns.forEach(b => {
                    b.classList.remove('active');
                    gsap.to(b, { scale: 1, duration: 0.3 });
                });
                projectTabs.forEach(tab => {
                    tab.classList.remove('active');
                    gsap.to(tab, { opacity: 0, y: 20, duration: 0.3 });
                });
                
                // Add active class to clicked button
                this.classList.add('active');
                gsap.to(this, { scale: 1.05, duration: 0.3 });
                
                // Animate the new active tab
                const activeTab = document.getElementById(tabId);
                activeTab.classList.add('active');
                
                gsap.fromTo(activeTab,
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
                );
                
                // Animate project image
                const projectImage = activeTab.querySelector('.image-container img');
                if (projectImage) {
                    gsap.fromTo(projectImage,
                        { scale: 1.05 },
                        { scale: 1.02, duration: 0.8, ease: "power2.out" }
                    );
                }
            });
        });
        
        // Hover effect for project images
        const projectImages = document.querySelectorAll('.image-container img');
        projectImages.forEach(img => {
            img.addEventListener('mouseenter', function() {
                gsap.to(this, {
                    scale: 1.05,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });
            
            img.addEventListener('mouseleave', function() {
                gsap.to(this, {
                    scale: 1.02,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });
        });
    }
    
    // 7. FOOTER & CONTACT ANIMATIONS
    function initFooterAnimations() {
        // Set current year in copyright
        document.getElementById('current-year').textContent = new Date().getFullYear();
        
        // Back to top button
        const backToTopBtn = document.getElementById('backToTop');
        
        if (backToTopBtn) {
            function toggleBackToTop() {
                if (window.scrollY > 300) {
                    gsap.to(backToTopBtn, {
                        opacity: 1,
                        visibility: 'visible',
                        duration: 0.3,
                        ease: "power2.out"
                    });
                } else {
                    gsap.to(backToTopBtn, {
                        opacity: 0,
                        visibility: 'hidden',
                        duration: 0.3,
                        ease: "power2.out"
                    });
                }
            }
            
            // Smooth scroll to top
            backToTopBtn.addEventListener('click', function(e) {
                e.preventDefault();
                gsap.to(window, {
                    scrollTo: 0,
                    duration: 1,
                    ease: "power2.inOut"
                });
            });
            
            // Add scroll listener
            window.addEventListener('scroll', toggleBackToTop);
            toggleBackToTop(); // Initial check
        }
        
        // Copy to clipboard functionality
        const copyableItems = document.querySelectorAll('.contact-value[data-copy]');
        const notification = document.querySelector('.copy-notification');
        
        copyableItems.forEach(item => {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                
                const textToCopy = this.getAttribute('data-copy');
                
                navigator.clipboard.writeText(textToCopy).then(() => {
                    // Show notification
                    if (notification) {
                        gsap.fromTo(notification,
                            { opacity: 0, y: 100 },
                            {
                                opacity: 1,
                                y: 0,
                                duration: 0.3,
                                onStart: () => notification.classList.add('show'),
                                onComplete: () => {
                                    setTimeout(() => {
                                        gsap.to(notification, {
                                            opacity: 0,
                                            y: 100,
                                            duration: 0.3,
                                            onComplete: () => notification.classList.remove('show')
                                        });
                                    }, 2000);
                                }
                            }
                        );
                    }
                }).catch(err => {
                    console.error('Failed to copy: ', err);
                });
            });
        });
        
        // Animate contact items on hover
        const contactItems = document.querySelectorAll('.contact-item');
        contactItems.forEach(item => {
            item.addEventListener('mouseenter', function() {
                gsap.to(this, {
                    y: -5,
                    boxShadow: '0 10px 20px rgba(220, 0, 0, 0.1)',
                    duration: 0.3,
                    ease: "power2.out"
                });
            });
            
            item.addEventListener('mouseleave', function() {
                gsap.to(this, {
                    y: 0,
                    boxShadow: 'none',
                    duration: 0.3,
                    ease: "power2.out"
                });
            });
        });
        
        // Animate footer links
        const footerLinks = document.querySelectorAll('.footerLink');
        footerLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    gsap.to(window, {
                        scrollTo: { y: targetElement, offsetY: 80 },
                        duration: 1,
                        ease: "power2.inOut"
                    });
                }
            });
        });
    }
    
    // 8. SCROLL PROGRESS INDICATOR
    function initScrollProgress() {
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        document.body.appendChild(progressBar);
        
        window.addEventListener('scroll', () => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            
            gsap.to(progressBar, {
                width: `${scrolled}%`,
                duration: 0.1,
                ease: "none"
            });
        });
    }
    
    // 9. INITIALIZE EVERYTHING
    function initAllAnimations() {
        // Start all animations
        initHeroAnimations();
        initNavAnimations();
        initSectionReveals();
        initSkillBars();
        initProjectTabs();
        initFooterAnimations();
        initScrollProgress();
        
        console.log('🚀 Portfolio animations loaded successfully!');
    }
    
    // Wait a moment for page to load, then start animations
    setTimeout(initAllAnimations, 100);
    
    // Reinitialize animations on window resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            ScrollTrigger.refresh();
        }, 250);
    });
    
    // Handle reduced motion preferences
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.globalTimeline.timeScale(0.5);
        console.log('Reduced motion enabled');
    }
        // ===========================================
    // FIX: MANUALLY TRIGGER SCROLLTRIGGER AFTER NAV CLICKS
    // ===========================================
    
    // Function to simulate a scroll event
    function simulateScroll() {
        // Dispatch a scroll event
        window.dispatchEvent(new Event('scroll'));
        
        // Force ScrollTrigger to check positions
        ScrollTrigger.getAll().forEach(trigger => {
            trigger.update();
        });
        
        // Refresh all ScrollTriggers
        setTimeout(() => {
            ScrollTrigger.refresh();
        }, 100);
    }
    
    // Override all existing click handlers
    document.querySelectorAll('#navbar a, .footerLink').forEach(link => {
        // Store original onclick
        const originalClick = link.onclick;
        
        // Replace with new handler
        link.addEventListener('click', function(e) {
            // Let original handler run first
            if (originalClick) originalClick.call(this, e);
            
            // After scrolling completes, simulate scroll events
            setTimeout(() => {
                // Simulate multiple scroll events over time
                simulateScroll();
                setTimeout(simulateScroll, 200);
                setTimeout(simulateScroll, 400);
            }, 600); // Wait for scroll animation to complete
        });
    });
    
    // Alternative: Add a scroll simulation button for testing
    console.log('Scroll fix added. Test by clicking nav links.');
});