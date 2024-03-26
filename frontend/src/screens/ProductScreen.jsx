import React from "react";
import { Row, Col, Image, ListGroup, Card, Button } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import products from "../products.js";
import Rating from "../components/Rating";

const ProductScreen = () => {
  const { id: productId } = useParams();
  const product = products.find((product) => product._id === productId);
  console.log(product);

  return (
    <>
      <Link to="/" className="btn btn-light my-3">
        Go Back
      </Link>
      <Row>
        <Col md={5}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>
        <Col md={4}>
          <ListGroup variant="flush">
            <ListGroup.Item as={"h4"}>{product.name}</ListGroup.Item>
            <ListGroup.Item>
              {" "}
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
              />{" "}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Description:</strong> {product.description}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>Prix:</Col>
                  <Col>
                    <strong>DZD {product.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Etat:</Col>
                  <Col>
                    <strong>
                      {product.countInStock > 0
                        ? "Disponible"
                        : "En rupture de stock"}
                    </strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item className="text-center">
                <Button
                  variant="danger text-white"
                  size="lg"
                  disabled={product.countInStock === 0}
                >
                  Ajouter au panier
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ProductScreen;
