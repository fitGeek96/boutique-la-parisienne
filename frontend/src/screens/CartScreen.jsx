import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
  Container,
} from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import Message from "../components/Message";
import { addToCart, removeFromCart } from "../slices/cartSlice";

const CartScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const addToCartHandler = async (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = async (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  };

  return (
    <Container>
      <Row>
        <Col md={8} xs={12}>
          <h1 className="mb-3">Panier</h1>
          {cartItems.length === 0 ? (
            <Message variant={"info"}>
              Votre panier est vide <Link to="/">Retour</Link>
            </Message>
          ) : (
            <ListGroup variant="flush">
              {cartItems?.map((item) => (
                <ListGroup.Item key={item._idid}>
                  <Row>
                    <Col md={2} xs={5} className="p-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        className="align-self-center"
                        style={{ width: "80%" }}
                        fluid
                        rounded
                      />
                    </Col>
                    <Col
                      md={3}
                      xs={7}
                      className="text-center align-self-center"
                    >
                      <Link to={`/products/${item._id}`}>{item.name}</Link>
                    </Col>
                    <Col
                      md={2}
                      xs={4}
                      className="text-center mx-auto align-self-center"
                    >
                      {" "}
                      <strong> DA {item.price} </strong>
                    </Col>
                    <Col
                      md={3}
                      xs={4}
                      className="text-center my-2 mx-auto align-self-center"
                    >
                      <Form.Control
                        as="select"
                        value={item.qty}
                        onChange={(e) =>
                          addToCartHandler(item, Number(e.target.value))
                        }
                        className="text-center mx-auto w-50"
                      >
                        {Array.from({ length: item?.countInStock }, (v, i) => (
                          <option key={i} value={i + 1}>
                            {i + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                    <Col
                      md={2}
                      xs={4}
                      className="text-center align-self-center"
                    >
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => removeFromCartHandler(item._id)}
                        className="py-2"
                      >
                        <FaTrash size={20} />
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4} sm={12} xs={12} className="mt-5">
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>Prix Total:</Col>
                  <Col className="text-center">
                    <strong>
                      {" "}
                      DA {cart.totalPrice ? `${cart.totalPrice}` : "00.0"}{" "}
                    </strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col className="text-center">
                    <Button
                      variant="success text-white"
                      size="sm"
                      className="w-70 p-2"
                      onClick={checkoutHandler}
                      disabled={cartItems.length === 0}
                    >
                      <strong> Valider la Commande</strong>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CartScreen;
