import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { FaTimes } from "react-icons/fa";
import { useGetOrdersQuery } from "../../slices/ordersApiSlice";

const OrderListScreen = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();

  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <>
      <h2>Liste de toutes les commandes</h2>
      {isLoading && <Loader />}
      {error && <Message variant="danger">{error?.data?.message}</Message>}
      <Table striped bordered hover responsive className="table-custom">
        <thead>
          <tr>
            <th>ID</th>
            <th>Cliente</th>
            <th>Date</th>
            <th>Total</th>
            <th>Payé</th>
            <th>Livré</th>
          </tr>
        </thead>
        <tbody>
          {orders?.map((order) => (
            <tr key={order?._id}>
              <td>{order?._id.substring(0, 10)}</td>
              <td>{order?.user && order?.user?.username.substring(0, 20)}</td>
              <td>{order?.createdAt.substring(0, 10)}</td>
              <td className="text-danger">
                {" "}
                <strong> DA {formatPrice(order?.totalPrice)} </strong>{" "}
              </td>
              <td>
                {order.isPaid ? (
                  order.paidAt.substring(0, 10)
                ) : (
                  <FaTimes className="text-danger" />
                )}
              </td>
              <td>
                {order.isDelivered ? (
                  order.deliveredAt.substring(0, 10)
                ) : (
                  <FaTimes className="text-danger" />
                )}
              </td>
              <td>
                <LinkContainer to={`/orders/${order?._id}`}>
                  <Button variant="primary" size="sm" className="text-white">
                    Voir
                  </Button>
                </LinkContainer>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default OrderListScreen;
