// src/components/Withdraw.js
import React, { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Withdraw = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleWithdrawal = async (e) => {
    e.preventDefault();
    try {
      const customerId = localStorage.getItem("customerId");
      const res = await axios.post("http://localhost:4000/api/withdraw", {
        customerId,
        amount,
      });
      navigate(-1);
      alert(res.data);
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <Container style={{ maxWidth: "500px" }}>
      <Button
        className="mt-3"
        variant="primary"
        type="submit"
        onClick={() => navigate(-1)}
      >
        Back
      </Button>
      <h1 className="mt-5">Withdraw</h1>
      <Form onSubmit={handleWithdrawal}>
        <Form.Group className="mb-3" controlId="formBasicAmount">
          <Form.Label>Amount</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Withdraw
        </Button>
      </Form>
      {error && (
        <Alert variant="danger" className="mt-3">
          {error}
        </Alert>
      )}
      {successMessage && (
        <Alert variant="success" className="mt-3">
          {successMessage}
        </Alert>
      )}
    </Container>
  );
};

export default Withdraw;
