import React, { useEffect, useRef } from 'react';

interface HealthcareBackgroundProps {
    explodeOnMount?: boolean;
}

let hasExplodedGlobal = false;

const HealthcareBackground: React.FC<HealthcareBackgroundProps> = ({ explodeOnMount = false }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let particles: Particle[] = [];

        const shouldExplode = explodeOnMount && !hasExplodedGlobal;
        let explosionMultiplier = shouldExplode ? 15 : 1;
        const explosionDecay = 0.975;

        if (shouldExplode) {
            hasExplodedGlobal = true;
        }

        const colors = [
            'rgba(233, 146, 53, 0.4)', // Orange
            'rgba(2, 46, 105, 0.4)',   // Blue
            'rgba(255, 255, 255, 0.4)' // White
        ];

        class Particle {
            x: number;
            y: number;
            vx: number;
            vy: number;
            size: number;
            color: string;
            rotation: number;
            rotationSpeed: number;

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
                    this.vx = (Math.random() - 0.5) * 0.3;
                    this.vy = (Math.random() - 0.5) * 0.3;
                }

                this.size = Math.random() * 8 + 6;
                this.color = colors[Math.floor(Math.random() * colors.length)];
                this.rotation = Math.random() * Math.PI;
                this.rotationSpeed = (Math.random() - 0.5) * 0.02;
            }

            update(multiplier: number) {
                const currentSpeed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
                const targetFloatingSpeed = 0.3;

                if (multiplier < 5 && currentSpeed > targetFloatingSpeed) {
                    this.vx *= 0.99;
                    this.vy *= 0.99;
                }

                this.x += this.vx * multiplier;
                this.y += this.vy * multiplier;
                this.rotation += this.rotationSpeed * multiplier;

                if (this.x < -20) this.x = canvas!.width + 20;
                if (this.x > canvas!.width + 20) this.x = -20;
                if (this.y < -20) this.y = canvas!.height + 20;
                if (this.y > canvas!.height + 20) this.y = -20;
            }

            draw() {
                if (!ctx) return;
                ctx.save();
                ctx.translate(this.x, this.y);
                ctx.rotate(this.rotation);

                ctx.fillStyle = this.color;
                ctx.beginPath();
                // Draw a medical cross
                const s = this.size;
                const t = this.size / 3;
                ctx.rect(-s / 2, -t / 2, s, t);
                ctx.rect(-t / 2, -s / 2, t, s);
                ctx.fill();

                ctx.restore();
            }
        }

        let lastWidth = window.innerWidth;

        const init = (forceExplode: boolean = false) => {
            const isMobile = window.innerWidth < 768;
            const count = isMobile ? 15 : 35;
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

            particles.forEach(p => {
                p.update(explosionMultiplier);
                p.draw();
            });

            if (explosionMultiplier > 1) {
                explosionMultiplier *= explosionDecay;
                if (explosionMultiplier < 1) explosionMultiplier = 1;
            }

            animationFrameId = requestAnimationFrame(animate);
        };

        const handleResize = () => resize(false);
        window.addEventListener('resize', handleResize);

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
                opacity: 0.6
            }}
        />
    );
};

export default HealthcareBackground;
