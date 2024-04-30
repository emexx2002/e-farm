import { createApiClient } from "../utils/api";
import { paramsObjectToQueryString } from "../utils/functions";


export const ProductService = {
    getAllProducts :(payload:any) => createApiClient(false).get(`/products`),
    getBuyersProducts :(payload:any) => createApiClient(false).get(`/products/farmer${paramsObjectToQueryString(payload)}`),
    createProduct:(payload:any) => createApiClient(false).post("/products", payload),
    buyProduct: (payload:any) => createApiClient(false).patch('/products/user/buy', payload)
}