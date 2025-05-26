import { useRef, useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

export default function Home() {
    const navbarRef = useRef(null);
    const heroRef = useRef(null);
    const aboutRef = useRef(null);
    const skillsRef = useRef(null);
    const projectsRef = useRef(null);
    const contactRef = useRef(null);
    const footerRef = useRef(null);

    const sectionRefs = [
        { ref: navbarRef, name: 'navbar' },
        { ref: heroRef, name: 'hero' },
        { ref: aboutRef, name: 'about' },
        { ref: skillsRef, name: 'skills' },
        { ref: projectsRef, name: 'projects' },
        { ref: contactRef, name: 'contact' },
    ];

    const [activeSection, setActiveSection] = useState(null);
    const [footerVisible, setFooterVisible] = useState(false);
    const [isNavbarVisible, setIsNavbarVisible] = useState(true);

    // مراقبة الأقسام لتحديد القسم النشط
    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.6,
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const section = sectionRefs.find(
                        (sec) => sec.ref.current === entry.target
                    );
                    if (section) setActiveSection(section.name);
                }
            });
        }, observerOptions);

        sectionRefs.forEach(({ ref }) => {
            if (ref.current) observer.observe(ref.current);
        });

        return () => {
            sectionRefs.forEach(({ ref }) => {
                if (ref.current) observer.unobserve(ref.current);
            });
        };
    }, []);

    // راقب الفوتر
    useEffect(() => {
        const footerObserver = new IntersectionObserver(
            ([entry]) => {
                setFooterVisible(entry.isIntersecting);
            },
            {
                root: null,
                threshold: 0,
            }
        );

        if (footerRef.current) {
            footerObserver.observe(footerRef.current);
        }

        return () => {
            if (footerRef.current) {
                footerObserver.unobserve(footerRef.current);
            }
        };
    }, []);

    // راقب النيفبار لإخفاء الزر لو ظاهر
    useEffect(() => {
        const navbarObserver = new IntersectionObserver(
            ([entry]) => {
                setIsNavbarVisible(entry.isIntersecting);
            },
            {
                root: null,
                threshold: 0.9, // لما النيفبار تقريباً كامل ظاهر
            }
        );

        if (navbarRef.current) {
            navbarObserver.observe(navbarRef.current);
        }

        return () => {
            if (navbarRef.current) {
                navbarObserver.unobserve(navbarRef.current);
            }
        };
    }, []);

    // دالة النزول للقسم اللي فوق الحالي
    const scrollToPreviousSection = () => {
        const currentIndex = sectionRefs.findIndex((s) => s.name === activeSection);
        if (currentIndex > 0) {
            sectionRefs[currentIndex - 1].ref.current?.scrollIntoView({
                behavior: 'smooth',
            });
        }
    };

    return (
        <div className="home position-relative">
            <div ref={navbarRef}><Navbar /></div>

            <div ref={heroRef}><Hero /></div>
            <div ref={aboutRef}><About /></div>
            <div ref={skillsRef}><Skills /></div>
            <div ref={projectsRef}><Projects /></div>
            <div ref={contactRef}><Contact /></div>

            <div ref={footerRef}><Footer /></div>

            {/* الزر الثابت أو اللي "بيثبت" نفسه فوق الفوتر */}
            {!isNavbarVisible && (
                <div
                    style={{
                        position: footerVisible ? 'absolute' : 'fixed',
                        bottom: footerVisible ? '120px' : '20px',
                        right: '20px',
                        zIndex: 1000,
                    }}
                >
                    <Button
                        onClick={scrollToPreviousSection}
                        variant="primary"
                        className="rounded-circle shadow"
                        style={{
                            width: '50px',
                            height: '50px',
                            color: 'var(--primary-color)',
                            backgroundColor: 'var(--text-color)',
                            fontSize: '20px',
                            fontWeight: 'bold',
                        }}
                        aria-label="Scroll to previous section"
                    >
                        ↑
                    </Button>
                </div>
            )}
        </div>
    );
}
