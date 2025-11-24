import { NextFunction, Request, Response } from 'express';
import * as authService from '../services/auth.service';

export async function login(req: Request, res: Response, _next: NextFunction) {
  const { email, password } = req.body ?? {};

  if (!email || !password) throw res.status(400).json({ message: 'Paramètres incorrects' });
  try {
    const jwtToken = await authService.login(email, password);

    return res.status(200).json({ jwtToken });
  } catch (e) {
    return res.status(401).json({ message: 'Invalide credentials' });
  }
}

export async function register(req: Request, res: Response, _next: NextFunction) {
  const { email, password, role } = req.body ?? {};

  if (!email || !password) throw res.status(400).json({ message: 'Paramètres incorrects' });

  try {
    const newUserCreated = await authService.register(email, password, role);

    if (newUserCreated) return res.status(201).json({ message: 'User created' });
    else return res.status(400).json({ message: 'Error bad request' });
  } catch (e) {
    return res.status(400).json({ message: 'Error bad request' });
  }
  // try {
  //   const jwtToken = await authService.login(email, password);

  //   return res.status(200).json({ jwtToken });
  // } catch (e) {
  //   return res.status(401).json({ message: 'Invalide credentials' });
  // }
}
