import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FormContainer from "../../constant/FormContainer.constant";
import { useDispatch } from "react-redux";
import { loginUserAction } from "../../redux/actions/authenticateActions";

const Login = () => {
  const dispatch = useDispatch();

  const submitHandler = (event) => {
    event.preventDefault();
    let email = event.target.email.value;
    let password = event.target.password.value;

    dispatch(loginUserAction({ email, password }));
  };

  return (
    <>
      <FormContainer>
        <h1>Sign In</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group className="my-2">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter email"
              required
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Enter password"
              required
            ></Form.Control>
          </Form.Group>
          <Button
            data-testid="button"
            type="submit"
            className="my-2"
            variant="primary"
          >
            Sign In
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default Login;
