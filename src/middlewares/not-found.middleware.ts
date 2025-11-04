import { NextFunction, Request, Response } from 'express';

export const NotFound = (_req: Request, res: Response, _next: NextFunction) =>
    // on retourne un statut 404, avec un message JSON 'Not found'
  res.status(404).json({ message: '404 not found' });
