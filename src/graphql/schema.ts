import { productsSchema } from "./features/products/products.schema";

const typeDefsSchema = `
type Query
type Mutation
`

export const typeDefs = [typeDefsSchema, productsSchema]