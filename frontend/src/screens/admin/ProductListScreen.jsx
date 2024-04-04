import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import { FaTimes, FaTrash, FaEdit } from "react-icons/fa";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import {
  useGetProductsQuery,
  useCreateProductMutation,
} from "../../slices/productsApiSlice.js";

const ProductListScreen = () => {
  const { data: products, isLoading, error, refetch } = useGetProductsQuery();

  const [
    createProduct,
    { isLoading: productCreationLoading },
  ] = useCreateProductMutation();

  const createProductHandler = async () => {
    try {
      await createProduct();
      await refetch();
      toast.success("Produit créé avec succès");
    } catch (err) {
      toast.error(err?.data?.message);
    }
  };

  const deleteProduct = (productId) => {
    console.log("delete : ", productId);
  };
  return (
    <div>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-end">
          <Button className="btn-sm m-3 p-2" onClick={createProductHandler}>
            <FaEdit /> Créer un produit
          </Button>
        </Col>
      </Row>
      {isLoading && <Loader />}
      {error && <Message variant="danger">{error.data?.message}</Message>}
      <>
        <Table hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nom</th>
              <th>Prix</th>
              <th>Category</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products?.map((product) => (
              <tr key={product._id}>
                <td style={{ width: "100px", height: "auto" }}>
                  <LinkContainer to={`/products/${product._id}`}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="img-fluid"
                    />
                  </LinkContainer>
                </td>
                <td>{product.name}</td>
                <td className="text-info fw-bold">DA {product.price}</td>
                <td>{product.category}</td>
                <td>
                  <LinkContainer to={`/admin/products/${product._id}/edit`}>
                    <Button className="btn-sm mx-2 p-2 btn-success">
                      <FaEdit />
                    </Button>
                  </LinkContainer>
                  <Button
                    variant="danger"
                    className="btn-sm mx-3 p-2 text-white"
                    onClick={() => deleteProduct(product._id)}
                  >
                    <FaTrash />
                  </Button>
                </td>
              </tr>
            ))}
            {productCreationLoading && <Loader />}
          </tbody>
        </Table>
      </>
    </div>
  );
};

export default ProductListScreen;
