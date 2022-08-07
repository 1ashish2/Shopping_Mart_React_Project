

import { render, cleanup, screen, fireEvent } from "@testing-library/react";
import ProductList from "../../pages/productList.page";
import { MemoryRouter } from 'react-router-dom'
import * as reactRedux from 'react-redux'
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import "@testing-library/jest-dom/extend-expect";

afterEach(() => {
    cleanup();
})
const middlewares = []
const mockStore = configureStore(middlewares)
describe("Navigation container Component", () => {
    let initialState = {
        productlist: [{
            name: "Fresho Kiwi - Green, 3 pcs",
            imageURL: "/static/images/products/fruit-n-veg/kiwi-green.jpg",
            description: "Kiwis are oval shaped with a brownish outer skin. The flesh is bright green and juicy with tiny, edible black seeds.",
            price: 87,
            stock: 90,
            totalStock: 90,
            amountQty: 3,
            qty: "pcs",
            count: 10,
            category: "5b6899953d1a866534f516e2",
            sku: "fnw-kiwi-3",
            id: "5b6c6a7f01a7c38429530883"
        }, {
            name: "Fresho Kiwi - Green, 3 pcs",
            imageURL: "/static/images/products/fruit-n-veg/kiwi-green.jpg",
            description: "Kiwis are oval shaped with a brownish outer skin. The flesh is bright green and juicy with tiny, edible black seeds.",
            price: 87,
            stock: 90,
            totalStock: 90,
            amountQty: 3,
            qty: "pcs",
            count: 10,
            category: "5b6899953d1a866534f516e2",
            sku: "fnw-kiwi-3",
            id: "5b6c6a7f01a7c38429530883"
        }],
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
        }]}


    }
    it("product list check empty", () => {
        let initialState={  productlist: [],
        cartlist:{cartItemList:[{ name: "Fresho Kiwi - Green, 3 pcs",
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
        }]}
}
        const store = mockStore(initialState)

        render(<Provider store={store}><ProductList /></Provider>, { wrapper: MemoryRouter });
    })
    it("product list check empty for carlist", () => {
        let initialState={  productlist: [],
        cartlist:{cartItemList:[]}
}
        const store = mockStore(initialState)

        render(<Provider store={store}><ProductList /></Provider>, { wrapper: MemoryRouter });
    })

    it("product list check", () => {
        const store = mockStore(initialState)

        render(<Provider store={store}><ProductList /></Provider>, { wrapper: MemoryRouter });
        const btnDec=screen.getByTestId('testHandleDec')
        const btnInc=screen.getByTestId('testHandleInc')
         const btnDel=screen.getByTestId('testHandleDel')
         const btnGoCart=screen.getByTestId('testHandleGoToCart')
         fireEvent.click(btnDec)
         fireEvent.click(btnInc)
         fireEvent.click(btnDel)
         fireEvent.click(btnGoCart)

    })
    it("product list check for  inc btn", () => {
        let initialState = {
            productlist: [{
                name: "Fresho Kiwi - Green, 3 pcs",
                imageURL: "/static/images/products/fruit-n-veg/kiwi-green.jpg",
                description: "Kiwis are oval shaped with a brownish outer skin. The flesh is bright green and juicy with tiny, edible black seeds.",
                price: 87,
                stock: 90,
                totalStock: 90,
                amountQty: 3,
                qty: "pcs",
                count: 10,
                category: "5b6899953d1a866534f516e2",
                sku: "fnw-kiwi-3",
                id: "5b6c6a7f01a7c38429530883"
            }, {
                name: "Fresho Kiwi - Green, 3 pcs",
                imageURL: "/static/images/products/fruit-n-veg/kiwi-green.jpg",
                description: "Kiwis are oval shaped with a brownish outer skin. The flesh is bright green and juicy with tiny, edible black seeds.",
                price: 87,
                stock: 90,
                totalStock: 90,
                amountQty: 3,
                qty: "pcs",
                count: 10,
                category: "5b6899953d1a866534f516e2",
                sku: "fnw-kiwi-3",
                id: "5b6c6a7f01a7c38429530883"
            }],
            cartlist:{cartItemList:[{ name: "Fresho Kiwi - Green, 3 pcs",
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
            }]}
    
    
        }
        const store = mockStore(initialState)

        render(<Provider store={store}><ProductList /></Provider>, { wrapper: MemoryRouter });
         const btnInc=screen.getByTestId('testHandleInc')
         fireEvent.click(btnInc)
        

    })
    it("product list check inc btn", () => {
        const store = mockStore(initialState)

        render(<Provider store={store}><ProductList /></Provider>, { wrapper: MemoryRouter });
         const btnInc=screen.getByTestId('testHandleInc')
        
         fireEvent.click(btnInc)
      
    })




})