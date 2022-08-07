import React from "react";
import { useEffect } from "react";
import { GET_PRODUCT_LISTS } from "../redux/actions";
import CardBox from "../constant/CardBox.constant";
import { Row, Container, Table, Image, Button, Stack } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {
  GET_CART_LIST_PRODUCT,
  REMOVE_CART_LIST_PRODUCT,
  INC_CART_LIST_PRODUCT,
  DEC_CART_LIST_PRODUCT,
  TOTAL_CART_LIST_PRICE,
} from "../redux/actions";
import { useNavigate } from "react-router-dom";
import "./styles.page.scss";
export default function ProductListPage() {
  // const navigate=useNavigate()
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let productListData = useSelector((state) => state.productlist);
  const cartList = useSelector((state) => state.cartlist);
  const userDetails = useSelector((state) => {
    return state.userReducer;
  });
  const cartListData = cartList.cartItemList;

  const handleDec = (id) => {
    dispatch({ type: DEC_CART_LIST_PRODUCT, id });
    dispatch({ type: TOTAL_CART_LIST_PRICE });
  };
  const handleInc = (id) => {
    dispatch({ type: INC_CART_LIST_PRODUCT, id });
    dispatch({ type: TOTAL_CART_LIST_PRICE });
  };
  const handleAddProduct = (data, val) => {
    if (parseInt(val)) {
      const detail = { ...data, input: parseInt(val) };
      if (userDetails && userDetails.response) {
        dispatch({ type: GET_CART_LIST_PRODUCT, detail });
        dispatch({ type: TOTAL_CART_LIST_PRICE });
      } else {
        navigate("/login");
      }
    }
  };
  const handleDelete = (id) => {
    dispatch({ type: REMOVE_CART_LIST_PRODUCT, id });
    dispatch({ type: TOTAL_CART_LIST_PRICE });
  };
  const handleMoveToCart = () => {
    navigate("/cart");
  };

  useEffect(() => {
    console.log("ProductListPage -> Get List of Products");
    dispatch({ type: GET_PRODUCT_LISTS });
  }, []);

  return (
    <main className="productList-container">
      <div className="product-page">
        {/* <Row className="mx-md-4"> */}
        {/* <Col md={9} sm={12}> */}
        {/* <Row my={2}> */}
        {productListData && productListData.length > 0
          ? productListData.map((item, i) => {
              item =
                cartListData.length > 0 &&
                cartListData.filter((el) => item.id === el.id).length > 0
                  ? cartListData.filter((el) => item.id === el.id)[0]
                  : item;
              return (
                // <Col md={3} key={i}>
                // <Col sm key={i}>
                <CardBox
                  key={item.id}
                  detail={item}
                  handleAddProduct={handleAddProduct}
                  handleDec={handleDec}
                  handleInc={handleInc}
                />
                // </Col>
              );
            })
          : ""}
        {/* </Row> */}
        {/* </Col> */}
      </div>

      <aside className="basketlist-page">
        <Row className="productlist-page-basket">
          {cartListData && cartListData.length > 0 ? (
            <div>
              <h2 className="mx-4">My Basket</h2>
              <Table>
                <tbody>
                  {cartListData.map((e) => {
                    return (
                      <tr key={e.id}>
                        <td>
                          {" "}
                          <Image
                            src={e.imageURL}
                            alt={e.name}
                            fluid={true}
                            className="image-size"
                          />
                        </td>
                        <td>
                          <Stack
                            direction="horizontal"
                            className="my-4"
                            gap={3}
                          >
                            <Button
                              className="btn btn-warning"
                              aria-label="Decrease an item in cart"
                              data-testid="testHandleDec"
                              onClick={() => handleDec(e.id)}
                            >
                              <i className="fa fa-minus icon-style-s material-icons"></i>
                            </Button>
                            {/* <input
                              className="basketList-count"
                              type="number"
                              name="quantity"
                              value={e.count}
                              disabled
                            /> */}
                            <span className="basketList-count">{e.count}</span>
                            <Button
                              aria-label="Increase an item in cart"
                              className="btn btn-warning"
                              data-testid="testHandleInc"
                              disabled={e.count === e.totalStock ? true : false}
                              onClick={() => handleInc(e.id)}
                            >
                              <i className="fa fa-plus icon-style-s material-icons"></i>
                            </Button>
                          </Stack>
                        </td>
                        <td>
                          <Stack direction="horizontal" className="my-4">
                            <button
                              className="remove-button"
                              aria-label="Remove item from cart"
                              onClick={() => handleDelete(e.id)}
                            >
                              <i
                                className="fa fa-trash fa-2x icon-style-d"
                                data-testid="testHandleDel"
                              ></i>
                            </button>
                          </Stack>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
              <Container>
                <Button
                  className="btn btn-secondary  mx-2 go-to-cart"
                  size="lg"
                  data-testid="testHandleGoToCart"
                  onClick={() => handleMoveToCart()}
                >
                  Go to Cart
                </Button>

                {/* </div> */}
              </Container>
            </div>
          ) : (
            <div className="my-5 basket-heading">
              <h2 className="mx-4">
                Products added to basket will appear here
              </h2>
            </div>
          )}
        </Row>
      </aside>
      {/* </Row> */}
    </main>
  );
}
