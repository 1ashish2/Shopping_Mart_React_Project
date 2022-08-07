import React from "react";
import { Modal, Button, Alert } from "react-bootstrap";
import PropTypes from "prop-types";

function ModalBox({
  title = "Alert",
  buttonVariant = "secondary",
  alertVariant = "danger",
  footerButton = "Close",
  alertMsg = "Alert",
  show = false,
  handleClose,
  handleFooterButton,
  msg,
}) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center">
        <Alert variant={alertVariant}>{alertMsg}</Alert>
        {msg && <p>{msg}</p>}
      </Modal.Body>
      <Modal.Footer>
        <Button variant={buttonVariant} onClick={handleFooterButton}>
          {footerButton}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

ModalBox.propTypes = {
  title: PropTypes.string,
  buttonVariant: PropTypes.string,
  alertVariant: PropTypes.string,
  alertMsg: PropTypes.string,
  footerButton: PropTypes.string,
  show: PropTypes.bool,
};
export default ModalBox;
