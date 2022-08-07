import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../store";
// import ReactTestUtils from "react-dom/test-utils";

import Login from "../component/Login/Login.component";
describe.only("Button Component", () => {
  render(
    <Provider store={store}>
      <Login />
    </Provider>
  );
  const button = screen.getByTestId("button");

  // Test 1
  test("Button Rendering", () => {
    expect(button).toBeInTheDocument();
  });

  // Test 2
  test("Button Text", () => {
    expect(button).toHaveTextContent("Sign In");
  });

  it("Test the submit handler", () => {
    render(
      <Provider store={store}>
        <Login />
      </Provider>
    );
    const emailFieldValue = "harshit@gmail.com";
    const passwordFieldValue = "password1";

    fireEvent.change(screen.getByPlaceholderText(/Enter email/i), {
      target: { value: emailFieldValue },
    });
    fireEvent.change(screen.getByPlaceholderText(/Enter password/i), {
      target: { value: passwordFieldValue },
    });
    // ReactTestUtils.Simulate.click(
    //   screen.getByRole("button", {
    //     name: /Sign In/i,
    //   }),
    //   {
    //     key: "Enter",
    //     target: {
    //       email: {
    //         value: "harshit@gmail.com",
    //       },
    //       password: {
    //         value: "password1",
    //       },
    //     },
    //     preventDefault: () => {},
    //   }
    // );
    fireEvent.submit(
      screen.getByRole("button", {
        name: /Sign In/i,
      }),
      {
        target: {
          email: {
            value: "harshit@gmail.com",
          },
          password: {
            value: "password1",
          },
        },
      }
    );

    // expect(onSubmit).toBeCalled();
  });
});
