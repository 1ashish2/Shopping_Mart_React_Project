import React, { useEffect, useState } from "react";
import { Container, Image, Stack, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {
  GET_SINGLE_PRODUCT,
  GET_CART_LIST_PRODUCT,
  TOTAL_CART_LIST_PRICE,
} from "../redux/actions";
import { useLocation, useNavigate } from "react-router-dom";
import ModalBox from "../constant/ModalBox.constant";
import "./styles.page.scss";
function ProductDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.singleProductlist)[0];
  const userDetails = useSelector((state) => {
    return state.userReducer;
  });
  const cartList = useSelector((state) => state.cartlist);
  const [msg, setMsg] = useState("");
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("Available Products Alert!!");
  const [message, setMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState("danger");
  const [footerButton, setFooterButton] = useState("Close");

  const cartListData = cartList.cartItemList;

  const productListData =
    productList &&
    cartListData.length > 0 &&
    cartListData.filter((el) => productList.id === el.id).length > 0
      ? cartListData.filter((el) => productList.id === el.id)[0]
      : productList;
// console.log("product list data",productListData)
  const [intVal, setInVal] = useState(0);

  useEffect(() => {
    const id = location.state;
    dispatch({ type: GET_SINGLE_PRODUCT, id });
  }, [location.state, dispatch]);

  useEffect(() => {
    productListData && productListData.count
      ? setInVal(productListData.count)
      : setInVal(0);
  }, [productListData]);

  const handleChangeInput = (e) => {
    setInVal(e.target.value);
  };

  const handleAddProduct = (data, val) => {
    if (userDetails && userDetails.response) {
      // navigate("/cart");

      let messages = `Available stock is ${productListData.totalStock}`;
      if (intVal > productListData.totalStock) {
        setShow(true);
        setMsg(messages);
        setMessage("Please enter quantity less than available stock");
      } else if (intVal <= 0) {
        setShow(true);
        setTitle("Enter Valid Input");
        setMsg("Enter Quantity more than 0");
      } else {
        setShow(false);
        setMsg("");
        const detail = { ...data, input: parseInt(intVal) };
        dispatch({ type: GET_CART_LIST_PRODUCT, detail });
        dispatch({ type: TOTAL_CART_LIST_PRICE });
        setAlertVariant("success");
        setShow(true);
        setTitle("Added");
        setMsg(`${intVal} ${productListData.name} added to cart`);
        setFooterButton("Go to Cart");
        // navigate("/cart");
      }
      // if (intVal > productListData.totalStock) {
      //   setShow(true);
      //   setMsg(messages);
      // } else {
      //   setShow(false);
      //   setMsg("");
      //   const detail = { ...data, input: parseInt(intVal) };
      //   dispatch({ type: GET_CART_LIST_PRODUCT, detail });
      //   dispatch({ type: TOTAL_CART_LIST_PRICE });
      // }
    } else {
      navigate("/login");
    }
  };

  const handleClose = () => setShow(false);

  const handleFooterButton = () => {
    setShow(false);
    if (alertVariant === "success") navigate("/cart");
  };

  return (
    <Container fluid className="product-main ">
      {productListData ? (
        <Row className="productDetail-container">
          <Col className="product-img">
            <Image
              className="productImage"
              src={productListData.imageURL}
              alt={productListData.name}
              fluid={true}
            />
          </Col>
          <Col className="product-detail">
            <h2 className="product-title">{productListData.name}</h2>
            <div className="product-des">
              <p>{productListData.description}</p>
              <Row className="product-price">
                <Col className="price-padding">
                  <Stack direction="horizontal" gap={2}>
                    <span>
                      <strong>Price :-</strong>
                    </span>
                    <span>
                      <strong>&#x20B9;{productListData.price}</strong>
                    </span>
                  </Stack>
                </Col>
                <Col className="price-padding">
                  <Stack direction="horizontal" gap={2}>
                    <span>
                      <strong>Qty Available:-</strong>
                    </span>
                    <span>
                      <strong>{productListData.totalStock}</strong>
                    </span>
                  </Stack>
                </Col>
              </Row>
            </div>
            <div className="card-box-input-button">
              <input
                style={{ marginRight: "1rem", width: "5rem" }}
                type="number"
                min="1"
                value={intVal}
                data-testid="input"
                max={productListData.totalStock}
                aria-label="number of quantity"
                onChange={(e) => handleChangeInput(e)}
              />
              <button
                className="productDetailAdd-button btn"
                data-testid="addProduct"
                onClick={() => handleAddProduct(productListData)}
              >
                Add to Cart
              </button>
            </div>
          </Col>
          <Row>
            {msg ? (
              <ModalBox
                title={title}
                show={show}
                handleClose={handleClose}
                alertMsg={msg}
                msg={message}
                alertVariant={alertVariant}
                handleFooterButton={handleFooterButton}
                footerButton={footerButton}
              />
            ) : (
              ""
            )}
          </Row>
        </Row>
      ) : (
        <h1 className="text-center">Product not found please check!!</h1>
      )}
    </Container>
  );
}

export default ProductDetail;
