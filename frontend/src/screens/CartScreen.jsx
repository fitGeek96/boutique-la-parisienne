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
import { addToCart } from "../slices/cartSlice";

const CartScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const addToCartHandler = async (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  return (
    <Container>
      <Row>
        <Col md={8}>
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
                    <Col md={2}>
                      <Image
                        src={item.image}
                        alt={item.name}
                        className="w-100"
                        fluid
                        rounded
                      />
                    </Col>
                    <Col md={3} className="text-center my-2">
                      <Link to={`/products/${item._id}`}>{item.name}</Link>
                    </Col>
                    <Col md={2} className="text-center my-2">
                      {" "}
                      <strong> DA {item.price} </strong>
                    </Col>
                    <Col md={3} className="text-center my-2">
                      <Form.Control
                        as="select"
                        value={item.qty}
                        onChange={(e) =>
                          addToCartHandler(item, Number(e.target.value))
                        }
                        className="text-center py- m-auto w-50"
                      >
                        {Array.from({ length: item?.countInStock }, (v, i) => (
                          <option key={i} value={i + 1}>
                            {i + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                    <Col md={2} className="text-center my-2">
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => dispatch()}
                      >
                        <FaTrash />
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
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
                  <Col>
                    <Button
                      variant="success text-white"
                      size="sm"
                      className="btn-block w-100"
                      onClick={() => navigate("/checkout")}
                      disabled={cartItems.length === 0}
                    >
                      Valider la Commande
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
