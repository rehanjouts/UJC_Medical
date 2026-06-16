import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Linkedin } from 'lucide-react';
import styles from './Footer.module.css';

interface FooterProps {
    onOpenLegal: (tab: 'impressum' | 'datenschutz') => void;
}

const Footer: React.FC<FooterProps> = ({ onOpenLegal }) => {
    const navigate = useNavigate();
    
    const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault();
        if (window.location.pathname !== '/') {
            navigate('/', { state: { scrollTo: id } });
            return;
        }

        const element = document.getElementById(id);
        if (element) {
            const offset = 90; // offset for navbar
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

    return (
        <footer className={styles.footerContainer}>
            <div className={styles.footerContent}>

                {/* Left: Impressum addresses */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className={styles.footerColumnLarge}
                >
                    <h3 className={styles.heading}>IMPRESSUM</h3>
                    <div className={styles.addressesGrid}>
                        <div className={styles.subSection}>
                            <h4 className={styles.subHeading}>Österreich:</h4>
                            <p className={styles.text}>
                                UJC Unique Job Cooperations<br />
                                Alpen GmbH<br />
                                Lassallestraße 7b, 1020 Wien
                            </p>
                            <p className={styles.text}>
                                <a href="mailto:info@ujc-jobs.com" className={styles.link}>E-Mail: info@ujc-jobs.com</a><br />
                                Firmenbuchnummer: FN 652 648 b<br />
                                UID: ATU82381904<br />
                                Geschäftsführer: Jenno Thanikkal
                            </p>
                        </div>
                        <div className={styles.subSection}>
                            <h4 className={styles.subHeading}>Deutschland:</h4>
                            <p className={styles.text}>
                                UJC Unique Job Cooperations<br />
                                Deutschland GmbH<br />
                                Stefan-Flötzl-Str. 2, 83342 Tacherting
                            </p>
                            <p className={styles.text}>
                                <a href="mailto:info@ujc-jobs.com" className={styles.link}>E-Mail: info@ujc-jobs.com</a><br />
                                Registergericht Traunstein, <br />
                                HRB: 34027 / UID: DE455518259<br />
                                Geschäftsführer: Rafael Doran
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Right: Menu & Socials */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
                    className={styles.footerNavigationSection}
                >
                    <div className={styles.navigationGrid}>
                        {/* Column Headers */}
                        <div className={styles.gridItem}><h3 className={styles.heading}>MENU</h3></div>
                        <div className={`${styles.gridItem} ${styles.desktopOnly}`}><h3 className={styles.heading}>LINKS</h3></div>

                        {/* Startseite & Datenschutzerklärung */}
                        <div className={styles.gridItem}>
                            <a href="#hero" onClick={(e) => handleScrollTo(e, 'hero')} className={styles.link}>Startseite</a>
                        </div>
                        <div className={styles.gridItem}>
                            <div className={`${styles.mobileOnly} ${styles.mobileHeading}`}><h3 className={styles.heading}>LINKS</h3></div>
                            <a 
                                href="#datenschutz" 
                                onClick={(e) => { e.preventDefault(); onOpenLegal('datenschutz'); }} 
                                className={styles.link}
                            >
                                Datenschutzerklärung
                            </a>
                        </div>

                        {/* Focus & Impressum */}
                        <div className={styles.gridItem}>
                            <a href="#intro" onClick={(e) => handleScrollTo(e, 'intro')} className={styles.link}>Fokus</a>
                        </div>
                        <div className={styles.gridItem}>
                            <a 
                                href="#impressum" 
                                onClick={(e) => { e.preventDefault(); onOpenLegal('impressum'); }} 
                                className={styles.link}
                            >
                                Impressum
                            </a>
                        </div>

                        {/* Leistungen & Socials Heading */}
                        <div className={styles.gridItem}>
                            <a href="#services" onClick={(e) => handleScrollTo(e, 'services')} className={styles.link}>Leistungen</a>
                        </div>
                        <div className={styles.gridItem}>
                            <h3 className={`${styles.heading} ${styles.socialHeading} ${styles.mobileHeading}`}>SOCIALS</h3>
                        </div>

                        {/* Unser Team & LinkedIn */}
                        <div className={styles.gridItem}>
                            <a href="/unser-team" onClick={(e) => { e.preventDefault(); navigate('/unser-team'); }} className={styles.link}>Unser Team</a>
                        </div>
                        <div className={styles.gridItem}>
                            <a 
                                href="https://www.linkedin.com/company/unique-job-cooperations/" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className={styles.socialLink}
                            >
                                <Linkedin size={20} />
                                <span>LinkedIn</span>
                            </a>
                        </div>

                        {/* Kontakt & Spacing */}
                        <div className={styles.gridItem}>
                            <a href="/contact" onClick={(e) => { e.preventDefault(); navigate('/contact'); }} className={styles.link}>Kontakt</a>
                        </div>
                        <div className={styles.gridItem}>
                            {/* Empty spacer to align grid */}
                        </div>
                    </div>
                </motion.div>

            </div>

            <div className={styles.footerBottom}>
                <p className={styles.copyright}>
                    &copy; {new Date().getFullYear()} Unique Job Cooperations. Alle Rechte vorbehalten.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
