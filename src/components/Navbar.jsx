import { useState, useEffect } from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const [activeSection, setActiveSection] = useState('hero');
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(prev => !prev);

    const scrollToSection = (e, sectionId) => {
        e.preventDefault();
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
            setActiveSection(sectionId);
            setIsOpen(false);
        }
    };

    useEffect(() => {
        const sections = ['hero', 'projects', 'about', 'skills', 'contact'];
        const handleScroll = () => {
            const scrollY = window.scrollY + window.innerHeight / 2;
            for (const id of sections) {
                const sec = document.getElementById(id);
                if (sec && scrollY >= sec.offsetTop && scrollY < sec.offsetTop + sec.offsetHeight) {
                    setActiveSection(id);
                    break;
                }
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { id: 'hero', label: 'Hero' },
        { id: 'about', label: 'About' },
        { id: 'skills', label: 'Skills' },
        { id: 'projects', label: 'Projects' }
    ];

    return (
        <nav className="navbar shadow-sm">
            <div className="container" style={{ maxWidth: '600px' }}>
                {/* Mobile */}
                <div className="d-flex d-md-none justify-content-between w-100">
                    <div className="navbar-brand fw-bold">Ahmed Tarek</div>
                    <button className="navbar-toggler" onClick={toggleMenu}>
                        <svg width="24" height="24" fill="none" stroke="var(--text-color)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="3" y1="12" x2="21" y2="12" />
                            <line x1="3" y1="6" x2="21" y2="6" />
                            <line x1="3" y1="18" x2="21" y2="18" />
                        </svg>
                    </button>
                </div>

                {/* Desktop */}
                <div className="collapse navbar-collapse d-none d-md-flex w-100 justify-content-between align-items-center">
                    <div className="d-flex gap-3">
                        {navLinks.slice(0, 2).map(link => (
                            <a key={link.id} href={`#${link.id}`} onClick={e => scrollToSection(e, link.id)} className={`nav-link ${activeSection === link.id ? 'active' : ''}`}>{link.label}</a>
                        ))}
                    </div>
                    <div className="navbar-brand fw-bold">Ahmed Tarek</div>
                    <div className="d-flex gap-3">
                        {navLinks.slice(2).map(link => (
                            <a key={link.id} href={`#${link.id}`} onClick={e => scrollToSection(e, link.id)} className={`nav-link ${activeSection === link.id ? 'active' : ''}`}>{link.label}</a>
                        ))}
                    </div>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isOpen && (
                        <Motion.div
                            className="d-md-none mt-3 d-flex flex-column gap-2 w-100"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                        >
                            {navLinks.map(link => (
                                <a key={link.id} href={`#${link.id}`} onClick={e => scrollToSection(e, link.id)} className={`nav-link ${activeSection === link.id ? 'active' : ''}`}>{link.label}</a>
                            ))}
                        </Motion.div>
                    )}
                </AnimatePresence>
            </div>
        </nav>
    );
};

export default Navbar;
