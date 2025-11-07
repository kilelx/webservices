import bcrypt from 'bcryptjs';
import { User } from '../types/user.type';
import * as userService from './users.service';

export const login = async (email: string, password: string): Promise<boolean> => {
  console.dir(email, password);

  const user: User | undefined = await userService.getUserByEmail(email);

  if (!user) return false;

//   Register d'un user: on hashe le mot de passe puis on le store
//   const salt: number = Number(process.env.PASSWORD_SALT) ?? 10
//   const hashedPassword = await bcrypt.hash(user.passwordHash, salt);

  return await bcrypt.compare(password, user.passwordHash);
};
