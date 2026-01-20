import { RoleType } from "../types/role.type";
import { User } from "../types/user.type";

export interface AuthServiceAPI {
    login: (email: string, password: string) => Promise<string>,
    register: (email: string, password: string, role?: RoleType) => Promise<Omit<User, 'passwordHash'>>,
}