import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'framer-motion';
import styles from './App.module.css';

// Layout and Core Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LegalModal from './components/LegalModal';
import HealthcareLoader from './components/HealthcareLoader';

// Backgrounds & Canvas Animations
import PremiumDNABackground from './components/PremiumDNABackground';
import ECGBackground from './components/ECGBackground';
import HealthcareBackground from './components/HealthcareBackground';

// UI components
import PageAnchorNav from './components/PageAnchorNav';
import MediaCarousel from './components/MediaCarousel';
import type { MediaItem } from './components/MediaCarousel';
import HumanConnectionJourney from './components/HumanConnectionJourney';
// ContactForm is now on its own /contact page

// Global styles
import './App.css';

const shortsData: MediaItem[] = [
    {
        id: 'pEh0CPB5oQk',
        title: 'Erfolgsgeschichten',
        description: 'Einblicke in erfolgreiche Vermittlungen bei UJC.'
    },
    {
        id: 'aPQf6R7jQ7E',
        title: 'Karrierewege im Healthcare',
        description: 'Wie Pflegefachkräfte ihre Karriere neu gestalten.'
    },
    {
        id: 'NFAxpqP83jY',
        title: 'Anerkennungsprozess',
        description: 'Unterstützung bei allen behördlichen Schritten.'
    },
    {
        id: 'LnzEJqZLXpM',
        title: 'UJC Recruiting Insights',
        description: 'Warum Kliniken und Talente auf uns vertrauen.'
    }
];

const reelsData: MediaItem[] = [
    {
        id: 'DRhmVUjjC3P',
        title: 'Team-Spirit & Onboarding',
        description: 'Unser Ansatz für ein herzliches und stabiles Ankommen.'
    },
    {
        id: 'DXrLOJAEyjD',
        title: 'Integration vor Ort',
        description: 'Wie wir Fachkräfte in den neuen Kliniken begleiten.'
    },
    {
        id: 'DXRmYy5kx9O',
        title: 'Interkulturelles Coaching',
        description: 'Sprachliche und kulturelle Vorbereitung auf den Job.'
    },
    {
        id: 'DVs45fAky_W',
        title: 'UJC Insights',
        description: 'Hinter den Kulissen des Healthcare Recruitings.'
    }
];

const workflowSteps = [
    { title: "Sprache" },
    { title: "Visa-Prozess" },
    { title: "Anerkennung" },
    { title: "Integration" }
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15
        }
    }
};

const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            type: "spring" as const,
            stiffness: 85,
            damping: 14
        }
    }
};

const arrowVariants = {
    hidden: { opacity: 0, y: -10, scaleY: 0.5 },
    visible: {
        opacity: 1,
        y: 0,
        scaleY: 1,
        transition: {
            duration: 0.5,
            ease: "easeOut" as const
        }
    }
};

