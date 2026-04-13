// Portfolio JavaScript functionality

document.addEventListener('DOMContentLoaded', function() {
    initSmoothScrolling();
    initNavbarScrollEffect();
    initBackToTopButton();
    initSkillBarAnimations();
    initContactForm();
    initFadeInAnimations();
    initActiveNavigation();
    initCharts();
    initAIDemo();
    initProjectDemo();
});

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({ top: offsetTop, behavior: 'smooth' });
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                    const navbarToggler = document.querySelector('.navbar-toggler');
                    if (navbarToggler) navbarToggler.click();
                }
            }
        });
    });
    const heroButtons = document.querySelectorAll('.hero-buttons a[href^="#"]');
    heroButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({ top: offsetTop, behavior: 'smooth' });
            }
        });
    });
}

function initNavbarScrollEffect() {
    const navbar = document.querySelector('.custom-navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(19, 52, 59, 0.98)';
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.background = 'rgba(19, 52, 59, 0.95)';
                navbar.style.boxShadow = 'none';
            }
        });
    }
}

function initBackToTopButton() {
    const backToTopButton = document.getElementById('backToTop');
    if (backToTopButton) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) backToTopButton.classList.add('show');
            else backToTopButton.classList.remove('show');
        });
        backToTopButton.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}

function initSkillBarAnimations() {
    const skillBars = document.querySelectorAll('.skill-progress');
    const animateSkillBars = () => {
        skillBars.forEach(bar => {
            const rect = bar.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            if (isVisible && !bar.classList.contains('animated')) {
                const progress = bar.getAttribute('data-progress');
                if (progress) {
                    bar.style.width = progress + '%';
                    bar.classList.add('animated');
                }
            }
        });
    };
    animateSkillBars();
    window.addEventListener('scroll', animateSkillBars);
}

function initContactForm() {
    const form = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');
    if (!form) return;
    
    nameInput.addEventListener('input', validateName);
    emailInput.addEventListener('input', validateEmail);
    subjectInput.addEventListener('input', validateSubject);
    messageInput.addEventListener('input', validateMessage);
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isSubjectValid = validateSubject();
        const isMessageValid = validateMessage();
        
        if (isNameValid && isEmailValid && isSubjectValid && isMessageValid) {
            const submitButton = form.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sending...';
            submitButton.disabled = true;
            setTimeout(() => {
                showNotification('Message sent successfully! Thank you for reaching out.', 'success');
                form.reset();
                form.classList.remove('was-validated');
                [nameInput, emailInput, subjectInput, messageInput].forEach(input => input.classList.remove('is-valid', 'is-invalid'));
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
            }, 2000);
        } else {
            form.classList.add('was-validated');
        }
    });
    
    function validateName() { const value = nameInput.value.trim(); const isValid = value.length >= 2; updateFieldValidation(nameInput, isValid, 'Please enter a valid name (at least 2 characters).'); return isValid; }
    function validateEmail() { const value = emailInput.value.trim(); const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; const isValid = emailRegex.test(value); updateFieldValidation(emailInput, isValid, 'Please enter a valid email address.'); return isValid; }
    function validateSubject() { const value = subjectInput.value.trim(); const isValid = value.length >= 3; updateFieldValidation(subjectInput, isValid, 'Please enter a subject (at least 3 characters).'); return isValid; }
    function validateMessage() { const value = messageInput.value.trim(); const isValid = value.length >= 10; updateFieldValidation(messageInput, isValid, 'Please enter a message (at least 10 characters).'); return isValid; }
    function updateFieldValidation(field, isValid, errorMessage) { const feedback = field.nextElementSibling; if (isValid) { field.classList.remove('is-invalid'); field.classList.add('is-valid'); } else { field.classList.remove('is-valid'); field.classList.add('is-invalid'); if (feedback && feedback.classList.contains('invalid-feedback')) feedback.textContent = errorMessage; } }
}

