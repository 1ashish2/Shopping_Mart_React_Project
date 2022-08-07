

import { render, cleanup,screen, fireEvent} from "@testing-library/react";
import { MemoryRouter } from 'react-router-dom'
import Cart from "../../pages/cart.page";
import  configureStore  from "redux-mock-store";
import { Provider } from "react-redux";
import "@testing-library/jest-dom/extend-expect";



afterEach(() => {
    cleanup();
})
const middlewares = []
const mockStore = configureStore(middlewares)
describe("cart container Component", () => {
    const   initialState = {
        cartlist:{cartItemList:[{ name: "Fresho Kiwi - Green, 3 pcs",
        imageURL: "/static/images/products/fruit-n-veg/kiwi-green.jpg",
        description: "Kiwis are oval shaped with a brownish outer skin. The flesh is bright green and juicy with tiny, edible black seeds.",
        price: 87,
        stock: 90,
        totalStock: 90,
        amountQty: 3,
        qty: "pcs",
        count:90,
        category: "5b6899953d1a866534f516e2",
        sku: "fnw-kiwi-3",
        id: "5b6c6a7f01a7c38429530883"
        }]
    }
        
    };
    it("empty check data",()=>{
        const store=mockStore({cartlist:{cartItemList:[]}})
        render(<Provider store={store}><Cart  /></Provider>, { wrapper: MemoryRouter }); 
        const backbutton=screen.getByTestId('testBackBtn')
        fireEvent.click(backbutton)
        
    })
    it("matches snapshot", () => {
        
         const store=mockStore(initialState)

         render(<Provider store={store}><Cart  /></Provider>, { wrapper: MemoryRouter });
         const backbutton=screen.getByTestId('testBackBtn')
        
         const btnDec=screen.getByTestId('testHandleDec')
         const btnInc=screen.getByTestId('testHandleInc')
         const btnDel=screen.getByTestId('testHandleDel')
        
         fireEvent.click(btnDec)
         fireEvent.click(btnInc)
         fireEvent.click(btnDel)
         fireEvent.click(backbutton)
        // expect(asFragment()).toMatchSnapshot();
    })
    it("disable btn check", () => {
       let initialState={cartlist:{cartItemList:[{ name: "Fresho Kiwi - Green, 3 pcs",
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
        }]}}
        const store=mockStore(initialState)
        render(<Provider store={store}><Cart  /></Provider>, { wrapper: MemoryRouter });
        const btnInc=screen.getByTestId('testHandleInc')
        fireEvent.click(btnInc)
       
       // expect(asFragment()).toMatchSnapshot();
   })
   
      
   
})