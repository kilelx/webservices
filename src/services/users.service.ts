import path from "path";
import { User } from "../types/user.type";
import { parseJsonFile } from "../utils/parseJsonFile";

const USER_SEED_FILE = path.resolve("src/data/users.seed.json")

export const getUserByEmail = async (email: string): Promise<User | undefined> => {
    const users: User[] = await parseJsonFile<User[]>(USER_SEED_FILE);
    return users.find((u: User) => u.email.toLowerCase() === email.toLowerCase())
}