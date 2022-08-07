import React from "react";
import { Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  DEC_CART_LIST_PRODUCT,
  INC_CART_LIST_PRODUCT,
  REMOVE_CART_LIST_PRODUCT,
  TOTAL_CART_LIST_PRICE,
} from "../redux/actions";
import "./styles.page.scss";
const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartList = useSelector((state) => state.cartlist);
  const cartListData = cartList.cartItemList;
  const handleDelete = (id) => {
    dispatch({ type: REMOVE_CART_LIST_PRODUCT, id });
    dispatch({ type: TOTAL_CART_LIST_PRICE });
  };
  const handleDec = (id) => {
    dispatch({ type: DEC_CART_LIST_PRODUCT, id });
    dispatch({ type: TOTAL_CART_LIST_PRICE });
  };
  const handleInc = (id) => {
    dispatch({ type: INC_CART_LIST_PRODUCT, id });
    dispatch({ type: TOTAL_CART_LIST_PRICE });
  };
  console.log("cart list in homepage", cartList);

  let addedItems =
    cartListData && cartListData.length > 0
      ? cartListData.map((item) => {
          return (
            <>
              <li className="collection-item avatar" key={item.id}>
                <div className="item-img">
                  <img src={item.imageURL} alt={item.name} className="" />
                </div>

                <div>
                  <span className="title">{item.name}</span>
                  <p className="title-description">{item.description}</p>
                  <p>
                    <b>Price: &#x20B9; {item.price}</b>
                  </p>
                  {/* <p>
                <b>Quantity: {item.count}</b>
              </p> */}
                  <div className="add-remove">
                    <Button
                      className="btn btn-warning"
                      size="sm"
                      aria-label="Decrease an item in cart"
                      data-testid="testHandleDec"
                      onClick={() => handleDec(item.id)}
                    >
                      <i className="fa fa-minus icon-style-s material-icons"></i>
                    </Button>
                    <span className="basketList-count cartList-count">
                      {item.count}
                    </span>
                    <Button
                      aria-label="Increase an item in cart"
                      className="btn btn-warning"
                      data-testid="testHandleInc"
                      size="sm"
                      disabled={item.count === item.totalStock ? true : false}
                      onClick={() => handleInc(item.id)}
                    >
                      <i className="fa fa-plus icon-style-p material-icons"></i>
                    </Button>
                  </div>
                  <button
                    aria-label="Remove item from cart"
                    className="btn navButton"
                    data-testid="testHandleDel"
                    onClick={() => {
                      handleDelete(item.id);
                    }}
                  >
                    Remove
                  </button>
                </div>
              </li>
              <hr />
            </>
          );
        })
      : "";

  return cartListData.length === 0 ? (
    <main className="cart-container">
      <button
        className="btn navButton"
        data-testid="testBackBtn"
        onClick={() => navigate(-1)}
      >
        Back
      </button>
      <div className="empty-text">
        <h2>Your Cart is Empty please Add product !!</h2>
      </div>
    </main>
  ) : (
    <main className="cart-container">
      <button
        className="btn navButton"
        data-testid="testBackBtn"
        onClick={() => navigate(-1)}
      >
        Back
      </button>
      <div className="cart">
        <div className="cartlist-head">
          <div>
            <strong className="text-center">Order Summary</strong>
          </div>
          <div className="cart-total">
            <strong>SubTotal:- </strong>
            <strong>&#x20B9;{cartList.total}</strong>
          </div>
        </div>
        <ul className="collection">{addedItems}</ul>
      </div>
    </main>
  );
};

export default Cart;
