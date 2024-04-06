import React from "react";
import { useParams } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import { useSelector } from "react-redux";
// import axios from "axios";

const HomeScreen = () => {
  const { pageNumber } = useParams();
  const { data, isLoading, isError } = useGetProductsQuery({ pageNumber });
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        {isLoading && <Loader />}
        {isError && (
          <Message variant="danger">
            {isError?.data?.message || isError.error}
          </Message>
        )}

        {data?.products?.map((product) => (
          <Col key={product._id} xs={12} sm={6} md={4} lg={3}>
            <Product product={product} />
          </Col>
        ))}
      </Row>

      <Paginate
        pages={data?.pages}
        page={data?.page}
        isAdmin={userInfo?.isAdmin}
      />
    </>
  );
};

export default HomeScreen;