function App() {
    const navigate = useNavigate();
    const location = useLocation();
    const [isLoaded, setIsLoaded] = useState(false);
    const [legalOpen, setLegalOpen] = useState(false);
    const [legalTab, setLegalTab] = useState<'impressum' | 'datenschutz'>('impressum');

    const ecgGapRef = useRef<HTMLDivElement>(null);
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

    const handleScrollTo = (id: string) => {
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

    useEffect(() => {
        const scrollTarget = location.state?.scrollTo as string | undefined;
        if (!scrollTarget) return;

        const timeoutId = window.setTimeout(() => {
            handleScrollTo(scrollTarget);
        }, 0);

        return () => window.clearTimeout(timeoutId);
    }, [location.state]);

    return (
        <div className="app-container">
            {/* Loader animation on launch */}
            {!isLoaded && (
                <HealthcareLoader onComplete={() => setIsLoaded(true)} />
            )}

            {isLoaded && (
                <>
                    <PremiumDNABackground />
                    
                    {/* Top Progress bar */}
                    <motion.div className={styles.progressBar} style={{ scaleX }} />

                    {/* Floating Side Anchor Dots */}
                    <PageAnchorNav sections={[
                        { id: 'hero', label: 'Start' },
                        { id: 'social', label: 'Insights' },
                        { id: 'intro', label: 'Fokus' },
                        { id: 'services', label: 'Leistungen' },
                        { id: 'international', label: 'International' },
                        { id: 'process', label: 'Prozess' }
                    ]} />

                    {/* Navbar */}
                    <Navbar isLoaded={isLoaded} onOpenLegal={handleOpenLegal} />

                    {/* SECTION 1 — HERO */}
                    <section id="hero" className={styles.heroSection}>
                        <ECGBackground targetRef={ecgGapRef} />
                        <video
                            className={styles.heroVideo}
                            src="/hero_video.mp4"
                            autoPlay
                            loop
                            muted
                            playsInline
                        />
                        <div className={styles.videoOverlay} />
                        
                        <div className={styles.heroContent}>
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1, ease: "easeOut" }}
                            >
                                <h1 className={styles.heroHeadline}>Medical & Healthcare Jobs</h1>
                                <p className={styles.heroSubheadline}>
                                    Personal für Pflege, Medizin und Gesundheitswesen
                                    <br />
                                    Regional &bull; National &bull; International
                                </p>
                                <div className={styles.heroBody}>
                                    <p>
                                        Wir vermitteln qualifizierte Pflegefachkräfte, medizinisches Personal sowie Ärztinnen und Ärzte und begleiten auf Wunsch den gesamten Prozess bis zum erfolgreichen Start in Ihrer Einrichtung.
                                    </p>
                                    <p>
                                        UJC verbindet Gesundheitseinrichtungen mit passenden Fachkräften und begleitet Arbeitgeber und Bewerber eng, strukturiert und persönlich. So entsteht Recruiting, das nicht nur Stellen besetzt, sondern nachhaltig wirkt.
                                    </p>
                                </div>
                                <div ref={ecgGapRef} className={styles.ecgGap} />
                                <div className={styles.heroActions}>
                                    <button className={styles.primaryBtn} onClick={() => navigate('/contact')}>Jetzt Personal anfragen</button>
                                </div>
                                <div className={styles.trustLine}>
                                    <span>Regional. National. International.</span>
                                    <span className={styles.dot}></span>
                                    <span>Persönlich begleitet. Prozesssicher umgesetzt.</span>
                                </div>
                            </motion.div>
                        </div>
                        <motion.div 
                            className={styles.scrollIndicator}
                            animate={{ y: [0, 10, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            onClick={() => handleScrollTo('social')}
                        >
                            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
                            </svg>
                        </motion.div>
                    </section>

                    {/* SECTION 2 — SOCIAL / REELS / INSIGHTS */}
                    <section id="social" className={styles.socialSection}>
                        <div className={styles.container}>
                            <motion.div 
                                className={styles.sectionHeader}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                            >
                                <h2 className={styles.sectionTitle}>Echte Einblicke statt<br />leere Versprechen</h2>
                                <p className={styles.sectionSubline}>
                                    Unsere Arbeit zeigt sich in realen Prozessen, echten Menschen und konkreten Einblicken.
                                </p>
                            </motion.div>

                            <div className={styles.carouselContainer}>
                                <MediaCarousel 
                                    type="shorts" 
                                    title="YouTube Shorts" 
                                    items={shortsData} 
                                />
                                <MediaCarousel 
                                    type="reels" 
                                    title="Instagram Reels" 
                                    items={reelsData} 
                                />
                            </div>

                            <div className={styles.socialActions}>
                                <button className={styles.secondaryBtn} onClick={() => window.open('https://linkedin.com', '_blank')}>LinkedIn ansehen</button>
                                <button className={styles.secondaryBtn} onClick={() => window.open('https://instagram.com', '_blank')}>Instagram entdecken</button>
                            </div>
                        </div>
                    </section>

                    {/* SECTION 3 — INTRO / PROBLEM-SOLUTION */}
                    <section id="intro" className={styles.introSection}>
                        <div className={styles.container}>
                            <div className={styles.editorialGrid}>
                                <motion.div 
                                    className={styles.introVisual}
                                    initial={{ opacity: 0, x: -50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 1 }}
                                >
                                    <div className={styles.visualStack}>
                                        <div className={styles.mainVisual}>
                                            <img 
                                                src="/healthcare_recruiting.png" 
                                                alt="Healthcare Recruiting – UJC Personalvermittlung" 
                                                className={styles.recruitingImage}
                                            />
                                        </div>
                                        <div className={styles.accentVisual}></div>
                                    </div>
                                </motion.div>
                                <motion.div 
                                    className={styles.introText}
                                    initial={{ opacity: 0, x: 50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 1, delay: 0.2 }}
                                >
                                    <h2 className={styles.sectionTitle}>Healthcare Recruiting braucht mehr als Lebensläufe</h2>
                                    <p className={styles.bodyTextLarge}>
                                        Der Fachkräftemangel im Gesundheitswesen verlangt mehr als klassische Personalvermittlung.
                                    </p>
                                    <p className={styles.bodyText}>
                                        Einrichtungen brauchen Partner, die Positionen verstehen, Kandidatinnen und Kandidaten gezielt auswählen und auch komplexe Prozesse zuverlässig steuern.
                                    </p>
                                    <p className={styles.bodyText}>
                                        Genau hier setzt UJC an. Wir unterstützen Kliniken, pflegerische Einrichtungen, Praxen, MVZ und weitere medizinische Arbeitgeber bei der Besetzung anspruchsvoller Positionen – mit regionalen, nationalen und internationalen Fachkräften.
                                    </p>
                                </motion.div>
                            </div>
                        </div>
                    </section>

                    {/* SECTION 4 — SERVICES */}
                    <section id="services" className={styles.servicesSection}>
                        <HumanConnectionJourney />
                        <div className={styles.container}>
                            <motion.div 
                                className={styles.sectionHeader}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                            >
                                <h2 className={styles.sectionTitle}>Unsere Leistungen im Healthcare-Recruiting</h2>
                                <p className={styles.sectionSubline}>
                                    Wir besetzen Positionen im Gesundheitswesen passgenau und mit Blick auf langfristige Stabilität.
                                </p>
                            </motion.div>

                            <div className={styles.servicesGrid}>
                                {[
                                    { title: 'Pflegefachkräfte', desc: 'Gezielte Auswahl von Fachkräften für stationäre und ambulante Einrichtungen.' },
                                    { title: 'Medizinisches Personal', desc: 'Unterstützung für Praxen, MVZ und Kliniken in allen Fachbereichen.' },
                                    { title: 'Ärztinnen und Ärzte', desc: 'Besetzung von ärztlichen Positionen – von Assistenz- bis Chefärzten.' },
                                    { title: 'Regionales Recruiting', desc: 'Fokus auf lokale Fachkräftegewinnung in Ihrer Region.' },
                                    { title: 'Nationales Recruiting', desc: 'Bundesweite Suche nach passenden Talenten für Ihre Einrichtung.' },
                                    { title: 'Internationales Recruiting', desc: 'Erschließung globaler Talentpools mit Full-Service-Begleitung.' }
                                ].map((item, index) => (
                                    <motion.div 
                                        key={index}
                                        className={styles.serviceCard}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                        whileHover={{ y: -10 }}
                                    >
                                        <div className={styles.cardAccent}></div>
                                        <h3>{item.title}</h3>
                                        <p>{item.desc}</p>
                                    </motion.div>
                                ))}
                            </div>

                            <motion.div 
                                className={styles.servicesInfo}
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                            >
                                <p>
                                    Sie erhalten keine unübersichtliche Menge an Bewerbungen, sondern gezielt ausgewählte Profile, eine strukturierte Abstimmung und eine enge Begleitung im gesamten Prozess.
                                </p>
                            </motion.div>
                        </div>
                    </section>

                    {/* SECTION 5 — INTERNATIONAL RECRUITING */}
                    <section id="international" className={styles.internationalSection}>
                        <HealthcareBackground explodeOnMount={false} />
                        <div className={styles.container}>
                            <div className={styles.splitLayout}>
                                <motion.div 
                                    className={styles.splitText}
                                    initial={{ opacity: 0, x: -50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                >
                                    <h2 className={styles.sectionTitleLight}>Internationale Fachkräftegewinnung mit Full-Service-Begleitung</h2>
                                    <p className={styles.bodyTextLight}>
                                        Wenn Sie internationales Personal suchen, übernehmen wir auf Wunsch weit mehr als nur die Rekrutierung. UJC begleitet den Prozess von der Kandidatenauswahl über Sprachvorbereitung und Dokumentenmanagement bis zu Anerkennung, Einreise und Onboarding.
                                    </p>
                                    <p className={styles.bodyTextLight}>
                                        Dazu gehören unter anderem die Beglaubigung und Übersetzung der Unterlagen, die Einleitung des Anerkennungsverfahrens, die Unterstützung bei Arbeits- und Aufenthaltserlaubnis, Botschafts- und Visa-Prozessen sowie die Vorbereitung auf Anpassungsmaßnahmen oder Kenntnisprüfungen.
                                    </p>
                                    <p className={styles.bodyTextLight}>
                                        Internationale Vermittlung funktioniert nur dann nachhaltig, wenn sie fachlich, organisatorisch und menschlich sauber geführt wird. Genau darauf ist unser Prozess ausgerichtet.
                                    </p>
                                </motion.div>
                                <motion.div 
                                    className={styles.splitVisual}
                                    variants={containerVariants}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true, margin: "-100px" }}
                                >
                                    <div className={styles.workflowVisual}>
                                        {workflowSteps.map((step, index) => (
                                            <React.Fragment key={index}>
                                                <motion.div 
                                                    className={styles.workflowCard}
                                                    variants={cardVariants}
                                                >
                                                    <h3 className={styles.cardTitle}>{step.title}</h3>
                                                </motion.div>
                                                
                                                {index < workflowSteps.length - 1 && (
                                                    <motion.div 
                                                        className={styles.workflowArrowWrapper}
                                                        variants={arrowVariants}
                                                    >
                                                        <svg className={styles.workflowArrowSvg} viewBox="0 0 24 40">
                                                            <defs>
                                                                <linearGradient id={`arrow-grad-${index}`} x1="0%" y1="0%" x2="0%" y2="100%">
                                                                    <stop offset="0%" stopColor="rgba(255,255,255,0.1)" />
                                                                    <stop offset="50%" stopColor="var(--color-gold)" />
                                                                    <stop offset="100%" stopColor="var(--color-gold)" />
                                                                </linearGradient>
                                                            </defs>
                                                            <path 
                                                                d="M12 0 L12 36 M6 30 L12 36 L18 30" 
                                                                stroke={`url(#arrow-grad-${index})`} 
                                                                strokeWidth="2" 
                                                                fill="none" 
                                                                strokeLinecap="round" 
                                                                strokeLinejoin="round" 
                                                            />
                                                        </svg>
                                                        <div className={styles.pulseDot} />
                                                    </motion.div>
                                                )}
                                            </React.Fragment>
                                        ))}
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </section> 

                    {/* SECTION 6 — PROCESS */}
                    <section id="process" className={styles.processSection}>
                        <div className={styles.container}>
                            <motion.div 
                                className={styles.sectionHeader}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                            >
                                <h2 className={styles.sectionTitle}>So läuft die Zusammenarbeit ab</h2>
                                <p className={styles.sectionSubline}>Ein transparenter und verlässlicher Ablauf für alle Beteiligten.</p>
                            </motion.div>

                            <div className={styles.processTimeline}>
                                {[
                                    { step: '01', title: 'Bedarf & Profil', desc: 'Gemeinsame Abstimmung zu Bedarf, Position und Anforderungsprofil.' },
                                    { step: '02', title: 'Kandidatensuche', desc: 'Identifikation passender Profile aus regionalen, nationalen oder internationalen Kanälen.' },
                                    { step: '03', title: 'Interviews', desc: 'Koordination der Gespräche und Begleitung des Auswahlprozesses.' },
                                    { step: '04', title: 'Internationale Prozesse', desc: 'Begleitung von Sprachtraining, Anerkennung und Visa-Verfahren.' },
                                    { step: '05', title: 'Arbeitsbeginn', desc: 'Unterstützung bei den organisatorischen Schritten bis zum Start.' },
                                    { step: '06', title: 'Integration', desc: 'Begleitung des Onboarding und der ersten Schritte in Ihrer Einrichtung.' }
                                ].map((item, index) => (
                                    <motion.div 
                                        key={index}
                                        className={styles.processStep}
                                        initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <div className={styles.stepNumber}>{item.step}</div>
                                        <div className={styles.stepContent}>
                                            <h3>{item.title}</h3>
                                            <p>{item.desc}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            <motion.div 
                                className={styles.processNote}
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                            >
                                <p>
                                    Unser Anspruch ist ein verlässlicher Ablauf mit klaren Ansprechpartnern und spürbarer Entlastung.
                                </p>
                            </motion.div>
                        </div>
                    </section>

                    {/* SECTION 7 — SUPPORT / INTEGRATION */}
                    <section id="support" className={styles.supportSection}>
                        <div className={styles.container}>
                            <div className={styles.editorialGrid}>
                                <motion.div 
                                    className={styles.introText}
                                    initial={{ opacity: 0, x: -50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                >
                                    <h2 className={styles.sectionTitle}>Eng begleitet – auf Arbeitgeber- und Bewerberseite</h2>
                                    <p className={styles.bodyText}>
                                        Im Healthcare-Recruiting zählt nicht nur die Besetzung, sondern der Weg dorthin. Deshalb begleiten wir nicht nur unsere Kunden eng, sondern auch die vermittelten Fachkräfte – gerade dann, wenn internationale Schritte, Anerkennung oder Integration Teil des Prozesses sind.
                                    </p>
                                    <p className={styles.bodyText}>
                                        Zu den ergänzenden Leistungen zählen interkulturelle Workshops, vertiefende Deutschkurse nach der Einreise und Unterstützung bei einer nachhaltigen Mitarbeiterbindung. So schaffen wir bessere Voraussetzungen für eine stabile und erfolgreiche Zusammenarbeit ab dem ersten Tag.
                                    </p>
                                </motion.div>
                                <motion.div 
                                    className={styles.introVisual}
                                    initial={{ opacity: 0, x: 50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                >
                                    <div className={styles.humanVisual}>
                                        <div className={styles.onboardingVisual}>
                                            <img src="/onboarding.jpeg" alt="Onboarding and Integration" className={styles.onboardingImage} />
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </section>

                    {/* SECTION 8 — FINAL CTA */}
                    <section id="cta" className={styles.finalCtaSection}>
                        <div className={styles.container}>
                            <motion.div
                                className={styles.ctaContent}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                            >
                                <h2 className={styles.ctaHeadline}>Healthcare-Personal, das passt.<br />Prozesse, die tragen.</h2>
                                <p className={styles.ctaText}>
                                    Ob Pflegefachkräfte, medizinisches Personal oder ärztliche Positionen: UJC unterstützt Sie bei der nachhaltigen Besetzung Ihrer Vakanzen – regional, national und international.
                                </p>
                                <p className={styles.ctaText}>
                                    Lassen Sie uns über Ihren Personalbedarf sprechen und gemeinsam die passende Lösung für Ihre Einrichtung entwickeln.
                                </p>
                                <div className={styles.ctaButtons}>
                                    <button className={styles.primaryBtn} onClick={() => navigate('/contact')}>Jetzt Kontakt aufnehmen</button>
                                </div>
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
                </>
            )}
        </div>
    );
}

export default App;
