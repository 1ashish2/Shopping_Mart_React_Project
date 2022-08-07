import { createSlice } from "@reduxjs/toolkit";

const products = createSlice({
    name: 'singleProducts',
    initialState:{},
    reducers: {
       
        getSingleProductSlice: (state, action) => {
            state = action.payload
            return state
        },
        
    }
})
export const {  getSingleProductSlice } = products.actions
export default products.reducer