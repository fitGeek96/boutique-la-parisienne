import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import { FaTrash, FaEdit } from "react-icons/fa";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import {
  useGetProductsQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
} from "../../slices/productsApiSlice.js";
import Paginate from "../../components/Paginate.jsx";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const ProductListScreen = () => {
  const { pageNumber } = useParams();
  const { data, isLoading, error, refetch } = useGetProductsQuery({
    pageNumber,
  });
  const { userInfo } = useSelector((state) => state.auth);

  const [
    createProduct,
    { isLoading: productCreationLoading },
  ] = useCreateProductMutation();

  const [
    deleteProduct,
    { isLoading: productDeletionLoading },
  ] = useDeleteProductMutation();

  const createProductHandler = async () => {
    try {
      await createProduct();
      await refetch();
      toast.success("Produit créé avec succès");
    } catch (err) {
      toast.error(err?.data?.message);
    }
  };

  const deleteProductHandler = async (productId) => {
    try {
      await deleteProduct(productId);
      toast.success("Produit supprimé avec succès");
    } catch (error) {
      toast.error(error?.data?.message || error?.error);
    }
  };
  return (
    <div>
      <Row className="align-items-center">
        <Col>
          <h1>Les Articles Disponibles</h1>
        </Col>
        <Col className="text-end">
          <Button className="btn-sm m-3 p-2" onClick={createProductHandler}>
            <FaEdit /> Ajouter un article
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
            {data?.products?.map((product) => (
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
                    onClick={() => deleteProductHandler(product._id)}
                  >
                    <FaTrash />
                  </Button>
                </td>
              </tr>
            ))}
            {productCreationLoading && <Loader />}
            {productDeletionLoading && <Loader />}
          </tbody>
        </Table>
        <Paginate
          pages={data?.pages}
          page={data?.page}
          isAdmin={userInfo?.isAdmin}
        />
      </>
    </div>
  );
};

export default ProductListScreen;
