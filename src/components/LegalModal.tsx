import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import styles from './LegalModal.module.css';

interface LegalModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialTab?: 'impressum' | 'datenschutz';
}

const LegalModal: React.FC<LegalModalProps> = ({ isOpen, onClose, initialTab = 'impressum' }) => {
    const [activeTab, setActiveTab] = useState<'impressum' | 'datenschutz'>(initialTab);

    useEffect(() => {
        if (isOpen) {
            setActiveTab(initialTab);
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen, initialTab]);

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className={styles.backdrop} onClick={onClose}>
                <motion.div
                    className={styles.modalWrapper}
                    onClick={(e) => e.stopPropagation()}
                    initial={{ opacity: 0, y: 50, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 50, scale: 0.95 }}
                    transition={{ type: "spring", damping: 25, stiffness: 200 }}
                >
                    <div className={styles.header}>
                        <div className={styles.tabs}>
                            <button
                                className={`${styles.tabBtn} ${activeTab === 'impressum' ? styles.tabBtnActive : ''}`}
                                onClick={() => setActiveTab('impressum')}
                            >
                                Impressum
                            </button>
                            <button
                                className={`${styles.tabBtn} ${activeTab === 'datenschutz' ? styles.tabBtnActive : ''}`}
                                onClick={() => setActiveTab('datenschutz')}
                            >
                                Datenschutzerklärung
                            </button>
                        </div>
                        <button className={styles.closeBtn} onClick={onClose} aria-label="Modal schließen">
                            <X size={24} />
                        </button>
                    </div>

                    <div className={styles.content}>
                        {activeTab === 'impressum' ? (
                            <div>
                                <h1 className={styles.headline}>Impressum</h1>
                                <div className={styles.underline}></div>

                                <div className={styles.addressesGrid}>
                                    <div className={styles.subSection}>
                                        <h4>Österreich</h4>
                                        <p className={styles.bodyText}>
                                            <strong>UJC Unique Job Cooperations Alpen GmbH</strong><br />
                                            Lassallestraße 7b, 1020 Wien
                                        </p>
                                        <p className={styles.bodyText}>
                                            E-Mail: <a href="mailto:info@ujc-jobs.com" className={styles.emailLink}>info@ujc-jobs.com</a><br />
                                            Firmenbuchnummer: FN 652 648 b<br />
                                            UID: ATU82381904<br />
                                            Geschäftsführer: Jenno Thanikkal
                                        </p>
                                    </div>
                                    <div className={styles.subSection}>
                                        <h4>Deutschland</h4>
                                        <p className={styles.bodyText}>
                                            <strong>UJC Unique Job Cooperations Deutschland GmbH</strong><br />
                                            Stefan-Flötzl-Str. 2, 83342 Tacherting
                                        </p>
                                        <p className={styles.bodyText}>
                                            E-Mail: <a href="mailto:info@ujc-jobs.com" className={styles.emailLink}>info@ujc-jobs.com</a><br />
                                            Registergericht Traunstein, HRB: 34027<br />
                                            UID: DE455518259<br />
                                            Geschäftsführer: Rafael Doran
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <h1 className={styles.headline}>Datenschutzerklärung</h1>
                                <div className={styles.underline}></div>
                                
                                <p className={styles.bodyText}>
                                    Ziel dieser Datenschutzerklärung ist, dass wir Sie und die Öffentlichkeit über die Art, den Umfang und den Zweck der von uns erhobenen, genutzten und verarbeiteten personenbezogenen Daten informieren möchten und Sie gleichzeitig über die Ihnen zustehenden Rechte aufklären möchten.
                                </p>

                                <h2 className={styles.sectionHeading}>1. Begriffsbestimmungen</h2>
                                <p className={styles.bodyText}>
                                    Grundlage unserer Datenschutzerklärung sind die Begrifflichkeiten der Datenschutz-Grundverordnung (DS-GVO). Wir erheben und verarbeiten Daten transparent und nach gesetzlichen Vorgaben.
                                </p>

                                <h2 className={styles.sectionHeading}>2. Name und Anschrift des für die Verarbeitung Verantwortlichen</h2>
                                <div className={styles.contactBlock}>
                                    <p><strong>Rafael Doran</strong></p>
                                    <p>Stefan-Flötzl-Str. 2</p>
                                    <p>83342 Tacherting</p>
                                    <p>Tel.: +49 8621 9962545</p>
                                    <p>E-Mail: info@ujc-jobs.com</p>
                                </div>

                                <h2 className={styles.sectionHeading}>3. Erhebung von Daten und Rechtsgrundlage</h2>
                                <p className={styles.bodyText}>
                                    Im Rahmen der Kontaktaufnahme (z.B. via E-Mail oder Kontaktformular) verarbeiten wir Ihre Angaben zur Bearbeitung der Anfrage. Die Verarbeitung beruht auf Art. 6 Abs. 1 lit. f DS-GVO (berechtigtes Interesse) bzw. Art. 6 Abs. 1 lit. b DS-GVO (Vertragserfüllung oder vorvertragliche Maßnahmen).
                                </p>
                                <p className={styles.bodyText}>
                                    Bei Zugriff auf unsere Webseite werden automatisch Server-Logfiles erfasst (IP-Adresse, Zugriffsdatum, Browsertyp, Referrer-URL). Dies dient der Systemsicherheit und Administration und erfolgt gemäß Art. 6 Abs. 1 lit. f DSGVO.
                                </p>

                                <h2 className={styles.sectionHeading}>4. Speicherzeitraum und Weitergabe</h2>
                                <p className={styles.bodyText}>
                                    Wir speichern Ihre Daten nur so lange, wie es für den Zweck der Verarbeitung erforderlich ist oder gesetzliche Aufbewahrungspflichten dies vorschreiben. Eine Weitergabe an Dritte erfolgt ausschließlich im Rahmen der Vertragsabwicklung (z. B. an Dienstleistungspartner) gemäß den Bestimmungen von Art. 6 Abs. 1 DSGVO.
                                </p>

                                <h2 className={styles.sectionHeading}>5. Rechte der betroffenen Person</h2>
                                <p className={styles.bodyText}>
                                    Sie haben das Recht auf Auskunft (Art. 15 DSGVO), Berichtigung (Art. 16 DSGVO), Löschung (Art. 17 DSGVO), Einschränkung der Verarbeitung (Art. 18 DSGVO), Datenübertragbarkeit (Art. 20 DSGVO), Widerruf erteilter Einwilligungen (Art. 7 Abs. 3 DSGVO) sowie das Recht auf Widerspruch (Art. 21 DSGVO) und ein Beschwerderecht bei der zuständigen Aufsichtsbehörde (Art. 77 DSGVO).
                                </p>
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default LegalModal;
