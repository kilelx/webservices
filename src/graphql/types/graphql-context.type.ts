import { Request } from "express"
import { ProductsServiceAPI } from "../../interfaces/products-servicapi.interface";

export type GraphQLContext = {
    req: Request;
    services: {
        products: ProductsServiceAPI;
    }
}