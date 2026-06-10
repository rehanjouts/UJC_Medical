import { useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import LegalModal from '../components/LegalModal';
import ContactForm from '../components/ContactForm';
import PremiumDNABackground from '../components/PremiumDNABackground';
import styles from './ContactPage.module.css';

function ContactPage() {
    const [legalOpen, setLegalOpen] = useState(false);
    const [legalTab, setLegalTab] = useState<'impressum' | 'datenschutz'>('impressum');

    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const handleOpenLegal = (tab: 'impressum' | 'datenschutz') => {
        setLegalTab(tab);
        setLegalOpen(true);
    };

    return (
        <div className="app-container">
            <PremiumDNABackground />

            {/* Top Progress bar */}
            <motion.div className={styles.progressBar} style={{ scaleX }} />

            {/* Navbar */}
            <Navbar isLoaded={true} onOpenLegal={handleOpenLegal} />

            {/* Contact Page Content */}
            <section id="contact" className={styles.contactSection}>
                <div className={styles.contactContainer}>
                    <motion.div
                        className={styles.contactHeader}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                    >
                        <h1 className={styles.contactHeadline}>Kontakt aufnehmen</h1>
                        <p className={styles.contactSubline}>
                            Lassen Sie uns über Ihren Personalbedarf sprechen und gemeinsam die passende Lösung für Ihre Einrichtung entwickeln.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
                    >
                        <ContactForm />
                    </motion.div>
                </div>
            </section>

            {/* Footer */}
            <Footer onOpenLegal={handleOpenLegal} />

            {/* Impressum & Datenschutz Modal */}
            <LegalModal
                isOpen={legalOpen}
                onClose={() => setLegalOpen(false)}
                initialTab={legalTab}
            />

            {/* Background Radial Glow */}
            <div className="radial-glow"></div>
        </div>
    );
}

export default ContactPage;
