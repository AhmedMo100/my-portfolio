import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { useState } from "react";
import emailjs from '@emailjs/browser';
import { FaEnvelope } from 'react-icons/fa';


const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const [formErrors, setFormErrors] = useState({});
    const [sending, setSending] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setFormErrors({ ...formErrors, [e.target.name]: '' });
    };

    const validateForm = () => {
        const errors = {};

        // Regex
        const nameRegex = /^[a-zA-Z\s]{4,}$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!nameRegex.test(formData.name)) {
            errors.name = "Please enter a valid name (letters only, min 4 characters)";
        }

        if (!emailRegex.test(formData.email)) {
            errors.email = "Please enter a valid email address";
        }

        if (formData.message.length < 20) {
            errors.message = "Message must be at least 20 characters";
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setSending(true);
        setError(false);
        setSuccess(false);

        try {
            await emailjs.send(
                'service_portfolio',
                'template_portfolio',
                formData,
                'LN3IMWKIwQrlAxW6z'
            );
            setSuccess(true);
            setFormData({ name: '', email: '', message: '' });
        } catch (err) {
            console.error(err);
            setError(true);
        } finally {
            setSending(false);
        }
    };

    return (
        <section id="contact" >
            <Container className="contact-container">
                <h2 className="text-center mb-4">Contact Me</h2>
                <h5 className="text-center mb-5 ">
                    Crafting digital experiences with purpose and passion.
                </h5>

                <Row className="justify-content-center">
                    <Col md={8}>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="formName" className="mb-3">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter your name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    isInvalid={!!formErrors.name}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    {formErrors.name}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group controlId="formEmail" className="mb-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter your email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    isInvalid={!!formErrors.email}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    {formErrors.email}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group controlId="formMessage" className="mb-3">
                                <Form.Label>Message</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={5}
                                    placeholder="Your message..."
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    isInvalid={!!formErrors.message}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    {formErrors.message}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <div className="text-center">
                                <Button variant="primary" type="submit" disabled={sending}>
                                    {sending ? 'Sending...' : 'Send Message'}
                                </Button>
                            </div>

                            {success && (
                                <p className="text-success text-center mt-3">Message sent successfully!</p>
                            )}
                            {error && (
                                <p className="text-danger text-center mt-3">Something went wrong. Please try again.</p>
                            )}
                        </Form>
                    </Col>
                </Row>
            </Container>
            <div className="section-icon">
                <FaEnvelope />
            </div>
        </section>
    );
};

export default Contact;
