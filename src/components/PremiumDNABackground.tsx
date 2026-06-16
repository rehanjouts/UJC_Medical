import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const PremiumDNABackground: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { scrollY } = useScroll();
    
    // Fade in after scrolling past the hero section (approx 600px)
    const opacity = useTransform(scrollY, [0, 400, 800], [0, 0, 1]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;

        // Premium abstract DNA structures
        const dnas = [
            { x: 0.85, y: 0.5, scale: 0.6, speedY: -0.1, phase: 0 }
        ];

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', resize);
        resize();

        const draw = () => {
            if (!ctx || !canvas) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            dnas.forEach(dna => {
                dna.y += dna.speedY / canvas.height; 
                dna.phase += 0.005; 
                
                if (dna.y < -0.3) dna.y = 1.3;
                
                const absX = dna.x * canvas.width;
                const absY = dna.y * canvas.height;
                
                ctx.save();
                ctx.translate(absX, absY);
                ctx.rotate(-Math.PI / 16); 
                ctx.scale(dna.scale, dna.scale);

                const height = 400;
                const width = 35;
                const steps = 60; 

                // Rungs
                ctx.beginPath();
                for(let i=0; i<=steps; i++) {
                    const stepY = -height/2 + (height/steps) * i;
                    const angle = (i / steps) * Math.PI * 5 + dna.phase; 
                    const xPos = Math.sin(angle) * width;
                    const xPos2 = Math.sin(angle + Math.PI) * width;
                    
                    if (Math.cos(angle) > -0.2) { 
                        ctx.moveTo(xPos, stepY);
                        ctx.lineTo(xPos2, stepY);
                    }
                }
                ctx.strokeStyle = 'rgba(2, 46, 105, 0.05)'; 
                ctx.lineWidth = 1;
                ctx.stroke();

                // Orange Strand
                ctx.beginPath();
                for(let i=0; i<=steps; i++) {
                    const stepY = -height/2 + (height/steps) * i;
                    const angle = (i / steps) * Math.PI * 5 + dna.phase;
                    const xPos = Math.sin(angle) * width;
                    if (i===0) ctx.moveTo(xPos, stepY);
                    else ctx.lineTo(xPos, stepY);
                }
                ctx.strokeStyle = 'rgba(233, 146, 53, 0.08)'; 
                ctx.lineWidth = 2;
                ctx.lineJoin = 'round';
                ctx.stroke();

                // Blue Strand
                ctx.beginPath();
                for(let i=0; i<=steps; i++) {
                    const stepY = -height/2 + (height/steps) * i;
                    const angle = (i / steps) * Math.PI * 5 + dna.phase + Math.PI;
                    const xPos = Math.sin(angle) * width;
                    if (i===0) ctx.moveTo(xPos, stepY);
                    else ctx.lineTo(xPos, stepY);
                }
                ctx.strokeStyle = 'rgba(2, 46, 105, 0.1)'; 
                ctx.lineWidth = 2.5;
                ctx.lineJoin = 'round';
                ctx.stroke();

                ctx.restore();
            });

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
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 10, // Renders on top of solid backgrounds
                pointerEvents: 'none',
                opacity // Animated opacity based on scroll
            }}
        />
    );
};

export default PremiumDNABackground;
