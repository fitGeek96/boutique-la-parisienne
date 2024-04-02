import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from "react-bootstrap";
import { Link, useParams, useNavigate } from "react-router-dom";
import Rating from "../components/Rating";
import { useGetProductDetailsQuery } from "../slices/productsApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { addToCart } from "../slices/cartSlice";
// import axios from "axios";

const ProductScreen = () => {
  const { id: productId } = useParams();

  const [qty, setQty] = useState(1);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data: product, isLoading, isError } = useGetProductDetailsQuery(
    productId,
  );

  const addToCartHandler = () => {
    dispatch(
      addToCart({
        ...product,
        qty,
      }),
    );
    navigate("/cart");
  };

  // const [product, setProduct] = useState([]);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const fetchProduct = async () => {
  //     const { data } = await axios.get(`/api/products/${productId}`);
  //     setLoading(true);
  //     setProduct(data);
  //     setLoading(false);
  //   };

  //   fetchProduct();
  // }, [productId]);

  return (
    <>
      <Link to="/" className="btn btn-light my-3 ms-3">
        Go Back
      </Link>
      {isLoading && <Loader />}
      {isError && (
        <Message variant={"danger"}>
          {isError?.data?.message || isError.error}
        </Message>
      )}
      <Row>
        <Col md={5}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <Image src={product?.image} alt={product?.name} fluid rounded />
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <ListGroup variant="flush">
            <ListGroup.Item as={"h4"}>{product?.name}</ListGroup.Item>
            <ListGroup.Item>
              {" "}
              <Rating
                value={product?.rating}
                text={`${product?.numReviews} reviews`}
              />{" "}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Description:</strong> {product?.description}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>Prix:</Col>
                  <Col className="text-center">
                    <strong>DZD {product?.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Etat:</Col>
                  <Col className="text-center">
                    <strong>
                      {product?.countInStock > 0
                        ? "Disponible"
                        : "En rupture de stock"}
                    </strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              {product?.countInStock > 0 && (
                <ListGroup.Item>
                  <Row>
                    <Col>Quantité:</Col>
                    <Col>
                      <Form.Control
                        as="select"
                        value={qty}
                        onChange={(e) => setQty(Number(e.target.value))}
                        className="text-center p-0 m-auto w-50"
                      >
                        {Array.from(
                          { length: product?.countInStock },
                          (v, i) => (
                            <option key={i} value={i + 1}>
                              {i + 1}
                            </option>
                          ),
                        )}
                      </Form.Control>
                    </Col>
                  </Row>
                </ListGroup.Item>
              )}
              <ListGroup.Item className="text-center">
                <Button
                  variant="danger text-white"
                  size="lg"
                  disabled={product?.countInStock === 0}
                  onClick={addToCartHandler}
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
