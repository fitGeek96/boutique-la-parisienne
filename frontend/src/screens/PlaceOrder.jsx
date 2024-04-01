import React from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, ListGroup, Image, Card, Row, Col } from "react-bootstrap";
import CheckoutSteps from "../components/CheckoutSteps";

const PlaceOrder = () => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate("/shipping");
    } else if (!cart.paymentMethod) {
      navigate("/payment");
    } else {
      navigate("/placeorder");
    }
  }, [navigate, cart.paymentMethod, cart.shippingAddress.address]);

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>column</Col>
        <Col md={8}>column</Col>
      </Row>
    </>
  );
};

export default PlaceOrder;
