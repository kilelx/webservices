import bcrypt from 'bcryptjs';
import { User } from '../types/user.type';
import * as userService from './users.service';
import { sign } from '../utils/jwt.utils';
import { RoleType } from '../types/role.type';
import { UserModel } from '../models/user-schema.model';

export const login = async (email: string, password: string): Promise<string> => {
  const user: User | undefined = await userService.getUserByEmail(email);

  if (!user) throw new Error();

  const isAuthenticated = await bcrypt.compare(password, user.passwordHash);

  if (!isAuthenticated) throw new Error('Invalid credentials');

  const token = sign({ id: user.id, role: user.role, email: user.email }, '2h');

  return token;
};

export const register = async (
  email: string,
  password: string,
  role?: RoleType,
): Promise<Omit<User, 'passwordHash'>> => {
  // Vérifier si mail pas déjà utilisé
  const user = await UserModel.findOne({ email: email });
  if (user) throw new Error('error');

  // Hasher le password
  const salt: number = Number(process.env.PASSWORD_SALT) ?? 10;
  const passwordHash = await bcrypt.hash(password, salt);

  // Créer user
  const newUser = await UserModel.create({
    email,
    passwordHash,
    role: role ?? 'user',
  });

  const { passwordHash: _, ...userWithoutPassword } = newUser.toJSON() as unknown as User;
  return userWithoutPassword;
};
