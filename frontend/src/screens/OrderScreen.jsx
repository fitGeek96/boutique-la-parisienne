import React from "react";
import { Link, useParams } from "react-router-dom";
import { Button, ListGroup, Image, Card, Row, Col } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useGetOrderDetailsQuery } from "../slices/ordersApiSlice";

const OrderScreen = () => {
  const { id: orderId } = useParams();
  const { data: order, isLoading, error } = useGetOrderDetailsQuery(orderId);

  return (
    <>
      {isLoading && <Loader />}
      {error && <Message variant="danger">{error.data?.message}</Message>}
      <h2 className="text-warning">Commande {order?._id}</h2>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2 className="text-info">Livraison</h2>
              <Row>
                <Col md={6}>
                  <p>
                    Nom et Prenom :{" "}
                    <strong>{order?.shippingAddress?.fullname}</strong>
                  </p>

                  <p>
                    Email : <strong>{order?.user?.email}</strong>
                  </p>
                  <p>
                    {" "}
                    Adresse:{" "}
                    <strong>
                      {" "}
                      {order?.shippingAddress?.address},{" "}
                      {order?.shippingAddress?.city}
                    </strong>
                  </p>
                  <p>
                    {" "}
                    Numéro de Téléphone:{" "}
                    <strong>{order?.shippingAddress?.phone}</strong>
                  </p>
                  {order?.isDelivered ? (
                    <Message variant={"success"}>
                      Votre commande a bien été effectuée
                    </Message>
                  ) : (
                    <Message variant={"danger"}>
                      Votre commande n'est pas encore livrée
                    </Message>
                  )}
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2 className="text-info">Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {order?.paymentMethod}
              </p>
              {order?.isPaid ? (
                <Message variant={"success"}>
                  Votre commande a bien été effectuée le {order.paidAt}
                </Message>
              ) : (
                <Message variant={"danger"}>
                  Votre commande n'est pas encore payée
                </Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2 className="text-info">Commande d'articles</h2>
              {order?.orderItems?.length === 0 ? (
                <Message variant={"info"}></Message>
              ) : (
                <ListGroup variant="flush">
                  {order?.orderItems?.map((item) => (
                    <ListGroup.Item key={item.product}>
                      <Row>
                        <Col>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                            style={{ width: "auto", height: "auto" }}
                          />
                        </Col>
                        <Col>
                          <Link to={`/products/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col className="text-center">
                          <p>Quantité</p>
                          <strong>{item.qty}</strong>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h5 className="text-center text-info mb-4">
                  Tarification de la commande
                </h5>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row className="mt-1">
                  <Col>Prix Total:</Col>
                  <Col className="text-center text-success">
                    <strong>DA {order?.totalPrice}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              {/* PAY ORDER PLACEHOLDER */}
              {/* MARK AS DILIVERED*/}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;
