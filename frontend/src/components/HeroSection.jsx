import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

const HeroSection = () => {
  return (
    <section className="hero-section mb-2">
      <Container fluid>
        <Row className="align-items-center">
          <Col md={12} className="tw-text-center">
            <h2 className="tw-text-[3.5rem]">Découvrez votre style avec </h2>
            <h1 className="tw-text-white tw-text-[5rem] tw-font-fleur">
              {" "}
              La Parisienne{" "}
            </h1>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default HeroSection;
