let currentSection = 1;
const totalSections = 5;

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    createHearts();
    createNavDots();
    updateProgress();
});

// Create floating hearts in background
function createHearts() {
    const container = document.getElementById('heartsContainer');
    const heartCount = 30;
    
    for (let i = 0; i < heartCount; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart-bg';
        heart.innerHTML = '❤';
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDelay = Math.random() * 15 + 's';
        heart.style.fontSize = (Math.random() * 20 + 10) + 'px';
        container.appendChild(heart);
    }
}

// Create navigation dots
function createNavDots() {
    const container = document.getElementById('navDots');
    
    for (let i = 1; i <= totalSections; i++) {
        const dot = document.createElement('div');
        dot.className = 'nav-dot' + (i === 1 ? ' active' : '');
        dot.onclick = () => goToSection(i);
        container.appendChild(dot);
    }
}

// Update progress bar
function updateProgress() {
    const progress = (currentSection / totalSections) * 100;
    document.getElementById('progressFill').style.width = progress + '%';
}

// Update navigation dots
function updateNavDots() {
    const dots = document.querySelectorAll('.nav-dot');
    dots.forEach((dot, index) => {
        if (index + 1 === currentSection) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

// Go to specific section
function goToSection(sectionNum) {
    const sections = document.querySelectorAll('.story-section');
    sections.forEach((section, index) => {
        if (index + 1 === sectionNum) {
            section.classList.add('active');
        } else {
            section.classList.remove('active');
        }
    });
    
    currentSection = sectionNum;
    updateProgress();
    updateNavDots();
}

// Next section
function nextSection() {
    if (currentSection < totalSections) {
        goToSection(currentSection + 1);
    }
}

// Accept apology - show confetti
function acceptApology() {
    const successMessage = document.getElementById('successMessage');
    successMessage.style.display = 'block';
    createConfetti();
    
    // Hide the choice buttons
    document.querySelector('.choice-buttons').style.display = 'none';
}

// Show contact message
function showContact() {
    alert("That's okay! Take your time. I'll be here when you're ready. 💕");
}

// Create confetti effect
function createConfetti() {
    const confettiContainer = document.getElementById('confetti');
    const colors = ['#ff6b6b', '#ffd700', '#00b894', '#0984e3', '#e84393', '#fdcb6e'];
    
    for (let i = 0; i < 100; i++) {
        setTimeout(() => {
            const piece = document.createElement('div');
            piece.className = 'confetti-piece';
            piece.style.left = Math.random() * 100 + '%';
            piece.style.background = colors[Math.floor(Math.random() * colors.length)];
            piece.style.animationDelay = Math.random() * 2 + 's';
            piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
            confettiContainer.appendChild(piece);
            
            // Remove after animation
            setTimeout(() => {
                piece.remove();
            }, 5000);
        }, i * 50);
    }
}

// Add keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowRight' || e.key === ' ') {
        if (currentSection < totalSections) {
            nextSection();
        }
    } else if (e.key === 'ArrowLeft') {
        if (currentSection > 1) {
            goToSection(currentSection - 1);
        }
    }
});
