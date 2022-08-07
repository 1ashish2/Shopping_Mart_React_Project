import {render, screen,cleanup} from '@testing-library/react'
import React from 'react'
import '@testing-library/jest-dom'
import App from '../App'
import {BrowserRouter, MemoryRouter} from 'react-router-dom'
import  configureStore  from "redux-mock-store";
import { Provider } from "react-redux";
import "@testing-library/jest-dom/extend-expect";



afterEach(() => {
    cleanup();
})
const middlewares = []
const mockStore = configureStore(middlewares)

describe("testing app.js",()=>{
  const initialState={
    userReducer:{response:{
      userId: "122",
      username: "Harshit"
  }},
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
  }]},
  }
    it('full app rendering/navigating', () => {
      const store=mockStore(initialState)
        render(<Provider store={store}><App  /></Provider>); 
       
        // const user = userEvent.setup()
      
        // // verify page content for default route
        // expect(screen.getByText(/you are home/i)).toBeInTheDocument()
      
        // // verify page content for expected route after navigating
        // await user.click(screen.getByText(/about/i))
        // expect(screen.getByText(/you are on the about page/i)).toBeInTheDocument()
      })
})