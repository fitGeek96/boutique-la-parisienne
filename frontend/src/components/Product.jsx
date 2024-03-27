import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "./Rating";

const Product = ({ product }) => {
  return (
    <Card className="mb-3">
      <Link to={`/products/${product._id}`}>
        <Card.Img variant="top" src={product.image} />
      </Link>
      <Card.Body>
        <Card.Title as={"div"} className="product-title">
          <Link to={`/products/${product._id}`}>
            <strong>{product.name}</strong>
          </Link>
        </Card.Title>
        <Card.Text as={"h4"}>DZD {product.price}</Card.Text>
        <Rating value={product.rating} text={product.numReviews} />
      </Card.Body>
    </Card>
  );
};

export default Product;
