// src/components/FindBranch.js
import React, { useState } from "react";
import { Container, Form, Button, Table } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FindBranch = () => {
  const navigate = useNavigate();
  const [city, setCity] = useState("");
  const [branches, setBranches] = useState([]);

  const handleFindBranch = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:4000/api/find-branch", {
        city,
      });
      setBranches(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container>
      <Button
        className="mt-3"
        variant="primary"
        type="submit"
        onClick={() => navigate(-1)}
      >
        Back
      </Button>
      <h1 className="mt-5">Find Branch</h1>
      <Form onSubmit={handleFindBranch} className="mt-4">
        <Form.Group controlId="formCity">
          <Form.Label>Enter City Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </Form.Group>
        <Button className="mt-3" variant="primary" type="submit">
          Find Branch
        </Button>
      </Form>
      {branches.length > 0 && (
        <Table striped bordered hover className="mt-4">
          <thead>
            <tr>
              <th>#</th>
              <th>Branch Address</th>
            </tr>
          </thead>
          <tbody>
            {branches.map((branch, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{branch.address}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default FindBranch;
