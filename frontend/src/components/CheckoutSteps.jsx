import React from "react";
import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <Nav className="justify-content-center mb-4">
      <Nav.Item>
        {step1 ? (
          <LinkContainer to="/login">
            <Nav.Link>
              {" "}
              <strong> Se Connecter </strong>
            </Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>
            <strong>Se connecter</strong>
          </Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {step2 ? (
          <LinkContainer to="/shipping">
            <Nav.Link>
              {" "}
              <strong> Livraison </strong>
            </Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>
            <strong>Livraison</strong>
          </Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {step3 ? (
          <LinkContainer to="/payment">
            <Nav.Link>
              {" "}
              <strong> Paiement</strong>
            </Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>
            <strong>Paiement</strong>
          </Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {step4 ? (
          <LinkContainer to="/placeorder">
            <Nav.Link>
              {" "}
              <strong> Valider la Commande</strong>
            </Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>
            <strong>Valider la Commande</strong>
          </Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  );
};

export default CheckoutSteps;
