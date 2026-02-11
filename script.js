// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Particle Background (Hero)
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray;

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        this.color = `rgba(255, 209, 220, ${Math.random()})`;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size > 0.2) this.size -= 0.01; // twinkle effect
        if (this.size <= 0.2) this.size = Math.random() * 3 + 1;
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    particlesArray = [];
    for (let i = 0; i < 100; i++) {
        particlesArray.push(new Particle());
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
    }
    requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
});

// Floating Hearts Logic
function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('floating-heart');
    heart.innerHTML = '❤️';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = Math.random() * 3 + 10 + 's'; // 10-13s
    heart.style.fontSize = Math.random() * 20 + 10 + 'px';

    const container = document.querySelector('.hearts-container');
    if (container) {
        container.appendChild(heart);
        setTimeout(() => {
            heart.remove();
        }, 15000); // Cleanup
    }
}
setInterval(createHeart, 800);

// GSAP Animations
// Hero Text
gsap.to(".hero-title", {
    opacity: 1,
    y: 0,
    duration: 2,
    ease: "power2.out",
    delay: 0.5
});

gsap.to(".countdown-container", {
    opacity: 1,
    y: 0,
    duration: 2,
    ease: "power2.out",
    delay: 1
});

// Scroll Progress Bar
window.onscroll = function () {
    let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrolled = (winScroll / height) * 100;
    let scrollBar = document.getElementById("scroll-bar");
    if (scrollBar) scrollBar.style.width = scrolled + "%";
};

// "Us" Section Animations
gsap.from(".gs-slide-left", {
    scrollTrigger: {
        trigger: "#us-section",
        start: "top 70%",
        scrub: 1, // Parallax feel
    },
    x: -100,
    opacity: 0,
    duration: 1.5,
    ease: "power2.out"
});

gsap.from(".gs-slide-right", {
    scrollTrigger: {
        trigger: "#us-section",
        start: "top 70%",
        scrub: 1, // Parallax feel
    },
    x: 100,
    opacity: 0,
    duration: 1.5,
    ease: "power2.out"
});

gsap.from(".gs-pop", {
    scrollTrigger: {
        trigger: "#us-section",
        start: "top 70%",
    },
    scale: 0,
    opacity: 0,
    duration: 1,
    delay: 0.5,
    ease: "elastic.out(1, 0.3)"
});

// Message Fade In
const messages = document.querySelectorAll('.fade-in-text');
messages.forEach((msg, index) => {
    gsap.from(msg, {
        scrollTrigger: {
            trigger: msg,
            start: "top 80%",
        },
        opacity: 0,
        y: 20,
        duration: 1,
        delay: index * 0.3
    });
});

// Timeline Animation & Parallax
const timelineItems = document.querySelectorAll('.timeline-item');
timelineItems.forEach((item, index) => {
    gsap.to(item, {
        scrollTrigger: {
            trigger: item,
            start: "top 85%",
            toggleActions: "play none none reverse"
        },
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out"
    });

    // Slight Parallax on images
    const img = item.querySelector('img');
    if (img) {
        gsap.to(img, {
            scrollTrigger: {
                trigger: item,
                start: "top bottom",
                end: "bottom top",
                scrub: 1
            },
            y: -20, // Move image slightly up as we scroll down
            scale: 1.05
        });
    }
});

// Love Map Animation
gsap.from(".map-pin", {
    scrollTrigger: {
        trigger: "#love-map-section",
        start: "top 70%",
    },
    scale: 0,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
    ease: "back.out(1.7)"
});

// Poem Box Interaction
const giftBox = document.getElementById('gift-box');
const poemContent = document.getElementById('poem-content');

if (giftBox) {
    giftBox.addEventListener('click', () => {
        giftBox.classList.add('open');

        // Explosion Effect
        confetti({
            particleCount: 200,
            spread: 100,
            origin: { y: 0.6 },
            colors: ['#ff4d6d', '#ffd1dc', '#d4af37']
        });

        setTimeout(() => {
            poemContent.classList.remove('hidden');
            poemContent.classList.add('visible');
            ScrollTrigger.refresh();
        }, 800);
    });
}

// Poem Carousel Logic
let currentPoemIndex = 0;
const poems = document.querySelectorAll('.poem');

window.changePoem = function (direction) {
    poems[currentPoemIndex].classList.remove('active');
    currentPoemIndex += direction;
    if (currentPoemIndex < 0) currentPoemIndex = poems.length - 1;
    if (currentPoemIndex >= poems.length) currentPoemIndex = 0;
    poems[currentPoemIndex].classList.add('active');
};


// Candle Interaction
const candleContainer = document.getElementById('candle-container');
const flame = document.getElementById('flame');
const wishMessage = document.getElementById('wish-message');

if (candleContainer) {
    candleContainer.addEventListener('click', () => {
        flame.classList.add('out');
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#ff4d6d', '#d4af37', '#ffffff']
        });
        setTimeout(() => {
            wishMessage.classList.remove('hidden');
            wishMessage.classList.add('visible-text');
        }, 500);
    });
}

// Music Control with Fade In
const musicBtn = document.getElementById('music-btn');
const audio = document.getElementById('bg-music');
let isPlaying = false;

// Auto Fade-in on Load (Note: browsers block autoplay without interaction, 
// so this relies on user clicking 'Play' or a previous interaction)
function fadeAudioIn() {
    audio.volume = 0;
    audio.play();
    let vol = 0;
    const interval = setInterval(() => {
        if (vol < 0.8) {
            vol += 0.05;
            audio.volume = vol;
        } else {
            clearInterval(interval);
        }
    }, 200);
}

if (musicBtn && audio) {
    musicBtn.addEventListener('click', () => {
        if (isPlaying) {
            audio.pause();
            musicBtn.innerHTML = "🎵 Play Music";
        } else {
            fadeAudioIn();
            musicBtn.innerHTML = "⏸ Pause Music";
        }
        isPlaying = !isPlaying;
    });
}

// Theme Toggle Logic
const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');

function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    }
}

if (toggleSwitch) {
    toggleSwitch.addEventListener('change', switchTheme, false);

    // Check local storage
    const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;
    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
        if (currentTheme === 'light') {
            toggleSwitch.checked = true;
        }
    }
}
