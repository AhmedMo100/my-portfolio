import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { db } from "../firebase/Firebase";
import { doc, getDoc } from "firebase/firestore";
import { FaHammer } from "react-icons/fa";
import { motion as Motion } from "framer-motion";
import { BsLightningCharge } from 'react-icons/bs';

const Skills = () => {
    const [skills, setSkills] = useState(null);

    useEffect(() => {
        const fetchSkills = async () => {
            try {
                const skillDocs = ["frontend", "backend", "design"];
                const skillsData = {};

                for (const docId of skillDocs) {
                    const docRef = doc(db, "Skills", docId);
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        skillsData[docId] = docSnap.data();
                    }
                }

                setSkills(skillsData);
            } catch (error) {
                console.error("Error fetching skills data:", error);
            }
        };

        fetchSkills();
    }, []);

    if (!skills) {
        return (
            <div className="hero-loader d-flex flex-column justify-content-center align-items-center" style={{ height: "50vh" }}>
                <Motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="text-primary"
                    style={{ fontSize: "3rem" }}
                >
                    <FaHammer />
                </Motion.div>
                <p className="mt-3 fs-5 fw-semibold">Loading skills...</p>
            </div>
        );
    }

    return (
        <section id="skills">
            <Container>
                <h2 className="mb-4">My Skills</h2>
                <h5 className="mb-5">A blend of design, development, and creativity.</h5>

                <Row className="g-4">
                    {Object.entries(skills).map(([key, skill]) => (
                        <Col key={key} md={4}>
                            <Card className="h-100 shadow-sm">
                                <Card.Img
                                    variant="top"
                                    src={skill.icon}
                                    alt={`${skill.title} icon`}
                                    style={{
                                        width: "60px",
                                        height: "60px",
                                        objectFit: "contain",
                                        margin: "20px auto 10px"
                                    }}
                                />
                                <Card.Body className="d-flex flex-column">
                                    <Card.Title>{skill.title}</Card.Title>
                                    <Card.Text style={{ flexGrow: 1 }}>{skill.description}</Card.Text>
                                    <p><strong>Level:</strong> {skill.level}</p>
                                    {skill.link && (
                                        <Button
                                            variant="outline-primary"
                                            href={skill.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="mt-auto details"
                                        >
                                            Learn More
                                        </Button>
                                    )}
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>

                <div className="hire-me mt-5">
                    <a href="#contact">
                        <Button variant="primary">Hire Me</Button>
                    </a>
                </div>
            </Container>
            <div className="section-icon">
                <BsLightningCharge />
            </div>
        </section>
    );
};

export default Skills;
