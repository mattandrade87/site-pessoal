const canvas = document.getElementById("particle-canvas");
const ctx = canvas.getContext("2d");

let width = window.innerWidth;
let height = window.innerHeight;

// Configurações da animação
const LINE_COUNT = 20; // Número de linhas horizontais
const POINTS_PER_LINE = 80; // Pontos por linha (aumentado para diminuir a distância)
const NOISE_SCALE = 0.005; // Escala do ruído Perlin
const NOISE_SPEED = 0.0015; // Velocidade da animação
const AMPLITUDE = 50; // Amplitude das ondas
const POINT_RADIUS = 1.2; // Tamanho dos pontos (reduzido para melhor densidade)
const START_HEIGHT = 0.5; // Começa na metade da tela (50%)

// Criar instância do Simplex Noise
const simplex = new SimplexNoise();

function resizeCanvas() {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

let time = 0;

function animate() {
  ctx.clearRect(0, 0, width, height);

  // Desenhar linhas de pontos
  for (let line = 0; line < LINE_COUNT; line++) {
    // Calcular a posição base Y começando da metade da tela
    const yBase =
      height * START_HEIGHT +
      (line / LINE_COUNT) * (height * (1 - START_HEIGHT));

    for (let i = 0; i < POINTS_PER_LINE; i++) {
      const x = (i / POINTS_PER_LINE) * width;

      // Usar Perlin Noise para gerar o deslocamento vertical
      const noise = simplex.noise3D(x * NOISE_SCALE, yBase * NOISE_SCALE, time);

      // Aplicar o deslocamento com amplitude
      const y = yBase + noise * AMPLITUDE;

      // Desenhar o ponto
      ctx.save();
      ctx.beginPath();
      ctx.arc(x, y, POINT_RADIUS, 0, Math.PI * 2);
      ctx.fillStyle = "red";
      ctx.shadowColor = "red";
      ctx.shadowBlur = 0; // Reduzido para melhor performance
      ctx.globalAlpha = 0.8;
      ctx.fill();
      ctx.restore();
    }
  }

  // Incrementar o tempo para a animação
  time += NOISE_SPEED;

  requestAnimationFrame(animate);
}

// Iniciar a animação
animate();
