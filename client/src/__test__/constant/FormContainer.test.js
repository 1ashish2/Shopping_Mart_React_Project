

import { render, cleanup } from "@testing-library/react";
import FormContainer from "../../constant/FormContainer.constant";
import { MemoryRouter } from 'react-router-dom'



afterEach(() => {
    cleanup();
})

describe("form container Component", () => {
   
    render(<FormContainer  />, { wrapper: MemoryRouter });
    it("matches snapshot", () => {
        const { asFragment } =  render(<FormContainer  />, { wrapper: MemoryRouter });

        expect(asFragment()).toMatchSnapshot();
    })
    
    
    
   
})