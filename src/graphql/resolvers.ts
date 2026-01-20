import { productsResolvers } from "./features/products/products.resolvers";
import { authResolvers } from "./features/auth/auth.resolvers";

export const resolvers = [productsResolvers, authResolvers]