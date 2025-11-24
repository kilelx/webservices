import { NextFunction, Request, Response } from 'express';
import { verify } from '../utils/jwt.utils';
import { RoleType } from '../types/role.type';

export function auth(req: Request, res: Response, next: NextFunction) {
  const h = req.header('Authorization');

  console.log(h);

  if (!h?.startsWith('Bearer ')) throw res.status(401).json('Missing Bearer Token');
  try {
    (req as any).user = verify(h.slice(7));
    next();
  } catch {
    throw res.status(401).json('Invalid or expired token');
  }
}

export function authorize(...roles: RoleType[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;
    if (!user) throw res.status(401).json({error: 'Unauthorized'});

    if (roles.length && !roles.includes(user.role)) throw res.status(401).json({error: 'Insufficient role'});

    next();
  };
}
