

import { render, cleanup } from "@testing-library/react";
import { MemoryRouter } from 'react-router-dom'
import Login from "../../pages/login.page";

jest.mock("react-redux", () => ({
    useSelector: jest.fn(),
    useDispatch: jest.fn(),
}));

afterEach(() => {
    cleanup();
})

describe("Message container Component", () => {
   
    render(<Login  />, { wrapper: MemoryRouter });
    it("matches snapshot", () => {
        const { asFragment } =  render(<Login  />, { wrapper: MemoryRouter });

        expect(asFragment()).toMatchSnapshot();
    })
    
    
    
   
})