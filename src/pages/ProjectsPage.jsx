import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/Firebase";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { motion as Motion } from "framer-motion";
import { FaProjectDiagram } from "react-icons/fa";

const ProjectsPage = () => {
    const [projects, setProjects] = useState(null);
    const [filteredProjects, setFilteredProjects] = useState([]);
    const [types, setTypes] = useState([]);
    const [selectedType, setSelectedType] = useState("All");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const snapshot = await getDocs(collection(db, "Projects"));
                const projectsData = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                setProjects(projectsData);
                setFilteredProjects(projectsData);

                const uniqueTypes = [...new Set(projectsData.map((p) => p.type))];
                setTypes(uniqueTypes);
            } catch (error) {
                console.error("Error fetching projects:", error);
            }
        };

        fetchProjects();
    }, []);

    useEffect(() => {
        if (!projects) return;
        if (selectedType === "All") {
            setFilteredProjects(projects);
        } else {
            setFilteredProjects(projects.filter((p) => p.type === selectedType));
        }
    }, [selectedType, projects]);

    if (!projects) {
        return (
            <div
                className="d-flex flex-column justify-content-center align-items-center"
                style={{ height: "50vh" }}
            >
                <Motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    style={{ fontSize: "3rem" }}
                >
                    <FaProjectDiagram
                        style={{ fontSize: "3rem", color: "#007bff", animation: "spin 2s linear infinite" }}
                    />

                </Motion.div>

                <p className="mt-3 fs-5 fw-semibold">Loading projects...</p>
            </div>
        );
    }

    return (
        <>
            <div className="projects-page my-5">
                <Container>
                    <div className="mb-5 projects-header">
                        <h3 className="fw-bold mb-3">My Projects</h3>
                        <p className="mb-4">
                            Explore a curated list of projects that reflect my skills and
                            creativity.
                        </p>
                        <Button variant="light" onClick={() => navigate("/")}>
                            Home Page
                        </Button>
                    </div>

                    <div className="glass-bg d-flex justify-content-center mb-4 flex-wrap gap-2">
                        <Button
                            className={`filter-btn ${selectedType === "All" ? "active" : ""}`}
                            onClick={() => setSelectedType("All")}
                        >
                            All
                        </Button>
                        {types.map((type, idx) => (
                            <Button
                                key={idx}
                                className={`filter-btn ${selectedType === type ? "active" : ""}`}
                                onClick={() => setSelectedType(type)}
                            >
                                {type}
                            </Button>
                        ))}
                    </div>

                    <Row className="g-4">
                        {filteredProjects.length > 0 ? (
                            filteredProjects.map((project) => (
                                <Col key={project.id} md={6} lg={4}>
                                    <Card className="h-100 shadow-sm glass-bg project-card">
                                        <Card.Img
                                            variant="top"
                                            src={project.thumbnail}
                                            alt={project.title}
                                            className="mb-2"
                                            style={{ objectFit: "cover", height: "180px" }}
                                        />
                                        <Card.Body className="d-flex flex-column">
                                            <Card.Title className="mb-5">{project.title}</Card.Title>
                                            <Button
                                                variant="primary"
                                                className="mt-auto"
                                                onClick={() => navigate(`/projects/${project.id}`)}
                                            >
                                                View details
                                            </Button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))
                        ) : (
                            <p className="text-center">No projects found for this type.</p>
                        )}
                    </Row>
                </Container>
            </div>

            <Footer />
        </>
    );
};

export default ProjectsPage;
