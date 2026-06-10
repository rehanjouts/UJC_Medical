import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './HumanConnectionJourney.module.css';

const HumanConnectionJourney: React.FC = () => {
    const [step, setStep] = useState(0); // 0: hand, 1: heart, 2: stethoscope, 3: cross, 4: people

    useEffect(() => {
        // Set a timer to trigger the next step in the loop
        // 1.5s draw animation + 1.2s rest time = 2.7s total active time
        const timer = setTimeout(() => {
            setStep((prev) => (prev + 1) % 5);
        }, 2700);

        return () => clearTimeout(timer);
    }, [step]);

    // SVG paths normalized to a 100x100 viewport
    const paths = {
        // Hand path: continuous single-line tracing fingers and wrist
        hand: "M 35,75 C 33,70 33,62 33,55 C 33,50 35,48 37,48 C 39,48 40,50 40,55 L 40,38 C 40,33 42,31 44,31 C 46,31 47,33 47,38 L 47,33 C 47,28 49,26 51,26 C 53,26 54,28 54,33 L 54,36 C 54,31 56,29 58,29 C 60,29 61,31 61,36 L 61,48 C 61,46 63,44 65,44 C 67,44 68,46 68,48 L 68,62 C 68,70 63,75 57,77 C 51,79 43,79 38,77 Z",
        
        // Heart path: perfectly symmetric line-art heart
        heart: "M 50,78 C 45,72 25,53 25,38 C 25,27 34,18 45,18 C 50,18 50,22 50,22 C 50,22 50,18 55,18 C 66,18 75,27 75,38 C 75,53 55,72 50,78 Z",
        
        // Stethoscope path: beautiful single-line clinical stethoscope
        stethoscope: "M 38,22 C 38,32 45,38 50,38 C 55,38 62,32 62,22 M 38,22 A 1.5,1.5 0 1,1 38,19 M 62,22 A 1.5,1.5 0 1,1 62,19 M 50,38 L 50,52 C 50,72 28,78 36,82 C 44,86 68,82 62,64 C 59,58 65,58 65,61 C 65,64 59,64 62,64 Z",
        
        // Medical cross path: clean clinical cross with thin borders
        cross: "M 40,22 L 60,22 C 61,22 62,23 62,24 L 62,38 L 76,38 C 77,38 78,39 78,40 L 78,60 C 78,61 77,62 76,62 L 62,62 L 62,76 C 62,77 61,78 60,78 L 40,78 C 39,78 38,77 38,76 L 38,62 L 24,62 C 23,62 22,61 22,60 L 22,40 C 22,39 23,38 24,38 L 38,38 L 38,24 C 38,23 39,22 40,22 Z",
        
        // People circle path: a protective ring with three connected minimal figures
        people: "M 50,20 A 30,30 0 1,1 50,80 A 30,30 0 1,1 50,20 M 50,34 A 4,4 0 1,0 50,42 A 4,4 0 1,0 50,34 M 40,50 C 43,47 57,47 60,50 M 38,54 A 4,4 0 1,0 38,62 A 4,4 0 1,0 38,54 M 28,70 C 31,67 45,67 48,70 M 62,54 A 4,4 0 1,0 62,62 A 4,4 0 1,0 62,54 M 52,70 C 55,67 69,67 72,70"
    };

    const draw = {
        hidden: { pathLength: 0, opacity: 0 },
        visible: {
            pathLength: 1,
            opacity: 1,
            transition: {
                pathLength: { type: "spring" as const, duration: 1.5, bounce: 0 },
                opacity: { duration: 0.5 }
            }
        },
        exit: {
            pathLength: 0,
            opacity: 0,
            transition: {
                pathLength: { duration: 0.8 },
                opacity: { duration: 0.5 }
            }
        }
    };

    return (
        <div className={styles.journeyContainer}>
            <div className={styles.journeyWrapper}>
                <svg 
                    viewBox="0 0 100 100" 
                    className={styles.journeySvg}
                    fill="none" 
                    strokeWidth="1.2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                >
                    <defs>
                        {/* Flowing linear gradient for light mode */}
                        <motion.linearGradient 
                            id="journeyGradient" 
                            x1="0%" 
                            y1="0%" 
                            x2="100%" 
                            y2="100%"
                            animate={{
                                x1: ["0%", "100%", "0%"],
                                y1: ["0%", "0%", "100%"],
                                x2: ["100%", "0%", "100%"],
                                y2: ["100%", "100%", "0%"]
                            }}
                            transition={{
                                duration: 12,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                        >
                            <stop offset="0%" stopColor="#022E69" />
                            <stop offset="50%" stopColor="#5bc0be" />
                            <stop offset="100%" stopColor="#022E69" />
                        </motion.linearGradient>

                        {/* Flowing linear gradient for dark mode */}
                        <motion.linearGradient 
                            id="journeyGradientDark" 
                            x1="0%" 
                            y1="0%" 
                            x2="100%" 
                            y2="100%"
                            animate={{
                                x1: ["0%", "100%", "0%"],
                                y1: ["0%", "0%", "100%"],
                                x2: ["100%", "0%", "100%"],
                                y2: ["100%", "100%", "0%"]
                            }}
                            transition={{
                                duration: 12,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                        >
                            <stop offset="0%" stopColor="#ffffff" />
                            <stop offset="50%" stopColor="#5bc0be" />
                            <stop offset="100%" stopColor="#ffffff" />
                        </motion.linearGradient>
                    </defs>

                    {/* Faint blueprint circular guidelines & crosshairs for premium detail */}
                    <g className={styles.blueprintGrid}>
                        <circle cx="50" cy="50" r="42" strokeDasharray="2, 6" />
                        <circle cx="50" cy="50" r="32" strokeDasharray="1, 8" />
                        <circle cx="50" cy="50" r="22" strokeDasharray="3, 4" />
                        <line x1="50" y1="5" x2="50" y2="95" strokeDasharray="1, 10" />
                        <line x1="5" y1="50" x2="95" y2="50" strokeDasharray="1, 10" />
                    </g>

                    <AnimatePresence mode="wait">
                        {step === 0 && (
                            <motion.path
                                key="hand"
                                d={paths.hand}
                                variants={draw}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                className={styles.svgPath}
                            />
                        )}
                        {step === 1 && (
                            <motion.path
                                key="heart"
                                d={paths.heart}
                                variants={draw}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                className={styles.svgPath}
                            />
                        )}
                        {step === 2 && (
                            <motion.path
                                key="stethoscope"
                                d={paths.stethoscope}
                                variants={draw}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                className={styles.svgPath}
                            />
                        )}
                        {step === 3 && (
                            <motion.path
                                key="cross"
                                d={paths.cross}
                                variants={draw}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                className={styles.svgPath}
                            />
                        )}
                        {step === 4 && (
                            <motion.path
                                key="people"
                                d={paths.people}
                                variants={draw}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                className={styles.svgPath}
                            />
                        )}
                    </AnimatePresence>
                </svg>
            </div>
        </div>
    );
};

export default HumanConnectionJourney;
