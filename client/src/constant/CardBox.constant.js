import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./styles.constant.scss";
import { useState, useEffect } from "react";
import ModalBox from "./ModalBox.constant";

const CardBox = ({ detail, handleAddProduct }) => {
  const {
    name,
    imageURL,
    price,
    id,
    totalStock,
    amountQty,
    qty,
    count = 0,
  } = detail;
  const [msg, setMsg] = useState("");
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("Available Products Alert!!");
  const [message, setMessage] = useState("");
  const [intVal, setInVal] = useState(0);

  useEffect(() => {
    count ? setInVal(count) : setInVal(0);
  }, [count]);

  const handleChangeInput = (e) => {
    setInVal(e.target.value);
  };

  const handleClick = () => {
    let messages = `Available stock is ${totalStock}`;
    if (intVal > totalStock) {
      setShow(true);
      setMsg(messages);
      setMessage("Please enter quantity less than available stock");
    } else if (intVal <= 0) {
      setShow(true);
      setTitle("Enter Valid Input");
      setMsg("Enter Quantity more than 0");
    } else {
      setShow(false);
      handleAddProduct(detail, intVal);
    }
  };
  const handleClose = () => setShow(false);

  const handleFooterButton = () => {
    setShow(false);
  };

  return (
    <Card className="cart-main">
      <Link to="/productDetail" state={id}>
        <Card.Img
          variant="top"
          className="cardbox-image"
          src={imageURL}
          alt={name}
        />
      </Link>
      <Card.Body>
        <Link
          to="/productDetail"
          className="text-dark link-cart-title"
          state={id}
        >
          <Card.Title className="cart-title">
            <strong>{name}</strong>
          </Card.Title>
        </Link>
        <div className="cardBoxPrice-container">
          <span className="cardBox-price">
            <strong>&#x20B9;{price}</strong>&#x2f;{amountQty}
            {qty}
          </span>
          {/* <span className="cardBox-price">
            Per {amountQty} {qty}
          </span> */}
          <div className="card-box-input-button">
            <input
              className="card-box-input-field"
              type="number"
              min="0"
              max={totalStock}
              value={intVal}
              aria-label="number of quantity"
              data-testid="input"
              onChange={(e) => handleChangeInput(e)}
            />
            <div>
              <button
                data-testid="button"
                className="btn cardbox-btn"
                onClick={() => handleClick()}
              >
                Add
              </button>
            </div>
          </div>
          <div>
            {msg ? (
              <ModalBox
                title={title}
                show={show}
                handleClose={handleClose}
                alertMsg={msg}
                msg={message}
                handleFooterButton={handleFooterButton}
              />
            ) : (
              ""
            )}
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default CardBox;
