import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../slices/usersApiSlice";
import { saveShippingAddress } from "../slices/cartSlice";

const ShippingScreen = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [fullname, setFullname] = useState(shippingAddress?.fullname || "");
  const [phone, setPhone] = useState(shippingAddress?.phone || "");
  const [address, setAddress] = useState(shippingAddress?.address || "");
  const [city, setCity] = useState(shippingAddress?.city || "");

  //   const [state, setState] = useState("");
  // const [email, setEmail] = useState("");
  // const [zip, setZip] = useState("");
  // const [country, setCountry] = useState("");
  //   const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { loading, error, data }] = useLoginMutation();

  const { user } = useSelector((state) => state.auth);

  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ fullname, phone, address, city }));
    navigate("/payment");
  };

  return (
    <FormContainer>
      <h4>Remplissez les champs requis pour la livraison</h4>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="fullname">
          <Form.Label>Nom et prénom</Form.Label>
          <Form.Control
            type="text"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="phone">
          <Form.Label>Numéro de téléphone</Form.Label>
          <Form.Control
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="address">
          <Form.Label>Adresse</Form.Label>
          <Form.Control
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="phone">
          <Form.Label>Wilaya</Form.Label>
          <Form.Control
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </Form.Group>
        <Button type="submit" variant="primary" className="my-5 w-100">
          Continuer
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingScreen;
