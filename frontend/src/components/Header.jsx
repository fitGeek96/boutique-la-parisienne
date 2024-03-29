import React from "react";
import { Badge, Navbar, Nav, Container } from "react-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector } from "react-redux";
import logo from "../assets/logo.png";

const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);
  console.log(cartItems);

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              <img src={logo} alt="Logo" width={70} height={70} />
              {/* <span className="ml-2">La Parisienne</span> */}
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto ps-3">
              <LinkContainer to={"/"}>
                <Nav.Link>Shop</Nav.Link>
              </LinkContainer>
              <LinkContainer to={"/contact"}>
                <Nav.Link>Contact</Nav.Link>
              </LinkContainer>
              <LinkContainer to={"/cart"}>
                <Nav.Link>
                  <FaShoppingCart />
                  {cartItems.length ? (
                    <Badge pill bg="danger">
                      {" "}
                      {cartItems.length}{" "}
                    </Badge>
                  ) : (
                    ""
                  )}
                  <span className="ms-2">Panier</span>
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to={"/login"}>
                <Nav.Link>
                  <FaUser />
                  <span className="ms-2">Se connecter</span>
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
