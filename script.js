// Aguarda o DOM carregar completamente
document.addEventListener('DOMContentLoaded', function() {
    
    // ============ NAVEGAÇÃO MOBILE ============
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Fechar menu ao clicar em um link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // ============ SCROLL SUAVE PARA LINKS ============
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.offsetTop;
                const offsetPosition = elementPosition - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ============ ANIMAÇÃO DO HEADER AO SCROLL ============
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            navbar.classList.remove('scroll-up');
            navbar.style.boxShadow = 'none';
        }
        
        if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
            // Scrolling down
            navbar.style.transform = 'translateY(-100%)';
            navbar.classList.remove('scroll-up');
            navbar.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
            // Scrolling up
            navbar.style.transform = 'translateY(0)';
            navbar.classList.remove('scroll-down');
            navbar.classList.add('scroll-up');
            navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
        }
        
        lastScroll = currentScroll;
    });
    
    // ============ ANIMAÇÃO DE NÚMEROS (CONTADORES) ============
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const increment = target / 200; // Velocidade da animação
            let current = 0;
            
            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    counter.textContent = Math.ceil(current);
                    setTimeout(updateCounter, 10);
                } else {
                    counter.textContent = target;
                }
            };
            
            updateCounter();
        });
    }
    
    // ============ ANIMAÇÃO DAS BARRAS DE SKILL ============
    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        
        skillBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            setTimeout(() => {
                bar.style.width = width;
            }, 200);
        });
    }
    
    // ============ OBSERVER PARA ANIMAÇÕES NO SCROLL ============
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                
                // Animar contadores quando a seção About for visível
                if (entry.target.id === 'about') {
                    animateCounters();
                }
                
                // Animar barras de skill quando a seção Skills for visível
                if (entry.target.id === 'skills') {
                    animateSkillBars();
                }
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observar todas as seções
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('animate-on-scroll');
        observer.observe(section);
    });
    
    // ============ FILTRO DE PROJETOS ============
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remover active de todos os botões
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Adicionar active ao botão clicado
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeInUp 0.5s ease forwards';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // ============ FORMULÁRIO DE CONTATO ============
    const contactForm = document.querySelector('.contact-form');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Simular envio do formulário
        const submitBtn = this.querySelector('.btn-primary');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Enviando...';
        submitBtn.disabled = true;
        
        // Simular delay de envio
        setTimeout(() => {
            submitBtn.textContent = 'Mensagem Enviada!';
            submitBtn.style.background = '#28a745';
            
            // Reset após 3 segundos
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
                this.reset();
            }, 3000);
        }, 2000);
    });
    
    // ============ BOTÃO SCROLL TO TOP ============
    const scrollTopBtn = document.getElementById('scrollTop');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });
    
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // ============ EFEITO PARALLAX SIMPLES ============
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.floating-shapes');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
    
    // ============ HIGHLIGHT DA SEÇÃO ATIVA NO MENU ============
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function highlightActiveSection() {
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', highlightActiveSection);
    
    // ============ ANIMAÇÃO DE TYPING PARA O TÍTULO ============
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function typing() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(typing, speed);
            }
        }
        
        typing();
    }
    
    // Aplicar efeito de typing ao título do hero após um pequeno delay
    setTimeout(() => {
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) {
            const originalText = heroTitle.textContent;
            typeWriter(heroTitle, originalText, 80);
        }
    }, 1000);
    
    // ============ LAZY LOADING PARA IMAGENS ============
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
    
    // ============ CURSOR PERSONALIZADO (OPCIONAL) ============
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
    
    // Adicionar efeito hover aos elementos interativos
    const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-card');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.classList.add('cursor-hover');
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.classList.remove('cursor-hover');
        });
    });
    
    // ============ TEMA ESCURO/CLARO (TOGGLE) ============
    const themeToggle = document.createElement('button');
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    themeToggle.classList.add('theme-toggle');
    themeToggle.style.cssText = `
        position: fixed;
        top: 50%;
        right: 20px;
        transform: translateY(-50%);
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: none;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        cursor: pointer;
        z-index: 1000;
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(themeToggle);
    
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-theme');
        const icon = this.querySelector('i');
        
        if (document.body.classList.contains('dark-theme')) {
            icon.className = 'fas fa-sun';
        } else {
            icon.className = 'fas fa-moon';
        }
    });
    
    // ============ ANIMAÇÃO DE PARTÍCULAS NO BACKGROUND ============
    function createParticles() {
        const particlesContainer = document.createElement('div');
        particlesContainer.classList.add('particles-container');
        particlesContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
        `;
        
        document.body.appendChild(particlesContainer);
        
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: rgba(102, 126, 234, 0.3);
                border-radius: 50%;
                animation: float ${Math.random() * 6 + 4}s linear infinite;
                top: ${Math.random() * 100}%;
                left: ${Math.random() * 100}%;
                animation-delay: ${Math.random() * 4}s;
            `;
            
            particlesContainer.appendChild(particle);
        }
    }
    
    // Criar partículas apenas em telas maiores
    if (window.innerWidth > 768) {
        createParticles();
    }
    
    // ============ PRELOADER ============
    const preloader = document.createElement('div');
    preloader.innerHTML = `
        <div class="preloader-spinner">
            <div class="spinner"></div>
            <p>Carregando...</p>
        </div>
    `;
    preloader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: white;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        flex-direction: column;
    `;
    
    document.body.appendChild(preloader);
    
    // Remover preloader após carregamento
    window.addEventListener('load', function() {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.remove();
            }, 500);
        }, 1000);
    });
    
    // ============ CONSOLE LOG PERSONALIZADO ============
    console.log('%c🚀 Portfólio carregado com sucesso!', 'color: #667eea; font-size: 16px; font-weight: bold;');
    console.log('%cDesenvolvido para exercício acadêmico, site náo oficial do João Pedro', 'color: #666; font-size: 12px;');
    
});

// ============ ESTILOS CSS ADICIONAIS VIA JAVASCRIPT ============
const additionalStyles = `
    
    
    .dark-theme {
        background: #1a1a1a !important;
        color: #fff !important;
    }
    
    .dark-theme .navbar {
        background: rgba(26, 26, 26, 0.95) !important;
    }
    
    .dark-theme .nav-link {
        color: #fff !important;
    }
    
    .dark-theme .about,
    .dark-theme .projects {
        background: #222 !important;
    }
    
    .dark-theme .skill-card,
    .dark-theme .project-card,
    .dark-theme .contact-form {
        background: #333 !important;
        color: #fff !important;
    }
    
    .spinner {
        width: 40px;
        height: 40px;
        border: 4px solid #f3f3f3;
        border-top: 4px solid #667eea;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin-bottom: 10px;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    @media (max-width: 768px) {
        .theme-toggle {
            right: 10px !important;
            width: 40px !important;
            height: 40px !important;
        }
        
        .custom-cursor {
            display: none;
        }
    }
`;

// Adicionar estilos ao head
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);