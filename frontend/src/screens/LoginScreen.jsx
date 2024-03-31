import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Form, Row, Button, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("submit");
  };

  return (
    <FormContainer>
      <h1>Se connecter</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email">
          <Form.Label>Adresse e-mail</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Text className="text-muted">
            Nous ne partagerons jamais votre e-mail avec quelqu'un d'autre.
          </Form.Text>
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Mot de passe</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button variant="danger" type="submit" className="mt-3 text-white">
          Se Connecter
        </Button>
      </Form>
      <Row className="mt-3">
        <Col>
          <strong>
            {" "}
            Nouvelle Cliente? <Link to="/register">S'enregistrer</Link>
          </strong>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
