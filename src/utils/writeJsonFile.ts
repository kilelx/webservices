import path from 'path';
import fs from 'fs';

export const writeJsonFile = async (fileUrl: string, data: unknown): Promise<boolean> => {
  const file: string = path.resolve(fileUrl);
  try {
    fs.writeFileSync(file, JSON.stringify(data));
    console.log('okk')
  } catch (e: unknown) {
    console.log('pas okk', e)
    return false;
  }
  return true;
};