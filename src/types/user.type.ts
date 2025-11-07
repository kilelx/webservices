import { RoleType } from "./role.type";

export type User = {
    id: string;
    email: string;
    passwordHash: string;
    role: RoleType;
}