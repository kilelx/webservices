import path from 'path';
import fs from 'fs';

export const parseJsonFile = async <T>(filePath: string) => {
  const file: string = path.resolve(filePath);
  const data: string = fs.readFileSync(file, 'utf8');
  return JSON.parse(data) as T;
};
