import React, { useEffect, useRef } from 'react';
import './Particles.css';

export default function Particles() {
    const canvasRef = useRef(null);
    const animationRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let w = (canvas.width = window.innerWidth);
        let h = (canvas.height = window.innerHeight);

        const pixelRatio = Math.max(1, window.devicePixelRatio || 1);
        canvas.width = w * pixelRatio;
        canvas.height = h * pixelRatio;
        canvas.style.width = w + 'px';
        canvas.style.height = h + 'px';
        ctx.scale(pixelRatio, pixelRatio);

        const config = {
            particleCount: Math.floor((w * h) / 35000) + 45, // more particles
            maxSpeed: 0.7,
            linkDistance: 160,
            radius: 2.6,
            mouseRadius: 140,
        };

        let particles = [];
        const mouse = { x: -9999, y: -9999 };

        function initParticles() {
            particles = [];
            for (let i = 0; i < config.particleCount; i++) {
                particles.push({
                    x: Math.random() * w,
                    y: Math.random() * h,
                    vx: (Math.random() - 0.5) * config.maxSpeed,
                    vy: (Math.random() - 0.5) * config.maxSpeed,
                });
            }
        }

        function resize() {
            w = canvas.width = window.innerWidth * pixelRatio;
            h = canvas.height = window.innerHeight * pixelRatio;
            canvas.style.width = window.innerWidth + 'px';
            canvas.style.height = window.innerHeight + 'px';
            ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
            // adjust particle count a bit on resize
            config.particleCount = Math.floor((window.innerWidth * window.innerHeight) / 65000) + 25;
            initParticles();
        }

        function step() {
            ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

            // move particles
            for (let p of particles) {
                p.x += p.vx;
                p.y += p.vy;

                // bounce
                if (p.x <= 0 || p.x >= window.innerWidth) p.vx *= -1;
                if (p.y <= 0 || p.y >= window.innerHeight) p.vy *= -1;
            }

            // draw links and particles
            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];
                // draw particle with color variety
                ctx.beginPath();
                const colorList = [
                    'rgba(255,255,255,0.85)',
                    'rgba(107,91,255,0.85)',
                    'rgba(255,107,0,0.85)',
                    'rgba(255,255,255,0.55)'
                ];
                ctx.fillStyle = colorList[i % colorList.length];
                ctx.arc(p.x, p.y, config.radius, 0, Math.PI * 2);
                ctx.shadowColor = colorList[i % colorList.length];
                ctx.shadowBlur = 8;
                ctx.fill();
                ctx.shadowBlur = 0;

                for (let j = i + 1; j < particles.length; j++) {
                    const q = particles[j];
                    const dx = p.x - q.x;
                    const dy = p.y - q.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < config.linkDistance) {
                        const alpha = 0.22 * (1 - dist / config.linkDistance);
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(150,130,255,${alpha})`;
                        ctx.lineWidth = 1.2;
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(q.x, q.y);
                        ctx.stroke();
                    }
                }

                // mouse interaction - simple repel
                const mx = mouse.x;
                const my = mouse.y;
                const mdx = p.x - mx;
                const mdy = p.y - my;
                const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
                if (mdist < config.mouseRadius) {
                    const force = (config.mouseRadius - mdist) / config.mouseRadius;
                    p.vx += (mdx / mdist) * 0.6 * force;
                    p.vy += (mdy / mdist) * 0.6 * force;
                }
            }

            animationRef.current = requestAnimationFrame(step);
        }

        function onMove(e) {
            const rect = canvas.getBoundingClientRect();
            mouse.x = (e.clientX - rect.left);
            mouse.y = (e.clientY - rect.top);
        }

        function onLeave() {
            mouse.x = -9999;
            mouse.y = -9999;
        }

        initParticles();
        step();

        window.addEventListener('resize', resize);
        window.addEventListener('mousemove', onMove);
        window.addEventListener('mouseleave', onLeave);

        return () => {
            cancelAnimationFrame(animationRef.current);
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', onMove);
            window.removeEventListener('mouseleave', onLeave);
        };
    }, []);

    return <canvas ref={canvasRef} className="particle-canvas" aria-hidden />;
}
