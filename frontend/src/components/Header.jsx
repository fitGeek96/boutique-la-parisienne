import React from "react";
import { useNavigate } from "react-router-dom";
import { Badge, Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { TiGroup } from "react-icons/ti";
import { TbTruckDelivery } from "react-icons/tb";
import { HiShoppingBag } from "react-icons/hi2";
import { CgLogOut } from "react-icons/cg";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";
import logo from "../assets/logo.png";
import { toast } from "react-toastify";
import SearchBox from "./SearchBox";

const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      toast.error(error?.data?.message || error?.error);
    }
  };

  return (
    <header>
      <Navbar
        expand="lg"
        collapseOnSelect
        className={
          userInfo?.isAdmin
            ? "bg-success"
            : "tw-bg-gradient-to-r tw-from-pink-500 tw-to-pink-200"
        }
      >
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand className="p-0 m-0 tw-text-red">
              <img src={logo} alt="Logo" width={70} height={70} />
            </Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle
            aria-controls="responsive-navbar-nav"
            className="text-white"
          />
          <Navbar.Collapse
            id="responsive-navbar-nav"
            className="mt-2 ms-2 fw-bold"
          >
            <Nav className="ms-auto text-white">
              {userInfo && !userInfo.isAdmin && (
                <>
                  <SearchBox />
                  <LinkContainer to="/" className="tw-flex tw-flex-row">
                    <Nav.Link>Shop</Nav.Link>
                  </LinkContainer>
                </>
              )}

              <LinkContainer to="/cart">
                <Nav.Link className="tw-flex tw-flex-row tw-gap-1">
                  <FaShoppingCart size={20} />
                  {cartItems.length > 0 && (
                    <>
                      <Badge
                        pill
                        bg="danger"
                        className="position-absolute start-300 translate-middle"
                      >
                        {cartItems.length}
                      </Badge>
                    </>
                  )}
                  <span>Panier</span>
                </Nav.Link>
              </LinkContainer>

              {userInfo ? (
                <NavDropdown title={userInfo.username}>
                  <LinkContainer to="/profile">
                    <NavDropdown.Item className="tw-flex tw-flex-row tw-gap-1">
                      <FaUser className="me-2" /> Profile
                    </NavDropdown.Item>
                  </LinkContainer>
                  {userInfo.isAdmin && (
                    <>
                      <LinkContainer to="/admin/productlist/1">
                        <NavDropdown.Item className="tw-flex tw-flex-row tw-gap-1">
                          <HiShoppingBag className="me-2 align-middle" />
                          Articles
                        </NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/admin/orderlist">
                        <NavDropdown.Item className="tw-flex tw-flex-row tw-gap-1">
                          <TbTruckDelivery className="me-2 align-middle" />
                          Commandes
                        </NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/admin/userlist">
                        <NavDropdown.Item className="tw-flex tw-flex-row tw-gap-1">
                          <TiGroup className="me-2 align-middle" />
                          Les Clientes
                        </NavDropdown.Item>
                      </LinkContainer>
                    </>
                  )}
                  <LinkContainer to="/logout">
                    <NavDropdown.Item
                      onClick={logoutHandler}
                      className="tw-flex tw-flex-row tw-gap-1"
                    >
                      <CgLogOut />
                      Se déconnecter
                    </NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link className="tw-flex tw-flex-row tw-gap-1">
                    <FaUser />
                    <span>Se connecter</span>
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
