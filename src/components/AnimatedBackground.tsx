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
    const LINE_COUNT = 25;
    const POINTS_PER_LINE = 80;
    const NOISE_SCALE = 0.005;
    const NOISE_SPEED = 0.002;
    const AMPLITUDE = 80;
    const POINT_RADIUS = 1.2;
    const START_HEIGHT = 0.3;
    const END_HEIGHT = 0.7;

    const simplex = new SimplexNoise();

    function resizeCanvas(): void {
      const currentCanvas = canvasRef.current;
      if (!currentCanvas) return;

      width = window.innerWidth;
      height = window.innerHeight;
      currentCanvas.width = width;
      currentCanvas.height = height;
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

          const rootStyles = getComputedStyle(document.documentElement);
          const bgAnimationColor = rootStyles
            .getPropertyValue("--color-background-animation")
            .trim();
          ctx.fillStyle = bgAnimationColor;

          ctx.save();
          ctx.beginPath();
          ctx.arc(x, y, POINT_RADIUS, 0, Math.PI * 2);
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
    <div
      id="vanta-bg"
      className="fixed inset-0 w-screen h-full pointer-events-none"
    >
      <canvas
        ref={canvasRef}
        id="particle-canvas"
        className="w-screen h-full"
        style={{ zIndex: 0 }}
      ></canvas>
    </div>
  );
};

export default AnimatedBackground;
