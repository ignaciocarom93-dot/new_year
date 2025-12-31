// Crear estrellas de fondo
function createStars() {
    const starsContainer = document.getElementById('stars');
    const numberOfStars = 150;

    for (let i = 0; i < numberOfStars; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 2 + 's';
        star.style.animationDuration = (Math.random() * 2 + 1) + 's';
        star.style.width = (Math.random() * 3 + 1) + 'px';
        star.style.height = star.style.width;
        starsContainer.appendChild(star);
    }
}

// Cuenta regresiva
function updateCountdown() {
    // Establecer la fecha objetivo (1 de enero del próximo año)
    const now = new Date();
    const currentYear = now.getFullYear();
    const nextYear = currentYear + 1;
    const targetDate = new Date(`January 1, ${nextYear} 00:00:00`).getTime();
    
    const nowTime = new Date().getTime();
    const difference = targetDate - nowTime;

    if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    } else {
        // Si ya pasó el año nuevo, mostrar 00:00:00:00
        document.getElementById('days').textContent = '00';
        document.getElementById('hours').textContent = '00';
        document.getElementById('minutes').textContent = '00';
        document.getElementById('seconds').textContent = '00';
        
        // Cambiar mensaje
        document.getElementById('welcomeText').textContent = '¡Feliz Año Nuevo, Mi Amor! 💕 Que este año esté lleno de amor y momentos especiales juntos';
    }
}

// Fuegos artificiales
class Fireworks {
    constructor() {
        this.canvas = document.getElementById('fireworks');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.setupCanvas();
        this.animate();
        this.createFirework();
        
        // Crear fuegos artificiales periódicamente
        setInterval(() => this.createFirework(), 2000);
    }

    setupCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        
        window.addEventListener('resize', () => {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
        });
    }

    createFirework() {
        const x = Math.random() * this.canvas.width;
        const y = Math.random() * this.canvas.height * 0.5; // Solo en la mitad superior
        const colors = ['#ff6b9d', '#ff9ff3', '#ffd93d', '#ff6b6b', '#ffb3d9', '#ffc0e5'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        const particleCount = 50;

        for (let i = 0; i < particleCount; i++) {
            const angle = (Math.PI * 2 * i) / particleCount;
            const velocity = Math.random() * 5 + 2;
            this.particles.push({
                x: x,
                y: y,
                vx: Math.cos(angle) * velocity,
                vy: Math.sin(angle) * velocity,
                color: color,
                life: 1,
                decay: Math.random() * 0.02 + 0.01,
                size: Math.random() * 3 + 2
            });
        }
    }

    animate() {
        this.ctx.fillStyle = 'rgba(10, 10, 46, 0.1)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        for (let i = this.particles.length - 1; i >= 0; i--) {
            const particle = this.particles[i];
            
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.vy += 0.1; // Gravedad
            particle.life -= particle.decay;

            if (particle.life > 0) {
                this.ctx.globalAlpha = particle.life;
                this.ctx.fillStyle = particle.color;
                this.ctx.shadowBlur = 10;
                this.ctx.shadowColor = particle.color;
                this.ctx.beginPath();
                this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                this.ctx.fill();
                this.ctx.shadowBlur = 0;
            } else {
                this.particles.splice(i, 1);
            }
        }

        this.ctx.globalAlpha = 1;
        requestAnimationFrame(() => this.animate());
    }
}

// Confetti
function createConfetti() {
    const confettiContainer = document.getElementById('confetti-container');
    const colors = ['#ff6b6b', '#ffd93d', '#4ecdc4', '#a8e6cf', '#ff9ff3', '#54a0ff'];
    const shapes = ['square', 'circle'];
    
    setInterval(() => {
        if (Math.random() > 0.7) { // Crear confetti ocasionalmente
            for (let i = 0; i < 5; i++) {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';
                confetti.style.left = Math.random() * 100 + '%';
                confetti.style.top = '-10px';
                confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.width = (Math.random() * 8 + 5) + 'px';
                confetti.style.height = confetti.style.width;
                
                if (Math.random() > 0.5) {
                    confetti.style.borderRadius = '50%';
                }
                
                confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
                confetti.style.animationDelay = Math.random() * 0.5 + 's';
                
                confettiContainer.appendChild(confetti);
                
                setTimeout(() => {
                    confetti.remove();
                }, 5000);
            }
        }
    }, 500);
}

// Mensajes rotativos
function rotateMessages() {
    const messages = [
        'Que este nuevo año esté lleno de momentos especiales juntos, risas compartidas y mucho amor',
        'Eres mi mayor bendición y quiero que este año esté lleno de felicidad para ti',
        'Que cada día del nuevo año traiga nuevas razones para sonreír y estar juntos',
        'Quiero crear mil recuerdos hermosos contigo este año, mi amor',
        'Que nuestro amor crezca más fuerte cada día y que seamos muy felices juntos',
        'Eres lo mejor que me ha pasado y quiero que este año sea increíble para ti',
        'Que todos tus sueños se hagan realidad y que esté aquí para celebrarlos contigo'
    ];
    
    let currentIndex = 0;
    const welcomeText = document.getElementById('welcomeText');
    
    setInterval(() => {
        currentIndex = (currentIndex + 1) % messages.length;
        welcomeText.style.opacity = '0';
        setTimeout(() => {
            welcomeText.textContent = messages[currentIndex];
            welcomeText.style.opacity = '1';
        }, 500);
    }, 5000);
}

// Efecto de hover en las tarjetas con partículas
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Crear pequeñas partículas al hacer hover
            for (let i = 0; i < 10; i++) {
                const particle = document.createElement('div');
                particle.style.position = 'absolute';
                particle.style.width = '4px';
                particle.style.height = '4px';
                particle.style.backgroundColor = '#ff9ff3';
                particle.style.borderRadius = '50%';
                particle.style.pointerEvents = 'none';
                particle.style.left = '50%';
                particle.style.top = '50%';
                particle.style.transform = 'translate(-50%, -50%)';
                particle.style.transition = 'all 0.6s ease-out';
                
                const angle = (Math.PI * 2 * i) / 10;
                const distance = 100;
                const x = Math.cos(angle) * distance;
                const y = Math.sin(angle) * distance;
                
                card.style.position = 'relative';
                card.appendChild(particle);
                
                setTimeout(() => {
                    particle.style.left = (50 + x) + '%';
                    particle.style.top = (50 + y) + '%';
                    particle.style.opacity = '0';
                }, 10);
                
                setTimeout(() => particle.remove(), 600);
            }
        });
    });
});

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    createStars();
    updateCountdown();
    setInterval(updateCountdown, 1000);
    new Fireworks();
    createConfetti();
    rotateMessages();
});
