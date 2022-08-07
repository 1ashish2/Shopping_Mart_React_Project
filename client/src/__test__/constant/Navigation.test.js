

import { render, cleanup,screen,fireEvent } from "@testing-library/react";
import { MemoryRouter } from 'react-router-dom'
import  configureStore  from "redux-mock-store";
import { Provider } from "react-redux";
import "@testing-library/jest-dom/extend-expect";
import Navigation from "../../constant/Navigation.constant";

afterEach(() => {
    cleanup();
})
const middlewares = []
const mockStore = configureStore(middlewares)
describe("Navigation container Component", () => {
   
    const initialState = {
        cartlist:{ name: "Fresho Kiwi - Green, 3 pcs",
        imageURL: "/static/images/products/fruit-n-veg/kiwi-green.jpg",
        description: "Kiwis are oval shaped with a brownish outer skin. The flesh is bright green and juicy with tiny, edible black seeds.",
        price: 87,
        stock: 90,
        totalStock: 90,
        amountQty: 3,
        qty: "pcs",
        count:10,
        category: "5b6899953d1a866534f516e2",
        sku: "fnw-kiwi-3",
        id: "5b6c6a7f01a7c38429530883"
    },
    userReducer:{response:{
        userId: "122",
        username: "Harshit"
    }}
        
    };
    it("navigation empty check data",()=>{
        const initialState={
            cartlist:{},
            userReducer:{response:{}}
        }
        const store=mockStore(initialState)
        render(<Provider store={store}><Navigation  /></Provider>, { wrapper: MemoryRouter }); 
        
    })
    
    it("navigation check data",()=>{
        const store=mockStore(initialState)
        render(<Provider store={store}><Navigation  /></Provider>, { wrapper: MemoryRouter }); 
        const logoutBtn=screen.getByTestId('logoutHandle')
        fireEvent.click(logoutBtn)
    })
   
})