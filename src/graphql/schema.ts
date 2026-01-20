import { productsSchema } from "./features/products/products.schema";

const typeDefsSchema = `
type Query
`

export const typeDefs = [typeDefsSchema, productsSchema]