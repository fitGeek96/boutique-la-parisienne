import { useState, useEffect } from "react";
import { Table, Form, Button, Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useProfileMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";

const ProfileScreen = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);

  const [updateProfile, { isLoading, error }] = useProfileMutation();

  useEffect(() => {
    if (userInfo) {
      setEmail(userInfo.email);
      setUsername(userInfo.username);
    }
  }, [userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Les mots de passe ne correspondent pas");
      return;
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          username,
          email,
          password,
        }).unwrap();
        dispatch(setCredentials(res));
        toast.success("Votre profil a bien été modifié!");
      } catch (err) {
        toast.error(err?.data?.Message);
      }
    }
  };

  return (
    <Row>
      <Col md={3}>
        <h2>Profil d'utilisateur</h2>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="username" className="my-2">
            <Form.Label as={"h6"}>Nom & Prenom</Form.Label>
            <Form.Control
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="email" className="my-2">
            <Form.Label as={"h6"}>Email</Form.Label>
            <Form.Control
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="password" className="my-2">
            <Form.Label as={"h6"}>Mot de passe</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="confirmPassword" className="my-2">
            <Form.Label as={"h6"}>Confirmation du Mot de passe</Form.Label>
            <Form.Control
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>

          <Button
            variant="danger"
            type="submit"
            className="mt-3 text-white"
            disabled={isLoading === true}
          >
            Modifier
          </Button>
          {isLoading && <Loader />}
        </Form>
      </Col>
      <Col md={9}>Col</Col>
    </Row>
  );
};

export default ProfileScreen;
