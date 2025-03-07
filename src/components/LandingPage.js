// src/components/LandingPage.js
import React from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';

const LandingPage = () => {
    return (
        <Container style={{ color: '#007bff', backgroundColor: '#ffffff' }} className="text-center p-5">
            <Row className="justify-content-center">
                <Col md={8}>
                    <h1>Welcome to SmartBank</h1>
                    <p className="text-secondary">
                        Experience the next generation of banking.
                    </p>
                    <img src="https://via.placeholder.com/500x300.png?text=SmartBank" alt="Bank Image" className="img-fluid mb-4"/>
                    <Button className='m-2' variant="primary" href="/login">Login</Button>
                    <Button variant="primary" href="/register">Register</Button>

                </Col>
            </Row>
        </Container>
    );
};

export default LandingPage;
