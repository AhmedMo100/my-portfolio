import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { db } from "../firebase/Firebase";
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { FaProjectDiagram } from "react-icons/fa";
import { motion as Motion } from "framer-motion";
import { MdWorkOutline } from 'react-icons/md';

const Projects = () => {
    const [projects, setProjects] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "Projects"));
                const projectsData = [];
                querySnapshot.forEach((doc) => {
                    const data = doc.data();
                    // هنا بنضيف شرط لو قيمة main = "excellent"
                    if (data.main === "excellent") {
                        projectsData.push({ id: doc.id, ...data });
                    }
                });
                setProjects(projectsData);
            } catch (error) {
                console.error("Error fetching projects:", error);
            }
        };

        fetchProjects();
    }, []);

    if (!projects) {
        return (
            <div className="hero-loader d-flex flex-column justify-content-center align-items-center text-center" style={{ height: "50vh" }}>
                <Motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="text-primary"
                    style={{ fontSize: "3rem" }}
                >
                    <FaProjectDiagram />
                </Motion.div>
                <p className="mt-3 fs-5 fw-semibold">Loading projects...</p>
            </div>
        );
    }

    return (
        <section id="projects">
            <Container>
                <h2 className="mb-4">My Projects</h2>
                <h5 className="mb-5">Selected works crafted with passion and purpose.</h5>

                <Row className="g-4">
                    {projects.map((project) => (
                        <Col key={project.id} md={4}>
                            <Card className="h-100 shadow-sm">
                                <Card.Img
                                    variant="top"
                                    src={project.thumbnail}
                                    alt={project.title}
                                    style={{
                                        height: "200px",
                                        objectFit: "cover"
                                    }}
                                />
                                <Card.Body className="d-flex flex-column">
                                    <Card.Title>{project.title}</Card.Title>
                                    <Card.Text>{project.type}</Card.Text>
                                    <Button
                                        variant="primary"
                                        className="mt-auto details"
                                        onClick={() => navigate(`/projects/${project.id}`)}
                                    >
                                        View Details
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>

                <div className="view-projects mt-5">
                    <Button onClick={() => navigate("/projects")}>
                        View More
                    </Button>
                </div>
            </Container>
            <div className="section-icon">
                <MdWorkOutline />
            </div>
        </section>
    );
};

export default Projects;
