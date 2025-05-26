import { useEffect, useState } from "react";
import { Container, Button, Row, Col } from "react-bootstrap";
import { db } from "../firebase/Firebase";
import { doc, getDoc } from "firebase/firestore";
import { FaUserCircle } from "react-icons/fa";
import { motion as Motion } from "framer-motion";

const About = () => {
    const [aboutData, setAboutData] = useState(null);

    useEffect(() => {
        const fetchAboutData = async () => {
            try {
                const docRef = doc(db, "About", "mainInfo");
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setAboutData(docSnap.data());
                } else {
                    console.log("No such document!");
                }
            } catch (err) {
                console.error("Error fetching about data:", err);
            }
        };

        fetchAboutData();
    }, []);

    if (!aboutData) {
        return (
            <div className="hero-loader d-flex flex-column justify-content-center align-items-center text-center" style={{ height: "50vh" }}>
                <Motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="text-primary"
                    style={{ fontSize: "3rem" }}
                >
                    <FaUserCircle />
                </Motion.div>
                <p className="mt-3 fs-5 fw-semibold">Loading about section...</p>
            </div>
        );
    }

    return (
        <section id="about">
            <Container>
                <h2 className="mb-4">About me</h2>
                <h5 className="mb-5">{aboutData.mainTitle}</h5>

                <Row className="align-items-start">
                    <Col xs={12} md={6} className="mb-4">
                        <h5>{aboutData.title1}</h5>
                        <p style={{ lineHeight: "1.7" }}>{aboutData.description1}</p>
                    </Col>
                    <Col xs={12} md={6}>
                        <h5>{aboutData.title2}</h5>
                        <p style={{ lineHeight: "1.7" }}>{aboutData.description2}</p>
                    </Col>
                </Row>

                {aboutData.cvLink && (
                    <div className="mt-4">
                        <Button
                            variant="primary"
                            href={aboutData.cvLink}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Download CV
                        </Button>
                    </div>
                )}
            </Container>
        </section>
    );
};

export default About;
