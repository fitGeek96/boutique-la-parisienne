import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
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
import { useSelector } from "react-redux";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useGetPayPalClientIdQuery,
} from "../slices/ordersApiSlice";

const OrderScreen = () => {
  const { id: orderId } = useParams();
  const { data: order, isLoading, error } = useGetOrderDetailsQuery(orderId);

  const {
    data: paypal,
    refetch,
    isLoading: loadingPayPal,
    error: errorPayPal,
  } = useGetPayPalClientIdQuery();
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
  const [
    payOrder,
    { isLoading: paymentLoading, error: paymentError },
  ] = usePayOrderMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!errorPayPal && !loadingPayPal && paypal.clientId) {
      const loadPayPalScript = async () => {
        paypalDispatch({
          type: "resetOptions",
          value: {
            "client-id": paypal.clientId,
            currency: "USD",
          },
        });
        paypalDispatch({
          type: "setLoadingStatus",
          value: "pending",
        });
      };

      if (order && !order.isPaid) {
        if (!window.paypal) {
          loadPayPalScript();
        }
      }
    }
  }, [order, paypal, loadingPayPal, errorPayPal, paypalDispatch]);

  const onApprove = (data, actions) => {
    return actions.order.capture().then(async (details) => {
      try {
        await payOrder({ orderId, details }).unwrap();
        refetch();
        toast.success("Payment successful!");
      } catch (err) {
        toast.error(err?.data?.message);
      }
    });
  };

  const onPayPalError = (params) => {
    toast.error("PayPal payment error.");
  };

  const createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: {
              currency_code: "USD",
              value: order.totalPrice,
            },
          },
        ],
      })
      .then((orderId) => {
        return orderId;
      });
  };

  return (
    <>
      {isLoading && <Loader />}
      {error && <Message variant="danger">{error.data?.message}</Message>}
      <h3 className="text-warning">
        ID Commande : {order?._id.substring(0, 10)}
      </h3>
      <Row>
        <Col md={9}>
          <Card>
            <Card.Header>
              <h4 className="text-info">Informations sur la livraison</h4>
            </Card.Header>
            <Card.Body>
              <Table striped bordered hover responsive className="table-sm">
                <tbody>
                  <tr>
                    <td>Nom et Prenom</td>
                    <td>
                      <strong>{order?.shippingAddress?.fullname}</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>Adresse</td>
                    <td>
                      <strong>
                        {`${order?.shippingAddress?.address}, ${order?.shippingAddress?.city}`}
                      </strong>
                    </td>
                  </tr>
                  <tr>
                    <td>Numéro de Téléphone</td>
                    <td>
                      <strong>{order?.shippingAddress?.phone}</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>Statut de Livraison</td>
                    <td>
                      {order?.isDelivered ? (
                        <p className="text-success">
                          <strong> La Commande a bien été effectuée </strong>
                        </p>
                      ) : (
                        <p className="text-danger">
                          <strong> La Commande n'est pas encore livrée </strong>
                        </p>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td>Statut de Paiment</td>
                    <td>
                      {order?.isPaid ? (
                        <p className="text-success">
                          <strong> La commande est payée avec succès</strong>
                        </p>
                      ) : (
                        <p className="text-danger">
                          <strong> La commande n'est pas encore payée</strong>
                        </p>
                      )}
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>
          <ListGroup.Item className="mt-2">
            <Card>
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
                        <th>Image</th>
                        <th>Nom</th>
                        <th className="text-center">Quantité</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order?.orderItems?.map((item) => (
                        <tr key={item.product} className="text-left">
                          <td className="align-middle">
                            <Image
                              src={item.image}
                              alt={item.name}
                              fluid
                              rounded
                              style={{ width: "80px", height: "auto" }}
                            />
                          </td>
                          <td className="align-middle">
                            <Link to={`/products/${item.product}`}>
                              {item.name}
                            </Link>
                          </td>
                          <td className="align-middle">{item.qty}</td>
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
          <Card>
            <Card.Header>
              <h5 className="text-center text-info mb-4">
                Tarification de la commande
              </h5>
            </Card.Header>
            <Card.Body>
              <Row className="mt-1">
                <Col>Prix Total:</Col>
                <Col className="text-center text-success">
                  <strong>DA {order?.totalPrice}</strong>
                </Col>
              </Row>
              {!order?.isPaid && (
                <ListGroup.Item>
                  {paymentLoading && <Loader />}
                  {isPending && <Loader />}
                  <Row>
                    <Col className="text-center">
                      <PayPalButtons
                        createOrder={createOrder}
                        onApprove={onApprove}
                        onError={onPayPalError}
                      />
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
