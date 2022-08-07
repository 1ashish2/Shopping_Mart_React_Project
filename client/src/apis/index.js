import {get} from "./axios-request"

export const getProductListsAPI = async () => get('productlist')

export const getSingleProductAPI = async (id) => get(`productlist/${id}`)

