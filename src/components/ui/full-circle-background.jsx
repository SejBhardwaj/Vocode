import { useEffect, useRef } from 'react';
import { cn } from '../../lib/utils';

export function FullCircleBackground({ className }) {
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
      canvas.height = window.innerHeight;
      generateStaticNoise(); // Generate noise only once when canvas resizes
    };

    const generateStaticNoise = () => {
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
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
          
          // Spread noise around the outline like sand - wider area with density falloff
          if (distance > radius - 20 && distance < radius + 35) {
            // Calculate distance from the ring outline
            const distanceFromRing = Math.abs(distance - radius);
            
            // Create density falloff - more noise closer to the ring, extended further
            const maxDistance = 35; // Extended maximum distance from ring
            const density = Math.max(0, 1 - (distanceFromRing / maxDistance));
            
            // Only place noise based on density probability (like scattered sand)
            if (Math.random() < density * 0.65) { // Slightly increased density
              const index = (y * canvas.width + x) * 4;
              const noiseValue = 180 + Math.random() * 75; // Moderately white noise
              
              // Opacity also fades with distance from ring
              const baseOpacity = 80 + Math.random() * 70;
              const finalOpacity = baseOpacity * density;
              
              data[index] = noiseValue;     // Red
              data[index + 1] = noiseValue; // Green  
              data[index + 2] = noiseValue; // Blue
              data[index + 3] = finalOpacity; // Fading opacity
            }
          }
        }
      }
      
      staticNoiseRef.current = imageData; // Store the static noise
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const baseRadius = canvas.width * 0.4;
      const radius = baseRadius;

      // Draw outer circle with clean base - thinner outline
      const gradient = ctx.createLinearGradient(centerX - radius, centerY - radius, centerX + radius, centerY + radius);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
      gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.9)');
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0.8)');

      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 2; // Made thinner from 3 to 2
      ctx.stroke();

      // Draw the STATIC noise (same every frame)
      if (staticNoiseRef.current) {
        ctx.putImageData(staticNoiseRef.current, 0, 0);
      }

      // Draw inner circle AFTER noise (so it appears on top)
      ctx.beginPath();
      ctx.arc(centerX, centerY, baseRadius - 20, 0, Math.PI * 2);
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
