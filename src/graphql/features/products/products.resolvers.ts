import { Product } from '../../../types/product.type';
import { GraphQLContext } from '../../types/graphql-context.type';

export const productsResolvers = {
  Query: {
    products: (_: any, _args: any, ctx: GraphQLContext) => {
      return ctx.services.products.getAllProducts({});
    },
    product: (_: any, args: { id: string }, ctx: GraphQLContext) => {
      console.log('HELLO ON PASSE ICI', args);
      return ctx.services.products.getProductById(args.id);
    },
  },

  Mutation: {
    createProduct: async (_: any, args: { input: any }, ctx: GraphQLContext) => {
      const result = await ctx.services.products.createProduct(args.input);
      if (!result) throw new Error('Failed to create product');
      return result.newProduct;
    },
    updateProduct: async (_: any, args: { id: string; input: Partial<Product> }, ctx: GraphQLContext) => {
      return ctx.services.products.updateProduct(args.id, args.input);
    },
    deleteProduct: async (_: any, args: { id: string }, ctx: GraphQLContext) => {
      return ctx.services.products.deleteProduct(args.id);
    },
  },
};
