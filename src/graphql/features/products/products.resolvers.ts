import { Product } from '../../../types/product.type';
import { Role } from '../../../types/role.type';
import { GraphQLContext } from '../../types/graphql-context.type';
import { requireAuth } from '../../utils/require-auth.utils';
import { requireAdmin } from '../../utils/require-role.utils';

export const productsResolvers = {
  Query: {
    products: (_: any, _args: any, ctx: GraphQLContext) => {
      return ctx.services.products.getAllProducts({});
    },
    product: (_: any, args: { id: string }, ctx: GraphQLContext) => {
      return ctx.services.products.getProductById(args.id);
    },
  },

  Mutation: {
    createProduct: async (_: any, args: { input: any }, ctx: GraphQLContext) => {
      requireAuth(ctx);
      requireAdmin(ctx, Role.admin);
      const result = await ctx.services.products.createProduct(args.input);
      if (!result) throw new Error('Failed to create product');
      return result.newProduct;
    },
    updateProduct: async (_: any, args: { id: string; input: Partial<Product> }, ctx: GraphQLContext) => {
      requireAuth(ctx);
      requireAdmin(ctx, Role.admin);
      return ctx.services.products.updateProduct(args.id, args.input);
    },
    deleteProduct: async (_: any, args: { id: string }, ctx: GraphQLContext) => {
      requireAuth(ctx);
      requireAdmin(ctx, Role.admin);
      return ctx.services.products.deleteProduct(args.id);
    },
  },
};
