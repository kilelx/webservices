import { Request } from 'express';
import * as ProductsService from '../services/products.service';
import * as AuthService from '../services/auth.service';
import { ProductsServiceAPI } from './products-service-api.interface';
import { AuthServiceAPI } from './auth-service-api.interface';
import { User } from '../types/user.type';
import { verify } from '../utils/jwt.utils';
import { getUserByEmail } from '../services/users.service';

const parseBearerToken = (req: Request): string | null => {

  const authHeader = req.headers['authorization'];

  if (!authHeader) return null;

  const token = authHeader;

  if (!token) return null;

  return token;
};

export const buildContext = async (req: Request) => {
  let user: User | undefined = undefined;

  const token: string | null = parseBearerToken(req);

  if (token) {
    const { email } = verify(token);
    user = await getUserByEmail(email)
  }

  return {
    req,
    user,
    services: {
      products: ProductsService satisfies ProductsServiceAPI,
      auth: AuthService satisfies AuthServiceAPI,
    },
  };
};
