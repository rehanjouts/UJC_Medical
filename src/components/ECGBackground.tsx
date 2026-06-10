import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface ECGBackgroundProps {
    targetRef?: React.RefObject<HTMLElement | null>;
}

const ECGBackground: React.FC<ECGBackgroundProps> = ({ targetRef }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let currentX = 0;
        const points: { x: number, y: number, intensity: number }[] = [];
        const speed = 3.5; // pixels per frame

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = canvas.parentElement ? canvas.parentElement.clientHeight : window.innerHeight;
            points.length = 0; // clear trail on resize
        };

        window.addEventListener('resize', resize);
        resize();

        const draw = () => {
            if (!ctx || !canvas) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // --- DRAW ECG OSCILLOSCOPE ---
            currentX += speed;

            // ECG cycle parameters
            const period = 900;
            const localX = currentX % period;
            const scaleY = 1.3;
            let yOffset = 0;
            
            // Mathematically precise P-QRS-T complex
            if (localX > 100 && localX < 140) {
                // P wave
                yOffset = -8 * Math.sin(((localX - 100) / 40) * Math.PI) * scaleY;
            } else if (localX >= 180 && localX < 190) {
                // Q wave
                yOffset = 8 * Math.sin(((localX - 180) / 10) * Math.PI) * scaleY;
            } else if (localX >= 190 && localX < 205) {
                // R wave spike (sharp)
                let t = (localX - 190) / 15;
                if (t < 0.5) yOffset = -70 * (t * 2) * scaleY;
                else yOffset = -70 * (1 - (t - 0.5) * 2) * scaleY;
            } else if (localX >= 205 && localX < 215) {
                // S wave
                yOffset = 12 * Math.sin(((localX - 205) / 10) * Math.PI) * scaleY;
            } else if (localX > 280 && localX < 360) {
                // T wave
                yOffset = -12 * Math.sin(((localX - 280) / 80) * Math.PI) * scaleY;
            }

            const screenX = currentX % canvas.width;
            
            let centerY = canvas.height * 0.65;
            if (targetRef && targetRef.current) {
                const canvasRect = canvas.getBoundingClientRect();
                const targetRect = targetRef.current.getBoundingClientRect();
                centerY = targetRect.top - canvasRect.top + (targetRect.height / 2);
            }
            
            const y = centerY + yOffset;
            
            // Calculate intensity (0 for baseline, 1 for peak of the R spike)
            const maxAmplitude = 70 * scaleY;
            let currentIntensity = Math.abs(yOffset) / maxAmplitude;
            // Enhance the orange slightly for smaller bumps like P/T waves
            currentIntensity = Math.min(1, Math.max(0, currentIntensity * 1.5));

            points.push({ x: screenX, y: y, intensity: currentIntensity });
            
            // Maintain a trail length equivalent to about 70% of the screen
            const maxPoints = Math.min(400, Math.floor((canvas.width * 0.7) / speed));
            if (points.length > maxPoints) {
                points.shift();
            }

            ctx.save();
            ctx.lineJoin = 'round';
            ctx.lineCap = 'round';
            
            // Draw the fading trail
            for (let i = 0; i < points.length - 1; i++) {
                const p1 = points[i];
                const p2 = points[i + 1];
                
                // Prevent drawing a line across the screen when wrapping
                if (Math.abs(p2.x - p1.x) > canvas.width / 2) continue;
                
                ctx.beginPath();
                ctx.moveTo(p1.x, p1.y);
                ctx.lineTo(p2.x, p2.y);
                
                // Exponential fade for a beautiful tail
                const progress = i / points.length; 
                const opacity = Math.pow(progress, 2.5) * 0.5; 
                
                // Interpolate from Blue (baseline, intensity=0) to Orange (spike, intensity=1)
                const mix = (p1.intensity + p2.intensity) / 2;
                const r = Math.round(2 + (233 - 2) * mix);
                const g = Math.round(46 + (146 - 46) * mix);
                const b = Math.round(105 + (53 - 105) * mix);

                ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${opacity.toFixed(3)})`;
                ctx.lineWidth = 1.8;
                ctx.stroke();
            }

            // Draw glowing lead dot at the front of the line
            const head = points[points.length - 1];
            if (head) {
                ctx.beginPath();
                ctx.arc(head.x, head.y, 2.5, 0, Math.PI * 2);
                
                const mix = head.intensity;
                const r = Math.round(2 + (233 - 2) * mix);
                const g = Math.round(46 + (146 - 46) * mix);
                const b = Math.round(105 + (53 - 105) * mix);
                
                ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 0.9)`;
                ctx.shadowColor = `rgba(${r}, ${g}, ${b}, 0.6)`;
                ctx.shadowBlur = 10;
                ctx.fill();
            }

            ctx.restore();

            animationFrameId = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <motion.canvas
            ref={canvasRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 4, delay: 0.2, ease: 'easeInOut' }}
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 1, // Behind the heroContent
                pointerEvents: 'none',
            }}
        />
    );
};

export default ECGBackground;
