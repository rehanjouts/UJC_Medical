import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './MediaCarousel.module.css';

export interface MediaItem {
    id: string;
    title: string;
    description: string;
}

interface MediaCarouselProps {
    type: 'shorts' | 'reels';
    title: string;
    items: MediaItem[];
}

const MediaCarousel: React.FC<MediaCarouselProps> = ({ type, title, items }) => {
    const [activeSlide, setActiveSlide] = useState(0);
    const [direction, setDirection] = useState(0); // 1 = next, -1 = prev
    const [playingId, setPlayingId] = useState<string | null>(null);
    const [activeModalReelId, setActiveModalReelId] = useState<string | null>(null);

    // Group items into pairs of 2
    const chunkedItems: MediaItem[][] = [];
    for (let i = 0; i < items.length; i += 2) {
        chunkedItems.push(items.slice(i, i + 2));
    }

    const totalSlides = chunkedItems.length;

    const handleNext = () => {
        setPlayingId(null); // Stop any playing video on slide change
        setDirection(1);
        setActiveSlide((prev) => (prev + 1) % totalSlides);
    };

    const handlePrev = () => {
        setPlayingId(null);
        setDirection(-1);
        setActiveSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    };

    const handleDotClick = (index: number) => {
        if (index === activeSlide) return;
        setPlayingId(null);
        setDirection(index > activeSlide ? 1 : -1);
        setActiveSlide(index);
    };

    const handleDragEnd = (_: any, info: any) => {
        const threshold = 50; // swipe threshold in pixels
        if (info.offset.x < -threshold) {
            handleNext();
        } else if (info.offset.x > threshold) {
            handlePrev();
        }
    };

    const slideVariants = {
        enter: (dir: number) => ({
            x: dir > 0 ? '100%' : '-100%',
            opacity: 0,
        }),
        center: {
            x: 0,
            opacity: 1,
            transition: {
                x: { type: 'spring' as const, stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
            },
        },
        exit: (dir: number) => ({
            x: dir < 0 ? '100%' : '-100%',
            opacity: 0,
            transition: {
                x: { type: 'spring' as const, stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
            },
        }),
    };

    const currentPair = chunkedItems[activeSlide] || [];

    return (
        <div className={styles.carouselWrapper}>
            <div className={styles.carouselHeader}>
                <h3 className={styles.carouselTitle}>{title}</h3>
                <div className={styles.navButtons}>
                    <button className={styles.navBtn} onClick={handlePrev} aria-label="Previous slide">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M15 18l-6-6 6-6" />
                        </svg>
                    </button>
                    <button className={styles.navBtn} onClick={handleNext} aria-label="Next slide">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M9 18l6-6-6-6" />
                        </svg>
                    </button>
                </div>
            </div>

            <div className={styles.trackContainer}>
                <AnimatePresence initial={false} custom={direction} mode="wait">
                    <motion.div
                        key={activeSlide}
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={0.2}
                        onDragEnd={handleDragEnd}
                        className={styles.cardsStack}
                    >
                        {currentPair.map((item) => {
                            const isPlaying = playingId === item.id;
                            
                            if (type === 'shorts') {
                                return (
                                    <div key={item.id} className={styles.videoCard}>
                                        {isPlaying ? (
                                            <div className={styles.embedContainer}>
                                                <iframe
                                                    src={`https://www.youtube.com/embed/${item.id}?autoplay=1&rel=0`}
                                                    title={item.title}
                                                    frameBorder="0"
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                    allowFullScreen
                                                    className={styles.iframe}
                                                ></iframe>
                                                <button 
                                                    className={styles.closeVideoBtn} 
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setPlayingId(null);
                                                    }}
                                                    aria-label="Close video"
                                                >
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                                        <line x1="18" y1="6" x2="6" y2="18"></line>
                                                        <line x1="6" y1="6" x2="18" y2="18"></line>
                                                    </svg>
                                                </button>
                                            </div>
                                        ) : (
                                            <div 
                                                className={styles.thumbnailPlaceholder}
                                                style={{
                                                    backgroundImage: `linear-gradient(rgba(2, 46, 105, 0.4), rgba(2, 46, 105, 0.7)), url(https://img.youtube.com/vi/${item.id}/hqdefault.jpg)`,
                                                    backgroundSize: 'cover',
                                                    backgroundPosition: 'center'
                                                }}
                                                onClick={() => setPlayingId(item.id)}
                                            >
                                                <div className={styles.playButtonContainer}>
                                                    <div className={styles.playButton}>
                                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                                            <polygon points="5 3 19 12 5 21 5 3" />
                                                        </svg>
                                                    </div>
                                                    <span className={styles.playText}>Video ansehen</span>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                );
                            } else {
                                return (
                                    <div key={item.id} className={styles.videoCard}>
                                        <div className={styles.embedContainer}>
                                            <iframe
                                                src={`https://www.instagram.com/reel/${item.id}/embed`}
                                                title={item.title}
                                                frameBorder="0"
                                                allowTransparency={true}
                                                scrolling="no"
                                                className={styles.iframe}
                                            ></iframe>
                                            
                                            <div 
                                                className={styles.iframeOverlay}
                                                onClick={() => setActiveModalReelId(item.id)}
                                            >
                                                <div className={styles.playButtonContainer}>
                                                    <div className={styles.playButton}>
                                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                                            <polygon points="5 3 19 12 5 21 5 3" />
                                                        </svg>
                                                    </div>
                                                    <span className={styles.playText}>Video ansehen</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            }
                        })}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Slide Indicators */}
            <div className={styles.indicators}>
                {Array.from({ length: totalSlides }).map((_, idx) => (
                    <button
                        key={idx}
                        className={`${styles.indicatorDot} ${idx === activeSlide ? styles.activeDot : ''}`}
                        onClick={() => handleDotClick(idx)}
                        aria-label={`Go to slide ${idx + 1}`}
                    />
                ))}
            </div>

            {/* Instagram Reel Full-View Modal */}
            <AnimatePresence>
                {activeModalReelId && (
                    <motion.div 
                        className={styles.modalBackdrop}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setActiveModalReelId(null)}
                    >
                        <motion.div 
                            className={styles.modalContent}
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button 
                                className={styles.modalCloseBtn}
                                onClick={() => setActiveModalReelId(null)}
                                aria-label="Close modal"
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </button>
                            <div className={styles.modalIframeContainer}>
                                <iframe
                                    src={`https://www.instagram.com/reel/${activeModalReelId}/embed`}
                                    title="Instagram Reel Full View"
                                    frameBorder="0"
                                    allowTransparency={true}
                                    scrolling="no"
                                    className={styles.modalIframe}
                                ></iframe>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default MediaCarousel;
