import { GraphQLError } from 'graphql/error';
import { GraphQLContext } from '../../types/graphql-context.type';

export const authResolvers = {
  Mutation: {
    login: async (_: any, args: { input: { email: string; password: string } }, ctx: GraphQLContext) => {
      const { email, password } = args.input;
      const jwtToken = await ctx.services.auth.login(email, password);

      if (!!jwtToken) {
        return { jwtToken };
      }

      return new GraphQLError('Invalid credentials', {
        extensions: {
          code: 'Unauthorized',
          http: { status: 401 },
        },
      });
    },

    register: async (
      _: any,
      args: { input: { email: string; password: string; role?: 'admin' | 'user' } },
      ctx: GraphQLContext,
    ) => {
      const { email, password, role } = args.input;
      return ctx.services.auth.register(email, password, role);
    },
  },
};
