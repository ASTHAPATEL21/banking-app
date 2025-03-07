// src/components/Dashboard.js
import React, { useState, useEffect } from 'react';
import { Container, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
    const navigate = useNavigate();
    const [balance, setBalance] = useState(null);

    useEffect(() => {
        async function fetchBalance() {
            try {
                const customerId = localStorage.getItem('customerId'); // Retrieve customer ID from local storage
                const res = await axios.post('http://localhost:4000/api/check-balance', { customerId });
                setBalance(res.data.balance);
            } catch (err) {
                console.error(err);
            }
        }
        fetchBalance();
    }, []);

    const handleLogout = () => {
        // Clear localStorage and navigate to login page
        localStorage.removeItem('customerId');
        navigate('/login');
    };

    return (
        <Container>
            <Row className="mt-3 justify-content-end">
                <Col>
                    <Button variant="light" onClick={handleLogout} className="me-2">
                        Logout
                    </Button>
                </Col>
            </Row>
            <h1 className="mt-5">Dashboard</h1>
            <Row className="mt-4">
                <Col>
                    <Button variant="primary" onClick={() => navigate('/deposit')}>Deposit</Button>
                    <Button variant="primary" onClick={() => navigate('/withdraw')} className="ms-2">Withdraw</Button>
                    <Button variant="primary" onClick={() => navigate('/transactions')} className="ms-2">View Transactions</Button>
                    <Button variant="primary" onClick={() => navigate('/find-branch')} className="ms-2">Find Branch</Button>


                </Col>
            </Row>
            <p className="mt-3">Your balance is: {balance}</p>
        </Container>
    );
};

export default Dashboard;
