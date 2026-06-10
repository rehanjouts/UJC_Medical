import React, { useEffect, useState } from 'react';
import styles from './PageAnchorNav.module.css';

interface Section {
    id: string;
    label: string;
}

interface PageAnchorNavProps {
    sections: Section[];
}

const PageAnchorNav: React.FC<PageAnchorNavProps> = ({ sections }) => {
    const [activeSection, setActiveSection] = useState<string>(sections[0]?.id || '');

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '-30% 0px -60% 0px',
            threshold: 0
        };

        const observerCallback: IntersectionObserverCallback = (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        sections.forEach(section => {
            const element = document.getElementById(section.id);
            if (element) {
                observer.observe(element);
            }
        });

        return () => {
            sections.forEach(section => {
                const element = document.getElementById(section.id);
                if (element) {
                    observer.unobserve(element);
                }
            });
        };
    }, [sections]);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    if (!sections || sections.length === 0) return null;

    // The hero section is dark, other sections are light.
    const isDarkBackground = activeSection === 'hero';

    return (
        <nav className={`${styles.navContainer} ${isDarkBackground ? styles.darkTheme : styles.lightTheme}`}>
            {sections.map((section) => (
                <button
                    key={section.id}
                    className={`${styles.navItem} ${activeSection === section.id ? styles.active : ''}`}
                    onClick={() => scrollToSection(section.id)}
                    aria-label={`Scroll to ${section.label}`}
                >
                    <span className={styles.navLabel}>{section.label}</span>
                    <span className={styles.navDot}></span>
                </button>
            ))}
        </nav>
    );
};

export default PageAnchorNav;
