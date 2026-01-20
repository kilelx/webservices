import { GraphQLError } from 'graphql/error';
import { GraphQLContext } from '../types/graphql-context.type';

export const requireAuth = (ctx: GraphQLContext) => {
  if (!ctx.user) {
    console.log('pas de user');
    throw new GraphQLError('You must be logged in', {
      extensions: {
        code: 'Unauthorized',
        http: { status: 401 },
      },
    });
  }

  return true;
};