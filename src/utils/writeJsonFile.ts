import path from 'path';
import fs from 'fs';
import { JSON_FILE_URL } from '../constants/JSON_FILE';

export const writeJsonFile = async (data: unknown): Promise<boolean> => {
  const file: string = path.resolve(JSON_FILE_URL);
  try {
    fs.writeFileSync(file, JSON.stringify(data));
  } catch (e: unknown) {
    return false;
  }
  return true;
};