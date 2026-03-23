import { useEffect, useRef } from 'react';
import { cn } from '../../lib/utils';

export function FooterSemicircle({ className }) {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const staticNoiseRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = 400; // Increased canvas height to match footer
      generateStaticNoise();
    };

    const generateStaticNoise = () => {
      const centerX = canvas.width / 2;
      const centerY = canvas.height * 1.6; // Position center at 160% of canvas height (moved way further down)
      const baseRadius = canvas.width * 0.4;
      const radius = baseRadius;

      // Generate static noise once and store it
      const imageData = ctx.createImageData(canvas.width, canvas.height);
      const data = imageData.data;
      
      for (let x = 0; x < canvas.width; x++) {
        for (let y = 0; y < canvas.height; y++) {
          const dx = x - centerX;
          const dy = y - centerY;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          // Only show noise for the top semicircle part
          if (dy < 0 && distance > radius - 20 && distance < radius + 35) {
            const distanceFromRing = Math.abs(distance - radius);
            const maxDistance = 35;
            const density = Math.max(0, 1 - (distanceFromRing / maxDistance));
            
            if (Math.random() < density * 0.65) {
              const index = (y * canvas.width + x) * 4;
              const noiseValue = 180 + Math.random() * 75;
              const baseOpacity = 80 + Math.random() * 70;
              const finalOpacity = baseOpacity * density;
              
              data[index] = noiseValue;
              data[index + 1] = noiseValue;
              data[index + 2] = noiseValue;
              data[index + 3] = finalOpacity;
            }
          }
        }
      }
      
      staticNoiseRef.current = imageData;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height * 1.6; // Position center at 160% of canvas height (moved way further down)
      const baseRadius = canvas.width * 0.4;
      const radius = baseRadius;

      // Draw semicircle outline (only top half)
      const gradient = ctx.createLinearGradient(centerX - radius, centerY - radius, centerX + radius, centerY + radius);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
      gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.9)');
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0.8)');

      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, Math.PI, 2 * Math.PI); // Semicircle from π to 2π (top half)
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw the STATIC noise
      if (staticNoiseRef.current) {
        ctx.putImageData(staticNoiseRef.current, 0, 0);
      }

      // Draw inner semicircle
      ctx.beginPath();
      ctx.arc(centerX, centerY, baseRadius - 20, Math.PI, 2 * Math.PI);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
      ctx.lineWidth = 2;
      ctx.stroke();

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className={cn('absolute inset-0 pointer-events-none', className)}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ background: 'transparent' }}
      />
    </div>
  );
}
