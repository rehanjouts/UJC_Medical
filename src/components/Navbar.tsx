import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import styles from './Navbar.module.css';

interface NavbarProps {
    isLoaded?: boolean;
    onOpenLegal: (tab: 'impressum' | 'datenschutz') => void;
}

const Navbar: React.FC<NavbarProps> = ({ isLoaded, onOpenLegal }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

    const navigateToSection = (sectionId: string) => {
        setIsMobileMenuOpen(false);
        if (location.pathname !== '/') {
            navigate('/', { state: { scrollTo: sectionId } });
            return;
        }

        const element = document.getElementById(sectionId);
        if (element) {
            const offset = 90;
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = element.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault();
        navigateToSection(id);
    };

    return (
        <>
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                    delay: isLoaded ? 0.1 : 2.5,
                    duration: 1.0,
                    ease: [0.22, 1, 0.36, 1] as const
                }}
                className={`${styles.navbar} ${isScrolled ? styles.navbarScrolled : ''} ${isMobileMenuOpen ? styles.navbarOpen : ''}`}
            >
                <div className={styles.navContainer}>
                    {/* Brand Logo */}
                    <a href="#hero" className={styles.logoLink} onClick={(e) => handleScrollTo(e, 'hero')}>
                        <div className={styles.logo}>
                            <img src="/logo.svg" alt="UJC Logo" className={styles.logoImage} />
                        </div>
                    </a>

                    {/* Desktop Navigation */}
                    <div className={styles.menuGroup}>
                        <div className={styles.navLinks}>
                            <a href="#hero" onClick={(e) => handleScrollTo(e, 'hero')}>Start</a>
                            <a href="#social" onClick={(e) => handleScrollTo(e, 'social')}>Insights</a>
                            <a href="#intro" onClick={(e) => handleScrollTo(e, 'intro')}>Fokus</a>
                            <a href="#services" onClick={(e) => handleScrollTo(e, 'services')}>Leistungen</a>
                            <a href="#process" onClick={(e) => handleScrollTo(e, 'process')}>Prozess</a>
                            <a href="/contact" onClick={(e) => { e.preventDefault(); navigate('/contact'); }}>Kontakt</a>
                        </div>

                        <div className={styles.navActions}>
                            <a href="/contact" className={styles.ctaButton} onClick={(e) => { e.preventDefault(); navigate('/contact'); }}>
                                Jetzt Anfragen
                            </a>
                        </div>
                    </div>

                    {/* Mobile Hamburger Trigger */}
                    <button
                        className={styles.hamburger}
                        onClick={toggleMobileMenu}
                        aria-label="Menü öffnen"
                    >
                        {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </motion.nav>

            {/* Mobile Drawer */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className={styles.mobileMenu}
                    >
                        <div className={styles.mobileMenuLinks}>
                            <a href="#hero" onClick={(e) => handleScrollTo(e, 'hero')}>Start</a>
                            <a href="#social" onClick={(e) => handleScrollTo(e, 'social')}>Insights</a>
                            <a href="#intro" onClick={(e) => handleScrollTo(e, 'intro')}>Fokus</a>
                            <a href="#services" onClick={(e) => handleScrollTo(e, 'services')}>Leistungen</a>
                            <a href="#process" onClick={(e) => handleScrollTo(e, 'process')}>Prozess</a>
                            <a href="/contact" onClick={(e) => { e.preventDefault(); setIsMobileMenuOpen(false); navigate('/contact'); }}>Kontakt</a>
                            <a href="#impressum" onClick={(e) => { e.preventDefault(); setIsMobileMenuOpen(false); onOpenLegal('impressum'); }}>Impressum</a>
                            <a href="#datenschutz" onClick={(e) => { e.preventDefault(); setIsMobileMenuOpen(false); onOpenLegal('datenschutz'); }}>Datenschutz</a>
                            
                            <a href="/contact" className={styles.mobileCta} onClick={(e) => { e.preventDefault(); setIsMobileMenuOpen(false); navigate('/contact'); }}>
                                Jetzt Anfragen
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Mobile Drawer Backdrop */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className={styles.backdrop}
                        onClick={toggleMobileMenu}
                    />
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
