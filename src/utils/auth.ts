import { genSalt, hash, compare } from 'bcryptjs';

export const encryptPassword = async (password: string): Promise<string> => {
  const salt = await genSalt(10);
  const hashedPassword = await hash(password, salt);
  return hashedPassword;
};

export const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  return await compare(password, hashedPassword);
};
