import { User } from '../types/user.type';
import { UserModel } from '../models/user-schema.model';

export const getUserByEmail = async (email: string): Promise<User | undefined> => {
  const user = await UserModel.findOne({ email });

  if (!user) return undefined;

  return user.toJSON() as unknown as User;
};
