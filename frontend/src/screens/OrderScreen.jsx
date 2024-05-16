import React from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  Button,
  ListGroup,
  Image,
  Card,
  Row,
  Col,
  Table,
} from "react-bootstrap";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useDeliverOrderMutation,
} from "../slices/ordersApiSlice";

const OrderScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { id: orderId } = useParams();
  const { data: order, refetch, isLoading, error } = useGetOrderDetailsQuery(
    orderId,
  );

  const [
    payOrder,
    { isLoading: paymentLoading, error: paymentError },
  ] = usePayOrderMutation();

  const [
    deliverOrder,
    { isLoading: deliveryLoading, error: deliveryError },
  ] = useDeliverOrderMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const formatPrice = (price) => {
    return price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const deliverOrderHandler = async () => {
    try {
      await deliverOrder(orderId).unwrap();
      refetch();
      toast.success("Livraison effectuée!");
    } catch (error) {
      console.error("Error delivering order:", error);
      toast.error(
        "Une erreur s'est produite lors de la livraison de la commande.",
      );
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      {error && <Message variant="danger">{error.data?.message}</Message>}
      <h3 className="text-warning mb-4 tw-text-bold tw-text-[1.5rem] tw-font-bold">
        ID Commande : {order?._id?.substring(0, 10)}
      </h3>
      <Row>
        <Col md={9}>
          <Card className="order-details-card">
            <Card.Header>
              <h4 className="text-info">Informations sur la livraison</h4>
            </Card.Header>
            <Card.Body>
              <Table striped bordered hover responsive className="table-sm">
                <tbody>
                  <tr>
                    <td>Nom et Prenom</td>
                    <td className="text-black">
                      <strong>{order?.shippingAddress?.fullname}</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>Adresse</td>
                    <td className="text-black">
                      <strong>
                        {`${order?.shippingAddress?.address}, ${order?.shippingAddress?.city}`}
                      </strong>
                    </td>
                  </tr>
                  <tr>
                    <td>Numéro de Téléphone</td>
                    <td className="text-black">
                      <strong>{order?.shippingAddress?.phone}</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>Statut de Livraison</td>
                    <td>
                      {order?.isDelivered ? (
                        <p className="text-success">
                          <strong> La Commande a bien été livrée </strong>
                        </p>
                      ) : (
                        <p className="text-danger">
                          <strong> La Commande n'est pas encore livrée </strong>
                        </p>
                      )}
                    </td>
                  </tr>
                  <tr></tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>
          <ListGroup.Item className="mt-2">
            <Card className="order-details-card">
              <Card.Header>
                <h4 className="text-info">Articles commandés</h4>
              </Card.Header>
              <Card.Body>
                {order?.orderItems?.length === 0 ? (
                  <Message variant={"info"}>Aucun article trouvé.</Message>
                ) : (
                  <Table hover responsive className="table-sm">
                    <thead>
                      <tr>
                        <th className="text-left">Image</th>
                        {order?.orderItems[0]?.category
                          ?.toLowerCase()
                          .trim() === "baskets" && (
                          <th className="">Pointure</th>
                        )}
                        <th className="text-center">Quantité</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order?.orderItems?.map((item) => (
                        <tr
                          key={item.product}
                          className="grid tw-place-items-center"
                        >
                          <td>
                            <img
                              src={item.image}
                              alt={item.name}
                              className="tw-w-[80px] tw-mx-auto tw-rounded-lg"
                            />
                          </td>
                          {item?.category?.toLowerCase().trim() ===
                            "baskets" && (
                            <td className="tw-text-[1.5rem] tw-font-bold text-center">
                              <Link to={`/products/${item.product}`}>
                                {item.size}
                              </Link>
                            </td>
                          )}

                          <td className="tw-text-[1.5rem] tw-font-bold text-center">
                            {item?.qty}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                )}
              </Card.Body>
            </Card>
          </ListGroup.Item>
        </Col>
        <Col md={3}>
          <Card className="order-details-card">
            <Card.Header>
              <h5 className="text-center text-info mb-4">
                Tarification de la commande
              </h5>
            </Card.Header>
            <Card.Body>
              <Row className="mb-2 w-100 text-left">
                <Col as="h5" className="text-center">
                  <p>Prix Total:</p>
                  <p className="text-danger fw-bold fs-4">
                    DA {formatPrice(order?.totalPrice)}
                  </p>
                </Col>
              </Row>

              {userInfo && userInfo.isAdmin && !order?.isDelivered && (
                <ListGroup.Item>
                  {deliveryLoading && <Loader />}
                  {deliveryError && (
                    <Message variant="danger">
                      {deliveryError?.data?.message}
                    </Message>
                  )}
                  <Row>
                    <Col className="text-center">
                      <Button
                        variant="info btn-outline-info text-white fw-bold"
                        onClick={deliverOrderHandler}
                      >
                        Marquer comme livré
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;