function initFadeInAnimations() {
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
    }, observerOptions);
    const elementsToAnimate = document.querySelectorAll('.card, .skill-category, .project-card');
    elementsToAnimate.forEach(element => { element.classList.add('fade-in'); observer.observe(element); });
}

function initActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    function updateActiveNavigation() {
        const scrollPos = window.scrollY + 100;
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                const activeLink = document.querySelector(`.navbar-nav .nav-link[href="#${sectionId}"]`);
                if (activeLink) activeLink.classList.add('active');
            }
        });
    }
    window.addEventListener('scroll', updateActiveNavigation);
    updateActiveNavigation();
}

function showNotification(message, type = 'info') {
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `<div class="notification-content"><i class="fas ${getNotificationIcon(type)} me-2"></i>${message}</div>`;
    Object.assign(notification.style, { position: 'fixed', top: '20px', right: '20px', padding: '16px 20px', borderRadius: '8px', color: 'white', fontSize: '14px', fontWeight: '500', zIndex: '9999', opacity: '0', transform: 'translateX(100%)', transition: 'all 0.3s ease', maxWidth: '400px', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)' });
    const colors = { success: '#22c55e', error: '#ef4444', warning: '#f59e0b', info: '#3b82f6' };
    notification.style.backgroundColor = colors[type] || colors.info;
    document.body.appendChild(notification);
    setTimeout(() => { notification.style.opacity = '1'; notification.style.transform = 'translateX(0)'; }, 100);
    setTimeout(() => { notification.style.opacity = '0'; notification.style.transform = 'translateX(100%)'; setTimeout(() => notification.remove(), 300); }, 5000);
    notification.addEventListener('click', () => { notification.style.opacity = '0'; notification.style.transform = 'translateX(100%)'; setTimeout(() => notification.remove(), 300); });
}

function getNotificationIcon(type) {
    const icons = { success: 'fa-check-circle', error: 'fa-exclamation-circle', warning: 'fa-exclamation-triangle', info: 'fa-info-circle' };
    return icons[type] || icons.info;
}

function initExternalLinks() {
    const externalLinks = document.querySelectorAll('a[href^="http"], a[href^="https"]');
    externalLinks.forEach(link => { if (!link.hasAttribute('target')) { link.setAttribute('target', '_blank'); } link.setAttribute('rel', 'noopener noreferrer'); });
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => { clearTimeout(timeout); func(...args); };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

document.addEventListener('DOMContentLoaded', function() {
    initExternalLinks();
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() { this.style.transform = 'translateY(-10px) rotateX(5deg)'; });
        card.addEventListener('mouseleave', function() { this.style.transform = 'translateY(0) rotateX(0deg)'; });
    });
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() { this.style.transform = 'translateY(-3px) scale(1.1)'; });
        link.addEventListener('mouseleave', function() { this.style.transform = 'translateY(0) scale(1)'; });
    });
});

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const navbarCollapse = document.querySelector('.navbar-collapse');
        if (navbarCollapse && navbarCollapse.classList.contains('show')) {
            const navbarToggler = document.querySelector('.navbar-toggler');
            if (navbarToggler) navbarToggler.click();
        }
        const focusedElement = document.activeElement;
        if (focusedElement && (focusedElement.tagName === 'INPUT' || focusedElement.tagName === 'TEXTAREA')) focusedElement.blur();
    }
});

const throttledScrollHandler = debounce(() => {}, 16);
window.addEventListener('scroll', throttledScrollHandler);

// ============================================
// DATA VISUALIZATION & CHARTS (Infographics)
// ============================================

