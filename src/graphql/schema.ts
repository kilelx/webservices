import { productsSchema } from "./features/products/products.schema";
import { authSchema } from "./features/auth/auth.schema";

const typeDefsSchema = `
type Query
type Mutation
`

export const typeDefs = [typeDefsSchema, productsSchema, authSchema]