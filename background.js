const canvas = document.getElementById("particle-canvas");
const ctx = canvas.getContext("2d");

let width = window.innerWidth;
let height = window.innerHeight;
let particles = [];
const PARTICLE_COUNT = Math.floor((width * height) / 1200); // Ajuste para densidade
const WAVE_AMPLITUDE = 24; // Amplitude da onda
const WAVE_LENGTH = 180; // Comprimento da onda
const WAVE_SPEED = 0.8; // Velocidade da onda

function resizeCanvas() {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
}

window.addEventListener("resize", () => {
  resizeCanvas();
  createParticles();
});

function createParticles() {
  particles = [];
  const count = Math.floor((width * height) / 1200);
  for (let i = 0; i < count; i++) {
    // Distribuição em "grid" para onda mais visível
    const cols = Math.floor(width / 32);
    const x = (i % cols) * (width / cols) + Math.random() * 8;
    const y = Math.floor(i / cols) * 28 + Math.random() * 8;
    particles.push({
      baseX: x,
      baseY: y,
      x: x,
      y: y,
      r: Math.random() * 1.2 + 0.4,
      dx: (Math.random() - 0.5) * 0.2,
      dy: (Math.random() - 0.5) * 0.2,
      alpha: Math.random() * 0.5 + 0.5,
      phase: Math.random() * Math.PI * 2,
    });
  }
}

let startTime = null;
function animate(ts) {
  if (!startTime) startTime = ts;
  const t = (ts - startTime) / 1000;
  ctx.clearRect(0, 0, width, height);
  for (let p of particles) {
    // Movimento de onda senoidal (vertical)
    p.y =
      p.baseY +
      Math.sin(p.baseX / WAVE_LENGTH + t * WAVE_SPEED + p.phase) *
        WAVE_AMPLITUDE;
    // Movimento individual leve
    p.x += p.dx;
    p.baseY += p.dy;
    // Rebote nas bordas
    if (p.x < 0 || p.x > width) p.dx *= -1;
    if (p.baseY < 0 || p.baseY > height) p.dy *= -1;

    ctx.save();
    ctx.globalAlpha = p.alpha;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
    ctx.fillStyle = "#e53935";
    ctx.shadowColor = "#e53935";
    ctx.shadowBlur = 8;
    ctx.fill();
    ctx.restore();
  }
  requestAnimationFrame(animate);
}

resizeCanvas();
createParticles();
requestAnimationFrame(animate);
