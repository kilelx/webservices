import bcrypt from 'bcryptjs';
import { User } from '../types/user.type';
import * as userService from './users.service';
import { sign } from '../utils/jwt.utils';
import path from 'path';
import fs from 'fs';
import { Role, RoleType } from '../types/role.type';
import { writeJsonFile } from '../utils/writeJsonFile';
import { JSON_FILE_USERS } from '../constants/JSON_FILE';

const file: string = path.resolve('src/data/users.seed.json');
const data: string = fs.readFileSync(file, 'utf-8');
const users: User[] = JSON.parse(data) as User[];

export const login = async (email: string, password: string): Promise<string> => {
  const user: User | undefined = await userService.getUserByEmail(email);

  if (!user) throw new Error();

  // //   Register d'un user: on hashe le mot de passe puis on le store
  // const salt: number = Number(process.env.PASSWORD_SALT) ?? 10
  // const hashedPassword = await bcrypt.hash(password, salt);

  const isAuthenticated = await bcrypt.compare(password, user.passwordHash);

  if (!isAuthenticated) throw new Error('Invalid credentials');

  const token = sign({ id: user.id, role: user.role, email: user.email }, '2h');

  return token;
};

export const register = async (
  email: string,
  password: string,
  role?: RoleType
): Promise<Omit<User, 'passwordHash'>> => {
  // Vérifier si mail pas déjà utilisé
  const index = users.findIndex((user) => user.email === email);
  if (index !== -1) throw new Error('error');

  // Hasher le password
  const salt: number = Number(process.env.PASSWORD_SALT) ?? 10;
  const passwordHash = await bcrypt.hash(password, salt);

  // Créer user
  const newUser: Omit<User, 'passwordHash'> = {
    id: Math.floor(Math.random() * 10000000).toString(),
    email,
    role: role ?? Role.user,
  };

  users.push({
    passwordHash,
    ...newUser,
  });
  console.log(users)
  writeJsonFile(JSON_FILE_USERS, users);

  return newUser;
};
