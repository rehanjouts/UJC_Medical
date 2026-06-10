import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './ContactForm.module.css';

const ContactForm: React.FC = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        company: '',
        email: '',
        phone: '',
        role: 'company',
        message: '',
        gdpr: false,
    });

    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const [serverError, setServerError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        setServerError(null);

        try {
            const response = await fetch('./mail.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setStatus('success');
                setFormData({
                    firstName: '', lastName: '', company: '', email: '', phone: '', role: 'company', message: '', gdpr: false
                });
            } else {
                const errorData = await response.json();
                setServerError(errorData.error || 'Unknown server error');
                setStatus('error');
            }
        } catch (error) {
            setServerError('Network error or server unreachable');
            setStatus('error');
        }
    };

    return (
        <section className={styles.sectionContainer}>
            <div className={styles.glowBg}></div>

            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className={styles.formWrapper}
            >
                <h1 className={styles.headline}>Kontakt aufnehmen</h1>
                <p className={styles.subText}>Wir unterstützen Sie bei Ihren Personal- und Karrierefragen!</p>

                <form onSubmit={handleSubmit} className={styles.form}>

                    {/* First Last Name */}
                    <div className={styles.rowGrid}>
                        <div className={styles.formGroup}>
                            <label htmlFor="firstName">Vorname *</label>
                            <input type="text" id="firstName" name="firstName" required value={formData.firstName} onChange={handleChange} />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="lastName">Nachname *</label>
                            <input type="text" id="lastName" name="lastName" required value={formData.lastName} onChange={handleChange} />
                        </div>
                    </div>

                    {/* Company (Optional) */}
                    <div className={styles.formGroup}>
                        <label htmlFor="company">Unternehmen (optional)</label>
                        <input type="text" id="company" name="company" value={formData.company} onChange={handleChange} />
                    </div>

                    {/* Email (Required) & Phone (Optional) */}
                    <div className={styles.rowGrid}>
                        <div className={styles.formGroup}>
                            <label htmlFor="email">E-Mail-Adresse *</label>
                            <input type="email" id="email" name="email" required value={formData.email} onChange={handleChange} />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="phone">Telefonnummer (optional)</label>
                            <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} />
                        </div>
                    </div>

                    {/* Role Dropdown */}
                    <div className={styles.formGroup}>
                        <label htmlFor="role">Ich bin ... *</label>
                        <div className={styles.selectWrapper}>
                            <select id="role" name="role" required value={formData.role} onChange={handleChange}>
                                <option value="company">Unternehmer / Auftraggeber</option>
                                <option value="candidate">Kandidat / Bewerber</option>
                            </select>
                        </div>
                    </div>

                    {/* Message */}
                    <div className={styles.formGroup}>
                        <label htmlFor="message">Ihre Nachricht *</label>
                        <textarea id="message" name="message" rows={5} required value={formData.message} onChange={handleChange}></textarea>
                    </div>

                    {/* GDPR Checkbox */}
                    <div className={styles.checkboxGroup}>
                        <input type="checkbox" id="gdpr" name="gdpr" required checked={formData.gdpr} onChange={handleChange} />
                        <label htmlFor="gdpr">
                            Ich habe die <a href="#datenschutz" target="_blank" rel="noopener noreferrer">Datenschutzerklärung</a> gelesen und erkläre mich mit der Verarbeitung meiner Daten einverstanden. *
                        </label>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className={styles.submitBtn}
                        disabled={status === 'loading'}
                    >
                        {status === 'loading' ? 'Wird gesendet...' : 'Anfrage senden'}
                    </button>

                    {status === 'success' && (
                        <p className={styles.successMessage}>
                            Vielen Dank! Ihre Nachricht wurde erfolgreich versendet. Wir melden uns in Kürze bei Ihnen.
                        </p>
                    )}

                    {status === 'error' && (
                        <p className={styles.errorMessage}>
                            Es gab ein Problem beim Senden Ihrer Nachricht. {serverError && `(${serverError})`} Bitte versuchen Sie es später erneut oder kontaktieren Sie uns direkt per E-Mail.
                        </p>
                    )}

                </form>
            </motion.div>
        </section>
    );
};

export default ContactForm;
