import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { logoutUserAction } from "../redux/actions/authenticateActions";
import {
  REMOVE_ALL_CART_LIST_PRODUCT,
  TOTAL_CART_LIST_PRICE,
} from "../redux/actions";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import "./styles.constant.scss";

function Navigation() {
  const cartList = useSelector((state) => state.cartlist);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => {
    return state.userReducer;
  });

  function isUserLoggedIn() {
    if (userDetails && userDetails.response) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }

  const logoutHandler = () => {
    dispatch(logoutUserAction());
    dispatch({ type: REMOVE_ALL_CART_LIST_PRODUCT });
    dispatch({ type: TOTAL_CART_LIST_PRICE });
    navigate("/");
  };

  useEffect(() => {
    isUserLoggedIn();
  }, [userDetails]);
  let count = cartList.count;

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="secondary"
      variant="secondary"
      fixed="top"
      className="navbar-container"
    >
      <Container fluid className="nav-container">
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          className="mx-2 navbar-toggle"
        />
        <Navbar.Brand className=" me-auto navbar-brand">
          <Link to="/" className=" nav-brand ">
            Shopping Mart
          </Link>
        </Navbar.Brand>
        <Nav className="d-sm-block d-md-block d-lg-none d-xl-none">
          <Link aria-label="Cart-icon" to="/cart" className=" cart-nav">
            <i className="fa fa-cart-plus fa-2x"></i>{" "}
            <span className="badge badge-warning" id="labelCartCount">
              {" "}
              {count ? count : ""}{" "}
            </span>
          </Link>
        </Nav>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>

          <Nav className=" d-none d-sm-none d-md-none d-lg-block d-xl-block">
            <Link to="/cart" className=" text-light cart-nav">
              <i className="fa fa-cart-plus fa-2x"></i>{" "}
              <span className="badge badge-warning" id="labelCartCount">
                {" "}
                {count ? count : ""}{" "}
              </span>
            </Link>
          </Nav>
          <Nav className="nav-title-login ">
            {isLoggedIn ? (
              <button
                onClick={logoutHandler}
                data-testid="logoutHandle"
                className="btn btn-outline-warning btn-lg navbar-logbutton mx-lg-3"
                aria-roledescription="logout button"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className=" btn btn-outline btn-lg navbar-login mx-lg-3"
                data-testid="loginHandle"
              >
                Login
              </Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
