import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/Firebase";
import { Container, Button, Spinner } from "react-bootstrap";
import Footer from "../components/Footer";

const ProjectDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        const fetchProject = async () => {
            setLoading(true);
            try {
                const docRef = doc(db, "Projects", id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setProject(docSnap.data());
                } else {
                    setProject(null);
                }
            } catch (error) {
                console.error("Error fetching project:", error);
                setProject(null);
            } finally {
                setLoading(false);
            }
        };

        fetchProject();
    }, [id]);

    if (loading)
        return (
            <div className="text-center my-5">
                <Spinner animation="border" />
            </div>
        );

    if (!project)
        return (
            <p className="text-center text-danger mt-5">المشروع غير موجود.</p>
        );

    const {
        title,
        description,
        type,
        githubLink,
        liveDemoLink,
        technologies = [],
        ...images
    } = project;

    const imageUrls = Object.values(images).filter(
        (url) => typeof url === "string" && url.includes("http")
    );

    return (
        <>
            <div className="project-header py-4">
                <Container>
                    <h3 className="fw-bold mb-3">{title}</h3>
                    <p className="mb-4">
                        <strong>Type:</strong> {type} project
                    </p>
                    <Button variant="light" onClick={() => navigate("/")}>
                        Home Page
                    </Button>
                </Container>
            </div>

            <div className="project-body py-4">
                <Container>
                    <div className="mb-4">
                        <h5 className="mb-3">Description:</h5>
                        <p className="lead">{description}</p>
                    </div>

                    <div className="mb-4">
                        <h5 className="mb-3">Screenshots:</h5>
                        <div className="image-grid d-flex flex-wrap gap-3">
                            {imageUrls.length > 0 ? (
                                imageUrls.map((img, index) => (
                                    <div
                                        key={index}
                                        className="grid-item"
                                        style={{ cursor: "pointer", flex: "1 1 30%", maxWidth: "30%" }}
                                        onClick={() => setSelectedImage(img)}
                                        onMouseEnter={(e) =>
                                            (e.currentTarget.style.transform = "scale(1.05)")
                                        }
                                        onMouseLeave={(e) =>
                                            (e.currentTarget.style.transform = "scale(1)")
                                        }
                                    >
                                        <img
                                            src={img}
                                            alt={`project-img-${index}`}
                                            className="img-fluid rounded shadow-sm"
                                            style={{ transition: "transform 0.3s ease-in-out" }}
                                        />
                                    </div>
                                ))
                            ) : (
                                <p>No screenshots available.</p>
                            )}
                        </div>
                    </div>

                    {technologies.length > 0 && (
                        <div className="mb-4">
                            <h5 className="mb-3">Technologies:</h5>
                            <div className="d-flex flex-wrap gap-2">
                                {technologies.map((tech, idx) => (
                                    <span
                                        key={idx}
                                        className="tech-badge"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="mb-4">
                        <h5>Links:</h5>
                        {githubLink && (
                            <Button
                                variant="dark"
                                href={githubLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="me-3"
                            >
                                GitHub
                            </Button>
                        )}
                        {liveDemoLink && (
                            <Button
                                variant="success"
                                href={liveDemoLink}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Live Demo
                            </Button>
                        )}
                    </div>
                </Container>
            </div>

            {selectedImage && (
                <div
                    className="image-modal position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center bg-dark bg-opacity-75"
                    style={{ zIndex: 1050 }}
                    onClick={() => setSelectedImage(null)}
                >
                    <div
                        className="modal-content position-relative"
                        style={{ maxWidth: "90%", maxHeight: "90%" }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className="btn btn-close position-absolute top-0 end-0 m-2"
                            onClick={() => setSelectedImage(null)}
                        />
                        <img
                            src={selectedImage}
                            alt="Enlarged"
                            className="img-fluid rounded"
                            style={{ maxHeight: "80vh" }}
                        />
                    </div>
                </div>
            )}

            <Footer />
        </>
    );
};

export default ProjectDetails;
