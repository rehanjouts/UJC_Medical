import React, { useEffect, useRef } from 'react';

interface NetworkBackgroundProps {
    explodeOnMount?: boolean;
}

// Global flag to track if we've ever exploded in this session
let hasExplodedGlobal = false;

const NetworkBackground: React.FC<NetworkBackgroundProps> = ({ explodeOnMount = false }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let particles: Particle[] = [];
        const connectionDistance = 220;

        // Determine if we should explode right now
        const shouldExplode = explodeOnMount && !hasExplodedGlobal;
        
        let explosionMultiplier = shouldExplode ? 15 : 1;
        const explosionDecay = 0.975; 

        if (shouldExplode) {
            hasExplodedGlobal = true;
        }

        const colors = [
            'rgba(233, 146, 53, 0.7)', // Orange
            'rgba(2, 46, 105, 0.7)'    // Blue
        ];

        class Particle {
            x: number;
            y: number;
            vx: number;
            vy: number;
            size: number;
            color: string;

            constructor(isExploding: boolean) {
                const centerX = canvas!.width / 2;
                const centerY = canvas!.height / 2;

                if (isExploding) {
                    this.x = centerX + (Math.random() - 0.5) * 20;
                    this.y = centerY + (Math.random() - 0.5) * 20;
                    const angle = Math.random() * Math.PI * 2;
                    const speed = Math.random() * 2 + 1;
                    this.vx = Math.cos(angle) * speed;
                    this.vy = Math.sin(angle) * speed;
                } else {
                    this.x = Math.random() * canvas!.width;
                    this.y = Math.random() * canvas!.height;
                    this.vx = (Math.random() - 0.5) * 0.15;
                    this.vy = (Math.random() - 0.5) * 0.15;
                }

                this.size = Math.random() * 2.5 + 1.5;
                this.color = colors[Math.floor(Math.random() * colors.length)];
            }

            update(multiplier: number) {
                const currentSpeed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
                const targetFloatingSpeed = 0.15;
                
                if (multiplier < 5 && currentSpeed > targetFloatingSpeed) {
                    this.vx *= 0.99;
                    this.vy *= 0.99;
                }

                this.x += this.vx * multiplier;
                this.y += this.vy * multiplier;

                if (this.x < 0 || this.x > canvas!.width) this.vx *= -1;
                if (this.y < 0 || this.y > canvas!.height) this.vy *= -1;
            }

            draw() {
                if (!ctx) return;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.fill();
            }
        }

        let lastWidth = window.innerWidth;

        const init = (forceExplode: boolean = false) => {
            const isMobile = window.innerWidth < 768;
            const count = isMobile ? 18 : 45;
            particles = [];
            for (let i = 0; i < count; i++) {
                particles.push(new Particle(forceExplode));
            }
        };

        const resize = (forceInit: boolean = false) => {
            if (!canvas) return;
            const currentWidth = window.innerWidth;
            const currentHeight = window.innerHeight;
            const widthChanged = Math.abs(currentWidth - lastWidth) > 50;
            
            canvas.width = currentWidth;
            canvas.height = currentHeight;
            
            if (forceInit || widthChanged || particles.length === 0) {
                lastWidth = currentWidth;
                init(forceInit);
            }
        };

        const animate = () => {
            if (!ctx || !canvas) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            if (explodeOnMount && explosionMultiplier > 1.1) {
                ctx.globalAlpha = Math.min(1, (15 - explosionMultiplier) / 5);
            } else {
                ctx.globalAlpha = 1;
            }

            particles.forEach((p, i) => {
                p.update(explosionMultiplier);
                p.draw();

                if (explosionMultiplier < 8) {
                    const isMobile = window.innerWidth < 768;
                    const maxDist = isMobile ? 120 : connectionDistance;

                    for (let j = i + 1; j < particles.length; j++) {
                        const p2 = particles[j];
                        const dx = p.x - p2.x;
                        const dy = p.y - p2.y;
                        const dist = Math.sqrt(dx * dx + dy * dy);

                        if (dist < maxDist) {
                            ctx.beginPath();
                            ctx.moveTo(p.x, p.y);
                            ctx.lineTo(p2.x, p2.y);
                            const fade = 1 - dist / maxDist;
                            const opacityFactor = explosionMultiplier > 1 ? (1 / explosionMultiplier) : 1;
                            const lineColor = p.color.replace('0.7', (fade * 0.4 * opacityFactor).toString());
                            ctx.strokeStyle = lineColor;
                            ctx.lineWidth = 1.2;
                            ctx.stroke();
                        }
                    }
                }
            });

            if (explosionMultiplier > 1) {
                explosionMultiplier *= explosionDecay;
                if (explosionMultiplier < 1) explosionMultiplier = 1;
            }

            animationFrameId = requestAnimationFrame(animate);
        };

        const handleResize = () => resize(false);
        window.addEventListener('resize', handleResize);
        
        // Final sequence: size -> init (with explode flag) -> animate
        resize(shouldExplode);
        animate();

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, [explodeOnMount]);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 0,
                pointerEvents: 'none',
                opacity: 0.8
            }}
        />
    );
};

export default NetworkBackground;
