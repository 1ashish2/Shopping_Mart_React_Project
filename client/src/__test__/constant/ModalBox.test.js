

import { render, cleanup } from "@testing-library/react";
import { MemoryRouter } from 'react-router-dom'
import ModalBox from "../../constant/ModalBox.constant";



afterEach(() => {
    cleanup();
})

describe("Modalbox container Component", () => {
   
    render(<ModalBox  />, { wrapper: MemoryRouter });
    it("matches snapshot", () => {
        const { asFragment } =  render(<ModalBox  />, { wrapper: MemoryRouter });

        expect(asFragment()).toMatchSnapshot();
    })
    
    
    
   
})