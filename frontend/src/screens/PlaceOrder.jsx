import React from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, ListGroup, Image, Card, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import CheckoutSteps from "../components/CheckoutSteps";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useCreateOrderMutation } from "../slices/ordersApiSlice.js";
import { clearCartItems } from "../slices/cartSlice.js";

const PlaceOrder = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  useEffect(() => {
    if (!cart.shippingAddress?.address) {
      navigate("/shipping");
    } else if (!cart.paymentMethod) {
      navigate("/payment");
    } else {
      navigate("/placeorder");
    }
  }, [navigate, cart.paymentMethod, cart.shippingAddress?.address]);

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();

      dispatch(clearCartItems());
      // navigate(`/orders/${res._id}`);
      navigate(`/`);
      toast.success("Votre commande a bien été effectué!");
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={3}></Col>
        <Col md={6} className="mt-2">
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h5 className="text-center text-info mb-4">
                  Résumé de la commande
                </h5>
                <Row className="mt-1">
                  <Col>Nom et prénom:</Col>
                  <Col className="text-center">
                    <strong>{cart.shippingAddress?.fullname}</strong>
                  </Col>
                </Row>
                <Row className="mt-1">
                  <Col>Adresse Complete:</Col>
                  <Col className="text-center">
                    <strong>
                      {cart.shippingAddress?.address},
                      {cart.shippingAddress?.city}
                    </strong>
                  </Col>
                </Row>
                <Row className="mt-1">
                  <Col>Numéro de téléphone:</Col>
                  <Col className="text-center">
                    <strong>{cart.shippingAddress?.phone}</strong>
                  </Col>
                </Row>
                <Row className="mt-1">
                  <Col>Prix Total:</Col>
                  <Col className="text-center text-success">
                    <strong>DA {cart.totalPrice}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {error && (
                  <Message variant="danger">{error.data.message}</Message>
                )}
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col className="text-center">
                    <Button
                      variant="primary"
                      disabled={cart.cartItems?.length === 0}
                      onClick={placeOrderHandler}
                    >
                      Passer La Commande
                    </Button>
                    {isLoading && <Loader />}
                  </Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrder;
