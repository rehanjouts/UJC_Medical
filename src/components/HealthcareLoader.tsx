import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './HealthcareLoader.module.css';

interface HealthcareLoaderProps {
    onComplete: () => void;
}

const HealthcareLoader: React.FC<HealthcareLoaderProps> = ({ onComplete }) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        // Set a timer to trigger the fade out animation
        const timer = setTimeout(() => {
            setIsVisible(false);
            // Give time for the exit animation to finish before calling onComplete
            setTimeout(onComplete, 800);
        }, 2200);

        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className={styles.loaderContainer}
                    initial={{ opacity: 1 }}
                    exit={{
                        opacity: 0,
                        transition: { duration: 0.8, ease: [0.33, 1, 0.68, 1] }
                    }}
                >
                    <div className={styles.backgroundGlow} />

                    <div className={styles.content}>
                        {/* MEDICAL ANIMATION CONTAINER */}
                        <div className={styles.animationWrapper}>
                            {/* Stethoscope & Heartbeat Pulse SVG */}
                            <svg className={styles.medicalSvg} viewBox="0 0 200 200">
                                <defs>
                                    <linearGradient id="gold-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="#FFF5E6" />
                                        <stop offset="50%" stopColor="#E99235" />
                                        <stop offset="100%" stopColor="#B36B19" />
                                    </linearGradient>
                                    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                                        <feGaussianBlur stdDeviation="4" result="blur" />
                                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                                    </filter>
                                </defs>

                                {/* Background Pulsing Heart (Empathy & Medicine) */}
                                <motion.path
                                    d="M 100,75 C 100,55 75,35 55,55 C 35,75 75,115 100,135 C 125,115 165,75 145,55 C 125,35 100,55 100,75 Z"
                                    fill="rgba(233, 146, 53, 0.04)"
                                    stroke="rgba(233, 146, 53, 0.15)"
                                    strokeWidth="1.5"
                                    animate={{
                                        scale: [1, 1.08, 1, 1.12, 1],
                                        opacity: [0.6, 0.9, 0.6, 1, 0.6]
                                    }}
                                    transition={{
                                        duration: 1.5,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                    style={{ transformOrigin: '100px 95px' }}
                                />

                                {/* ECG Line (Heartbeat) drawing across */}
                                <motion.path
                                    d="M 10,95 L 60,95 L 70,80 L 80,120 L 90,50 L 100,140 L 110,95 L 120,105 L 130,95 L 190,95"
                                    fill="none"
                                    stroke="url(#gold-grad)"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    filter="url(#glow)"
                                    initial={{ pathLength: 0, opacity: 0.2 }}
                                    animate={{
                                        pathLength: [0, 1, 1],
                                        opacity: [1, 1, 0],
                                        pathOffset: [0, 0, 1]
                                    }}
                                    transition={{
                                        duration: 2.2,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                        times: [0, 0.8, 1]
                                    }}
                                />

                                {/* Stethoscope Line Drawing */}
                                <motion.path
                                    d="M 60,40 C 60,25 75,15 100,15 C 125,15 140,25 140,40 M 60,40 C 60,55 70,75 90,85 L 90,110 C 90,125 110,125 110,110 L 110,85 C 130,75 140,55 140,40 M 100,15 L 100,5 M 60,40 L 55,40 M 140,40 L 145,40"
                                    fill="none"
                                    stroke="rgba(255, 255, 255, 0.7)"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    filter="url(#glow)"
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{
                                        duration: 1.6,
                                        ease: "easeOut"
                                    }}
                                />
                            </svg>
                            {/* Glowing Pulse Dot that follows the ECG heartbeat path */}
                            <div className={styles.pulseSparkle} />
                        </div>

                        {/* TEXT CONTAINER */}
                        <div className={styles.textWrapper}>
                            <motion.h2
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                                className={styles.loaderTitle}
                            >
                                UJC HEALTHCARE
                            </motion.h2>
                            <motion.p
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.5 }}
                                className={styles.loaderSubtitle}
                            >
                                Medizin & Pflege Karriereportal wird geladen...
                            </motion.p>

                            {/* Loading Progress Bar */}
                            <div className={styles.progressBarBg}>
                                <motion.div
                                    className={styles.progressBar}
                                    initial={{ width: 0 }}
                                    animate={{ width: '100%' }}
                                    transition={{ duration: 1.8, ease: "easeInOut" }}
                                />
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default HealthcareLoader;
