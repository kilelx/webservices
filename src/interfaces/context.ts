import { Request } from "express";
import * as ProductsService from '../services/products.service'
import { ProductsServiceAPI } from "./products-servicapi.interface";

export const buildContext = (req: Request) => {
    return {
        req,
        services: {
            products: ProductsService satisfies ProductsServiceAPI
        }
    }
}