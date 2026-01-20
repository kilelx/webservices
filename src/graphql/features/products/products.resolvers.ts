import { GraphQLContext } from "../../types/graphql-context.type";

export const productsResolvers = {
    Query: {
        products: (_: any, _args: any, ctx: GraphQLContext) => {
            return ctx.services.products.getAllProducts({})
        }
        // product..
    },

    // Mutation: {
        // createProduct,
        // updateProduct,
        // deleteProduct
    // }
};