function initCharts() {
    const ctx1 = document.getElementById('interviewSuccessChart');
    if (ctx1) {
        new Chart(ctx1, {
            type: 'bar',
            data: { labels: ['Technical Skills', 'Communication', 'Problem Solving', 'Domain Knowledge', 'Confidence'], datasets: [{ label: 'Success Impact (%)', data: [85, 75, 90, 70, 65], backgroundColor: 'rgba(33, 128, 141, 0.7)', borderColor: 'rgba(33, 128, 141, 1)', borderWidth: 2, borderRadius: 8 }] },
            options: { responsive: true, maintainAspectRatio: true, plugins: { legend: { position: 'top' } }, scales: { y: { beginAtZero: true, max: 100, title: { display: true, text: 'Impact Percentage (%)' } } } }
        });
    }
    const ctx2 = document.getElementById('skillDemandChart');
    if (ctx2) {
        new Chart(ctx2, {
            type: 'bar',
            data: { labels: ['AI/ML', 'Web Dev', 'Cloud Computing', 'Data Science', 'Cybersecurity', 'Mobile Dev'], datasets: [{ label: 'Job Demand (in thousands)', data: [95, 88, 82, 79, 74, 68], backgroundColor: 'rgba(50, 184, 198, 0.7)', borderColor: 'rgba(50, 184, 198, 1)', borderWidth: 2 }] },
            options: { responsive: true, maintainAspectRatio: true, indexAxis: 'y', plugins: { legend: { position: 'top' } } }
        });
    }
    const ctx3 = document.getElementById('skillsPieChart');
    if (ctx3) {
        new Chart(ctx3, {
            type: 'pie',
            data: { labels: ['Frontend (35%)', 'Backend (25%)', 'Database (15%)', 'Cloud (10%)', 'AI/ML (15%)'], datasets: [{ data: [35, 25, 15, 10, 15], backgroundColor: ['rgba(33, 128, 141, 0.8)', 'rgba(50, 184, 198, 0.8)', 'rgba(41, 150, 161, 0.8)', 'rgba(29, 116, 128, 0.8)', 'rgba(26, 104, 115, 0.8)'], borderWidth: 2, borderColor: '#fff' }] },
            options: { responsive: true, maintainAspectRatio: true, plugins: { legend: { position: 'bottom' } } }
        });
    }
    const ctx4 = document.getElementById('performanceChart');
    if (ctx4) {
        new Chart(ctx4, {
            type: 'line',
            data: { labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'], datasets: [{ label: 'Mock Interview Score', data: [55, 62, 68, 75, 82, 88], borderColor: 'rgba(33, 128, 141, 1)', backgroundColor: 'rgba(33, 128, 141, 0.1)', tension: 0.4, fill: true, pointBackgroundColor: 'rgba(33, 128, 141, 1)', pointBorderColor: '#fff', pointRadius: 6, pointHoverRadius: 8 }] },
            options: { responsive: true, maintainAspectRatio: true, scales: { y: { beginAtZero: true, max: 100, title: { display: true, text: 'Performance Score' } } } }
        });
    }
}

// ============================================
// AI DEMO FUNCTIONALITY
// ============================================

function initAIDemo() {
    const analyzeBtn = document.getElementById('analyzeAnswerBtn');
    if (analyzeBtn) analyzeBtn.addEventListener('click', analyzeInterviewAnswer);
}

function analyzeInterviewAnswer() {
    const answerText = document.getElementById('userAnswer').value.trim();
    const interviewType = document.getElementById('interviewType').value;
    const feedbackDiv = document.getElementById('aiFeedback');
    const feedbackText = document.getElementById('feedbackText');
    const scoreValue = document.getElementById('scoreValue');
    const sentimentBadge = document.getElementById('sentimentBadge');
    
    if (!answerText) {
        showNotification('Please enter your interview answer first!', 'warning');
        return;
    }
    
    const analyzeBtn = document.getElementById('analyzeAnswerBtn');
    const originalText = analyzeBtn.innerHTML;
    analyzeBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Analyzing...';
    analyzeBtn.disabled = true;
    
    setTimeout(() => {
        const keywords = { technical: ['javascript', 'python', 'react', 'node', 'database', 'api', 'algorithm', 'data structure'], hr: ['team', 'leadership', 'communication', 'problem-solving', 'initiative', 'collaboration'], coding: ['function', 'variable', 'loop', 'array', 'class', 'debug', 'test', 'algorithm'] };
        const selectedKeywords = keywords[interviewType] || keywords.technical;
        const matchedKeywords = selectedKeywords.filter(keyword => answerText.toLowerCase().includes(keyword.toLowerCase()));
        let score = Math.min(10, Math.floor((matchedKeywords.length / 3) * 5 + (answerText.length / 50)));
        score = Math.max(3, score);
        
        const positiveWords = ['good', 'great', 'excellent', 'confident', 'experienced', 'skilled', 'success'];
        const negativeWords = ['bad', 'poor', 'weak', 'struggle', 'difficult', 'lack'];
        let sentimentScore = 0;
        positiveWords.forEach(word => { if (answerText.toLowerCase().includes(word)) sentimentScore++; });
        negativeWords.forEach(word => { if (answerText.toLowerCase().includes(word)) sentimentScore--; });
        let sentiment = sentimentScore > 0 ? 'Positive 😊' : (sentimentScore < 0 ? 'Needs Improvement 😟' : 'Neutral 😐');
        let sentimentClass = sentimentScore > 0 ? 'success' : (sentimentScore < 0 ? 'warning' : 'info');
        
        let feedback = '';
        if (score >= 8) feedback = `Excellent answer! You demonstrated strong ${interviewType} interview skills. Your response included key terms like: ${matchedKeywords.slice(0, 3).join(', ')}. Keep up the great preparation!`;
        else if (score >= 6) feedback = `Good answer! Your response shows solid understanding. Consider adding more specific examples and technical details. Try incorporating terms like: ${selectedKeywords.slice(0, 3).join(', ')}.`;
        else feedback = `Your answer has potential. Focus on structuring your response clearly. Include relevant keywords such as: ${selectedKeywords.slice(0, 3).join(', ')}. Practice with more specific examples to improve.`;
        feedback += `\n\n💡 AI Insight: ${matchedKeywords.length} relevant keywords detected. Your answer length (${answerText.length} chars) is ${answerText.length > 100 ? 'good' : 'short for a comprehensive response'}.`;
        
        feedbackText.innerText = feedback;
        scoreValue.innerText = score;
        sentimentBadge.innerHTML = `Sentiment: ${sentiment}`;
        sentimentBadge.className = `badge bg-${sentimentClass} ms-2`;
        feedbackDiv.style.display = 'block';
        feedbackDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        analyzeBtn.innerHTML = originalText;
        analyzeBtn.disabled = false;
        showNotification('AI Analysis Complete!', 'success');
    }, 1500);
}

function initProjectDemo() {
    window.showProjectDemo = function() {
        showNotification('🚀 Smart Interview System Demo - Coming Soon! Currently in development.', 'info');
    };
    window.showDataDemo = function() {
        showNotification('📊 Opening Data Visualization Dashboard...', 'info');
        const dataSection = document.getElementById('data-insights');
        if (dataSection) dataSection.scrollIntoView({ behavior: 'smooth' });
    };
}

const addNewStyles = () => {
    const style = document.createElement('style');
    style.textContent = `.insight-card { transition: transform 0.3s ease; } .insight-card:hover { transform: translateY(-5px); } .highlight-card { border: 2px solid var(--color-primary); background: linear-gradient(135deg, var(--color-surface), var(--color-bg-1)); } .project-icon-large { width: 100px; height: 100px; background: linear-gradient(135deg, var(--color-primary), var(--color-teal-300)); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto; } .project-icon-large i { font-size: 48px; color: white; } .featured-badge { margin-bottom: 10px; } .ai-card { border: 1px solid var(--color-primary); box-shadow: 0 5px 20px rgba(0,0,0,0.1); } @keyframes pulse { 0% { transform: scale(1); } 50% { transform: scale(1.05); } 100% { transform: scale(1); } } .btn-primary:hover { animation: pulse 0.5s ease; }`;
    document.head.appendChild(style);
};
document.addEventListener('DOMContentLoaded', addNewStyles);
