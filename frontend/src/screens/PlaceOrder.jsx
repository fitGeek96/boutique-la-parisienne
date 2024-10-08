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
        shippingPrice: cart.cartItems[0].shippingPrice,
        totalPrice: cart.cartItems[0].totalPrice,
      }).unwrap();

      dispatch(clearCartItems());
      navigate(`/orders/${res._id}`);
      // navigate(`/`);
      toast.success("Votre commande a bien été effectué!");
    } catch (error) {
      toast.error(error);
    }
  };

  const formatPrice = (price) => {
    return price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <>
      {/* <CheckoutSteps step1 step2 step3 step4 /> */}
      <Row>
        <Col md={3}></Col>
        <Col md={6} className="mt-2">
          <Card>
            <Card.Body>
              <h5 className="text-center text-info mb-4">Livraison Au</h5>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row className="mt-1">
                    <Col xs={12} md={6}>
                      Nom et prénom:
                    </Col>
                    <Col
                      xs={12}
                      md={6}
                      className="text-md-center text-black fw-bold"
                    >
                      <strong>{cart.shippingAddress?.fullname}</strong>
                    </Col>
                  </Row>
                  <Row className="mt-1">
                    <Col xs={12} md={6}>
                      Adresse:
                    </Col>
                    <Col
                      xs={12}
                      md={6}
                      className="text-md-center text-black fw-bold"
                    >
                      <strong>
                        {cart.shippingAddress?.address},{" "}
                        {cart.shippingAddress?.city}
                      </strong>
                    </Col>
                  </Row>
                  <Row className="mt-1">
                    <Col xs={12} md={6}>
                      Tel :
                    </Col>
                    <Col
                      xs={12}
                      md={6}
                      className="text-md-center text-black fw-bold"
                    >
                      <strong>{cart.shippingAddress?.phone}</strong>
                    </Col>
                  </Row>
                  <Row className="mt-1">
                    <Col xs={12} md={6}>
                      Prix ​​total:
                    </Col>
                    <Col xs={12} md={6} className="text-md-center text-danger">
                      <strong>
                        DA {formatPrice(cart?.cartItems[0]?.totalPrice)}
                      </strong>
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row className="justify-content-center mt-3">
                    <Button
                      variant="danger text-white"
                      disabled={cart.totalPrice === 0}
                      onClick={placeOrderHandler}
                    >
                      Confirmer La Commande
                    </Button>
                    {isLoading && <Loader />}
                  </Row>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrder;
