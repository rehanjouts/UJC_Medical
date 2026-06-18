import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import LegalModal from '../components/LegalModal';
import NetworkBackground from '../components/NetworkBackground';
import styles from './TeamPage.module.css';

interface TeamMember {
    name: string;
    position: string;
    photo: string;
}

const europeTeam: TeamMember[] = [
    { name: 'Jenno Thanikkal', position: 'CEO, Austria', photo: '/Team photos/Team europe/jenno.png' },
    { name: 'Rafael Doran', position: 'CEO, Germany', photo: '/Team photos/Team europe/rafael.png' },
    { name: 'Markus Kraetschmer', position: 'Managing Partner', photo: '/Team photos/Team europe/markus.png' },
    { name: 'Marc Hildebrand', position: 'Senior Advisor', photo: '/Team photos/Team europe/marc.png' },
    { name: 'Heiko F. Lorenz', position: 'Senior Advisor', photo: '/Team photos/Team europe/heiko.png' },
    { name: 'Thomas Wandler', position: 'Senior Advisor', photo: '/Team photos/Team europe/thomas.png' },
    { name: 'Zinka Turulja', position: 'Onboarding Specialist', photo: '/Team photos/Team europe/zinka.png' },
    { name: 'Leon Raupach', position: 'HR Consultant', photo: '/Team photos/Team europe/leon.png' },
    { name: 'Donya Al Kadimi', position: 'HR Consultant', photo: '/Team photos/Team europe/donya.png' },
    { name: 'Helena Stanek-Neuwirth', position: 'Native Teacher', photo: '/Team photos/Team europe/Helena.jpeg' },
    { name: 'Maria Brony', position: 'Marketing Head', photo: '/Team photos/Team europe/maria.png' },
    { name: 'Rehan Jo Justus', position: 'IT Specialist', photo: '/Team photos/Team europe/rehan.png' }
];

const indiaTeam: TeamMember[] = [
    { name: 'Jacob K. B.', position: 'Head of Operations', photo: '/Team photos/Team India/Jacob.png' },
    { name: 'Jaismol Johny', position: 'General Manager', photo: '/Team photos/Team India/Jaismol.png' },
    { name: 'Jini Mary Varkey', position: 'Recruitment Coordinator', photo: '/Team photos/Team India/Jini.png' },
    { name: 'Jibi Sijo', position: 'Recruitment Coordinator', photo: '/Team photos/Team India/Jibi.png' },
    { name: 'Thara P', position: 'Recruitment Coordinator', photo: '/Team photos/Team India/Thara.png' },
    { name: 'Stephy Augustin', position: 'Recruitment Coordinator', photo: '/Team photos/Team India/Stephy.png' },
    { name: 'Goodwin Joy', position: 'Marketing Manager', photo: '/Team photos/Team India/Goodwin.png' },
    { name: 'Neenu Anson', position: 'German Teacher', photo: '/Team photos/Team India/Neenu.png' },
    { name: 'Akhila Manoj', position: 'German Teacher', photo: '/Team photos/Team India/Akhila.png' },
    { name: 'Jyothi Lakshmi S', position: 'German Teacher', photo: '/Team photos/Team India/Jyothi.png' }
];

const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.3
        }
    }
} as const;

const itemVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 30 },
    show: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" as const }
    }
} as const;

function TeamPage() {
    const [legalOpen, setLegalOpen] = useState(false);
    const [legalTab, setLegalTab] = useState<'impressum' | 'datenschutz'>('impressum');

    const handleOpenLegal = (tab: 'impressum' | 'datenschutz') => {
        setLegalTab(tab);
        setLegalOpen(true);
    };

    useEffect(() => {
        // Set SEO Title and Description
        document.title = 'UJC Healthcare | Unser Team';
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
            metaDesc.setAttribute(
                'content',
                'Lernen Sie unser internationales Team kennen. Die Experten von UJC Healthcare in Europa und Indien unterstützen Sie kompetent bei der Personalvermittlung und Onboarding.'
            );
        }
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className={`app-container ${styles.teamPageContainer}`}>
            <NetworkBackground explodeOnMount={true} />
            <div className={styles.glowBg}></div>

            {/* Navbar */}
            <Navbar isLoaded={true} onOpenLegal={handleOpenLegal} />

            {/* Header Section */}
            <section className={styles.heroSection}>
                <div className={styles.headerContainer}>
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className={styles.headerContent}
                    >
                        <span className={styles.badge}>UJC Team</span>
                        <h1 className={styles.pageTitle}>Unser Team</h1>
                        <p className={styles.pageSubtitle}>
                            Erfahrene Experten in Europa und Indien arbeiten Hand in Hand, um erstklassige Verbindungen im Gesundheitswesen zu schaffen und Fachkräfte nachhaltig zu integrieren.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Team Europe Section */}
            <section className={styles.teamSection}>
                <div className={styles.sectionContainer}>
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6 }}
                        className={styles.sectionHeader}
                    >
                        <h2 className={styles.sectionTitle}>Team Europe</h2>
                        <div className={styles.titleDivider} />
                    </motion.div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-100px" }}
                        className={styles.teamGrid}
                    >
                        {europeTeam.map((member, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                className={styles.memberCard}
                            >
                                <div className={styles.photoPlaceholder}>
                                    {member.photo ? (
                                        <img
                                            src={member.photo}
                                            alt={`Profilbild von ${member.name}`}
                                            className={styles.memberPhoto}
                                            loading="lazy"
                                        />
                                    ) : (
                                        <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                            <circle cx="12" cy="7" r="4"></circle>
                                        </svg>
                                    )}
                                </div>
                                <h3 className={styles.name}>{member.name}</h3>
                                <p className={styles.role}>{member.position}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Team India Section */}
            <section className={styles.teamSection}>
                <div className={styles.sectionContainer}>
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6 }}
                        className={styles.sectionHeader}
                    >
                        <h2 className={styles.sectionTitle}>Team India</h2>
                        <div className={styles.titleDivider} />
                    </motion.div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-100px" }}
                        className={styles.teamGrid}
                    >
                        {indiaTeam.map((member, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                className={styles.memberCard}
                            >
                                <div className={styles.photoPlaceholder}>
                                    {member.photo ? (
                                        <img
                                            src={member.photo}
                                            alt={`Profilbild von ${member.name}`}
                                            className={styles.memberPhoto}
                                            loading="lazy"
                                        />
                                    ) : (
                                        <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                            <circle cx="12" cy="7" r="4"></circle>
                                        </svg>
                                    )}
                                </div>
                                <h3 className={styles.name}>{member.name}</h3>
                                <p className={styles.role}>{member.position}</p>
                            </motion.div>
                        ))}
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
        </div>
    );
}

export default TeamPage;
