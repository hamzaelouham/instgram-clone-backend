import * as bcrypt from "bcrypt";

export const Hash = async (password: string, salt: number) => {
  return await bcrypt.hash(password, salt);
};

export const Compare = async (password: string, hashPassword: string) => {
  return bcrypt.compare(password, hashPassword);
};
