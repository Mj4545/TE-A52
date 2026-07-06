// Create floating hearts background
function createHearts() {
    const heartsContainer = document.getElementById('heartsContainer');
    const heartEmojis = ['💕', '💖', '💗', '💓', '💞', '❤️', '🩷'];
    
    // Create 30 floating hearts
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.className = 'heart';
            heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
            heart.style.left = Math.random() * 100 + '%';
            heart.style.animationDelay = Math.random() * 6 + 's';
            heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
            heartsContainer.appendChild(heart);
        }, i * 200);
    }
}

// Show forgiveness message when button is clicked
function showForgiveness() {
    const forgiveBtn = document.querySelector('.forgive-btn');
    const forgivenessMessage = document.getElementById('forgivenessMessage');
    
    forgiveBtn.style.display = 'none';
    forgivenessMessage.style.display = 'block';
    
    // Add confetti effect
    createConfetti();
}

// Create confetti celebration
function createConfetti() {
    const colors = ['#ff6b9d', '#ff4081', '#ffd700', '#ffecd2', '#fcb69f'];
    
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.top = '-10px';
            confetti.style.zIndex = '1000';
            confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
            document.body.appendChild(confetti);
            
            // Animate confetti falling
            const duration = Math.random() * 3000 + 2000;
            const endX = (Math.random() - 0.5) * 200;
            
            confetti.animate([
                { transform: `translate(0, 0) rotate(0deg)`, opacity: 1 },
                { transform: `translate(${endX}px, 100vh) rotate(${Math.random() * 720}deg)`, opacity: 0 }
            ], {
                duration: duration,
                easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                fill: 'forwards'
            });
            
            // Remove confetti after animation
            setTimeout(() => {
                confetti.remove();
            }, duration);
        }, i * 50);
    }
}

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    createHearts();
    
    // Add smooth scroll behavior
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
    
    // Add intersection observer for fade-in animations on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
});

// Add some interactive fun - click on hearts to make them bigger
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('heart')) {
        e.target.style.transform = 'scale(2)';
        e.target.style.transition = 'transform 0.3s ease';
        setTimeout(() => {
            e.target.style.transform = 'scale(1)';
        }, 300);
    }
});
