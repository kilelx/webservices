import { GraphQLError } from "graphql/error";
import { GraphQLContext } from "../types/graphql-context.type";
import { RoleType } from "../../types/role.type";

export const requireAdmin = (ctx: GraphQLContext, role: RoleType) => {

  if (!ctx.user || ctx.user.role !== role) {
    throw new GraphQLError('Insufficient permissions', {
      extensions: {
        code: 'Unauthorized',
        http: { status: 401 },
      },
    });
  }

  return true;
};