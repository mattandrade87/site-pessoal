import React, { useEffect, useRef } from "react";

declare class SimplexNoise {
  noise3D(x: number, y: number, z: number): number;
}

const AnimatedBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d")!;
    if (!ctx) return;

    let width: number = window.innerWidth;
    let height: number = window.innerHeight;

    // Configurações da animação
    const LINE_COUNT = 20;
    const POINTS_PER_LINE = 80;
    const NOISE_SCALE = 0.005;
    const NOISE_SPEED = 0.002;
    const AMPLITUDE = 80;
    const POINT_RADIUS = 1.2;
    const START_HEIGHT = 0.3;
    const END_HEIGHT = 0.7;

    // Criar instância do Simplex Noise
    const simplex = new SimplexNoise();

    function resizeCanvas(): void {
      const canvas = document.getElementById(
        "particle-canvas"
      ) as HTMLCanvasElement | null;

      if (canvas) {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
      }
    }
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    let time: number = 0;

    function animate(): void {
      ctx.clearRect(0, 0, width, height);

      for (let line = 0; line < LINE_COUNT; line++) {
        const yBase =
          height * START_HEIGHT +
          (line / LINE_COUNT) * (height * (END_HEIGHT - START_HEIGHT));

        for (let i = 0; i < POINTS_PER_LINE; i++) {
          const x = (i / POINTS_PER_LINE) * width;

          const noise = simplex.noise3D(
            x * NOISE_SCALE,
            yBase * NOISE_SCALE,
            time
          );
          const y = yBase + noise * AMPLITUDE;

          ctx.save();
          ctx.beginPath();
          ctx.arc(x, y, POINT_RADIUS, 0, Math.PI * 2);
          ctx.fillStyle = "red";
          ctx.shadowColor = "red";
          ctx.shadowBlur = 0;
          ctx.globalAlpha = 0.8;
          ctx.fill();
          ctx.restore();
        }
      }

      time += NOISE_SPEED;
      requestAnimationFrame(animate);
    }

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <div id="vanta-bg">
      <canvas ref={canvasRef} id="particle-canvas"></canvas>
      <div className="content">
        <h1>
          Mion Tech <br />
          IA Solutions
        </h1>
        <p className="subtitle">
          Powerful management software to optimize your business operations
        </p>
      </div>
    </div>
  );
};

export default AnimatedBackground;
