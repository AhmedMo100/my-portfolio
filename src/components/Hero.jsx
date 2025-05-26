import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/Firebase";
import { FaFacebook, FaInstagram, FaLinkedin, FaWhatsapp, FaCode } from "react-icons/fa";
import { Container, Row, Col, Button } from "react-bootstrap";
import Laptop from "../assets/laptop.svg";
import { motion as Motion } from "framer-motion";

const Hero = () => {
    const [heroData, setHeroData] = useState(null);

    useEffect(() => {
        const fetchHeroData = async () => {
            try {
                const docRef = doc(db, "Hero", "mainInfo");
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) setHeroData(docSnap.data());
                else console.log("No such document!");
            } catch (err) {
                console.error("Error fetching hero data:", err);
            }
        };

        fetchHeroData();
    }, []);

    if (!heroData) {
        return (
            <div className="hero-loader d-flex flex-column justify-content-center align-items-center text-center" style={{ height: "60vh" }}>
                <Motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="text-primary"
                    style={{ fontSize: "3rem" }}
                >
                    <FaCode />
                </Motion.div>
                <p className="mt-3 fs-5 fw-semibold">Loading your interface...</p>
            </div>
        );
    }

    const cleanedPhoneNumber = heroData.whatsapp.replace(/[^0-9]/g, "");
    const whatsappLink = `https://wa.me/${cleanedPhoneNumber}`;

    return (
        <section id="hero">
            <Container>
                <Row className="align-items-center justify-content-between">
                    <Col md={7}>
                        <h1 className="display-5 fw-bold mb-4">{heroData.title}</h1>
                        <p className="lead mb-4">{heroData.description}</p>
                        <div className="mb-4 d-flex gap-3 fs-4">
                            <a href={heroData.facebook} target="_blank" rel="noopener noreferrer" className="text-dark"><FaFacebook /></a>
                            <a href={heroData.instagram} target="_blank" rel="noopener noreferrer" className="text-dark"><FaInstagram /></a>
                            <a href={heroData.linkedin} target="_blank" rel="noopener noreferrer" className="text-dark"><FaLinkedin /></a>
                            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="text-dark"><FaWhatsapp size={24} /></a>
                        </div>
                        <a href="#contact">
                            <Button variant="primary" size="lg">Hire Me</Button>
                        </a>
                    </Col>

                    <Col md={4} className="d-none d-md-block hero-image-col">
                        <Motion.img
                            src={Laptop}
                            alt="Hero"
                            style={{ borderRadius: "10px", width: "100%", maxWidth: "400px", marginLeft: "auto", display: "block" }}
                            animate={{ y: [0, -15, 0] }}
                            transition={{ duration: 4, ease: "easeInOut", repeat: Infinity }}
                        />
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default Hero;
