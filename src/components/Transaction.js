// src/components/Transactions.js
import React, { useState, useEffect } from 'react';
import { Container, Table, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Transactions = ({ history }) => {
    const navigate = useNavigate();

    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const customerId = localStorage.getItem('customerId');
                const res = await axios.post('http://localhost:4000/api/view-transactions', { customerId });
                setTransactions(res.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchTransactions();
    }, []);

    const handleBack = () => {
        navigate(-1)
    };

    return (
        <Container>
            <h1 className="mt-5">Transactions</h1>
            <Button variant="primary" onClick={handleBack} className="mb-3">Back</Button>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Amount</th>
                        <th>Transaction Type</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((transaction, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{transaction.amount}</td>
                            <td>{transaction.transactionType}</td>
                            <td>{new Date(transaction.date).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default Transactions;
