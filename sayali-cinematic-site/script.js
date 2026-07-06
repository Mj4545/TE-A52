// Create floating hearts background
function createHearts() {
    const container = document.getElementById('heartsContainer');
    const heartSymbols = ['❤️', '💕', '💖', '💗', '💓', '💞', '💘', '♥️'];
    
    // Create 30 hearts
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.className = 'heart';
            heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
            heart.style.left = Math.random() * 100 + '%';
            heart.style.animationDuration = (Math.random() * 10 + 10) + 's';
            heart.style.animationDelay = Math.random() * 5 + 's';
            heart.style.fontSize = (Math.random() * 2 + 1) + 'rem';
            container.appendChild(heart);
        }, i * 300);
    }
}

// Scene navigation
function nextScene(sceneNumber) {
    // Hide all scenes
    document.querySelectorAll('.scene').forEach(scene => {
        scene.classList.remove('active');
    });
    
    // Show target scene
    const targetScene = document.getElementById('scene' + sceneNumber);
    if (targetScene) {
        targetScene.classList.add('active');
    }
}

// Show final scene based on choice
function showFinalScene(forgiven) {
    const scene5 = document.getElementById('scene5');
    const finalTitle = document.getElementById('finalTitle');
    const finalText = document.getElementById('finalText');
    
    // Hide all scenes
    document.querySelectorAll('.scene').forEach(scene => {
        scene.classList.remove('active');
    });
    
    // Show scene 5
    scene5.classList.add('active');
    
    if (forgiven) {
        finalTitle.textContent = 'Thank You, Sayali! 🎉';
        finalText.innerHTML = `
            Your forgiveness means everything to me.<br><br>
            I promise to make it up to you with more laughter,<br>
            more beautiful moments, and more reasons to smile.<br>
            Let's create more memories together.<br><br>
            Can we talk soon? I'd love to hear your voice. ❤️
        `;
        
        // Trigger confetti celebration
        createConfetti();
    } else {
        finalTitle.textContent = 'I Understand 💙';
        finalText.innerHTML = `
            Take all the time you need, Sayali.<br><br>
            I just wanted you to know how truly sorry I am<br>
            and how much you mean to me.<br><br>
            Whenever you're ready to talk, I'll be here.<br>
            No pressure, just know that I care about you deeply. 🌟
        `;
    }
}

// Create confetti effect
function createConfetti() {
    const colors = ['#ff416c', '#ff4b2b', '#ffd700', '#00ff88', '#00d4ff', '#ff6b6b', '#a8e6cf'];
    
    for (let i = 0; i < 100; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
            confetti.style.width = (Math.random() * 10 + 5) + 'px';
            confetti.style.height = (Math.random() * 10 + 5) + 'px';
            confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
            document.body.appendChild(confetti);
            
            // Remove confetti after animation
            setTimeout(() => {
                confetti.remove();
            }, 5000);
        }, i * 50);
    }
}

// Initialize when page loads
window.addEventListener('DOMContentLoaded', () => {
    createHearts();
});
