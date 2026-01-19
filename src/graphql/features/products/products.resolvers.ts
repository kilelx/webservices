import { GraphQLContext } from "../../types/graphql-context.type";

export const productsResolvers = {
    Query: {
        products: (_: any, args: any, ctx: GraphQLContext) => {
            ctx.services.products.getAllProducts({})
            ctx.services.products.getProductById(),
        },
        // product..
    },

    Mutation: {
        // createProduct,
        // updateProduct,
        // deleteProduct
    }
};