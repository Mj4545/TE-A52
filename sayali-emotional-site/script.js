// Create floating hearts background
function createFloatingHearts() {
    const container = document.getElementById('hearts-container');
    const hearts = ['❤️', '💕', '💖', '💗', '💓', '💞', '💘', '💝'];
    
    for (let i = 0; i < 30; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart-bg';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDelay = Math.random() * 15 + 's';
        heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
        container.appendChild(heart);
    }
}

// Envelope interaction
const envelope = document.getElementById('envelope');
const heartSeal = document.getElementById('heart-seal');
const frontFlap = document.querySelector('.front-flap');
const card = document.getElementById('card');
const envelopeWrapper = document.getElementById('envelope-wrapper');
const storyContainer = document.getElementById('story-container');

envelope.addEventListener('click', function() {
    // Open envelope animation
    heartSeal.style.transform = 'translate(-50%, -50%) scale(0) rotate(180deg)';
    heartSeal.style.opacity = '0';
    
    setTimeout(() => {
        frontFlap.style.transform = 'rotateX(180deg)';
        frontFlap.style.zIndex = '1';
    }, 300);
    
    setTimeout(() => {
        card.style.transform = 'translateY(-150px) scale(1.1)';
        card.style.zIndex = '10';
    }, 600);
    
    setTimeout(() => {
        envelopeWrapper.style.display = 'none';
        storyContainer.classList.remove('hidden');
        startScene(1);
    }, 1400);
});

// Scene management
let currentScene = 1;

function startScene(sceneNum) {
    document.querySelectorAll('.scene').forEach(scene => {
        scene.classList.remove('active');
    });
    document.getElementById('scene' + sceneNum).classList.add('active');
    currentScene = sceneNum;
}

function nextScene(sceneNum) {
    const current = document.getElementById('scene' + currentScene);
    current.style.opacity = '0';
    current.style.transform = 'translateX(-50px)';
    
    setTimeout(() => {
        current.classList.remove('active');
        document.getElementById('scene' + sceneNum).classList.add('active');
        currentScene = sceneNum;
    }, 400);
}

// Handle YES button
function handleYes() {
    const scene5 = document.getElementById('scene5');
    scene5.style.opacity = '0';
    scene5.style.transform = 'scale(0.8)';
    
    setTimeout(() => {
        storyContainer.classList.add('hidden');
        document.getElementById('celebration').classList.remove('hidden');
        createConfetti();
        
        // Set WhatsApp link - UPDATE THIS NUMBER!
        const phoneNumber = "919876543210"; // Replace with your actual number
        const message = encodeURIComponent("Hi! I just saw your beautiful apology website. Yes, I forgive you! ❤️");
        document.getElementById('whatsapp-link').href = `https://wa.me/${phoneNumber}?text=${message}`;
    }, 400);
}

// Handle NO button
function handleNo() {
    const scene5 = document.getElementById('scene5');
    scene5.style.opacity = '0';
    scene5.style.transform = 'scale(0.8)';
    
    setTimeout(() => {
        storyContainer.classList.add('hidden');
        document.getElementById('teddy-sad').classList.remove('hidden');
        
        // Play sad sound effect (optional)
        // You can add audio here if desired
    }, 400);
}

// Reset to envelope
function resetToEnvelope() {
    document.getElementById('teddy-sad').classList.add('hidden');
    envelopeWrapper.style.display = 'block';
    
    // Reset envelope state
    heartSeal.style.transform = 'translate(-50%, -50%) scale(1) rotate(0deg)';
    heartSeal.style.opacity = '1';
    frontFlap.style.transform = 'rotateX(0deg)';
    frontFlap.style.zIndex = '5';
    card.style.transform = 'translateY(0) scale(1)';
    card.style.zIndex = '3';
    
    // Reset scenes
    document.querySelectorAll('.scene').forEach(scene => {
        scene.classList.remove('active');
        scene.style.opacity = '1';
        scene.style.transform = 'none';
    });
    startScene(1);
}

// Create confetti
function createConfetti() {
    const container = document.getElementById('confetti-container');
    const colors = ['#ff6b8a', '#00b894', '#0984e3', '#fdcb6e', '#e17055', '#a29bfe', '#00cec9'];
    
    for (let i = 0; i < 150; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = Math.random() * 3 + 's';
        confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
        
        // Random shapes
        if (Math.random() > 0.5) {
            confetti.style.borderRadius = '50%';
        } else {
            confetti.style.borderRadius = '0';
        }
        
        container.appendChild(confetti);
        
        // Remove confetti after animation
        setTimeout(() => {
            confetti.remove();
        }, 5000);
    }
}

// Initialize on page load
window.addEventListener('load', function() {
    createFloatingHearts();
});

// Add keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowRight' && currentScene < 5) {
        nextScene(currentScene + 1);
    } else if (e.key === 'Escape' && !storyContainer.classList.contains('hidden')) {
        // Optional: Add escape functionality
    }
});

// Add touch support for mobile
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    if (touchEndX < touchStartX - 50 && currentScene < 5) {
        // Swipe left - next scene
        nextScene(currentScene + 1);
    }
    if (touchEndX > touchStartX + 50 && currentScene > 1) {
        // Swipe right - previous scene
        nextScene(currentScene - 1);
    }
}

// Add heartbeat effect to yes button
const yesBtn = document.querySelector('.yes-btn');
if (yesBtn) {
    setInterval(() => {
        yesBtn.style.transform = 'scale(1.05)';
        setTimeout(() => {
            yesBtn.style.transform = 'scale(1)';
        }, 200);
    }, 2000);
}

// Emotional tear effect on scene 4
function showTear() {
    const tear = document.querySelector('.tear-drop');
    if (tear && document.getElementById('scene4').classList.contains('active')) {
        tear.style.opacity = '1';
    }
}

// Check every second if we're on scene 4
setInterval(() => {
    if (currentScene === 4) {
        showTear();
    }
}, 1000);

console.log("❤️ Website loaded successfully! Good luck with Sayali!");
