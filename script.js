

const canvas = document.getElementById("mouseCanvas");
const ctx = canvas.getContext("2d");


canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});


const particles = [];

class Particle {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 10 + 8;
        this.color = color;
        this.speedX = Math.random() * 4 - 2;
        this.speedY = Math.random() * 4 - 2;
        this.life = 100;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life -= 2;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.life / 5})`;
        ctx.fill();
    }
}


window.addEventListener("mousemove", (e) => {
    const colors = [
        { r: 255, g: 99, b: 132 },
        { r: 54, g: 162, b: 235 },
        { r: 255, g: 206, b: 86 },
        { r: 75, g: 192, b: 192 },
        { r: 153, g: 102, b: 255 }
    ];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    for (let i = 0; i < 8; i++) {
        particles.push(new Particle(e.clientX, e.clientY, randomColor));
    }
});


function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((particle, index) => {
        particle.update();
        particle.draw();

      
        if (particle.life <= 0) {
            particles.splice(index, 1);
        }
    });
    requestAnimationFrame(animate);
}

animate();
