import React from "react";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
// import axios from "axios";

const HomeScreen = () => {
  const { data: products, isLoading, isError } = useGetProductsQuery();
  // const [products, setProducts] = useState([]);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     const { data } = await axios.get("/api/products");
  //     setLoading(true);
  //     setProducts(data);
  //     setLoading(false);
  //   };

  //   fetchProducts();
  // }, []);
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

        {products?.map((product) => (
          <Col key={product._id} xs={12} sm={6} md={4} lg={3}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default HomeScreen;
