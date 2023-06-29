import * as bcrypt from "bcrypt";
import { JwtPayload, sign, verify } from "jsonwebtoken";

export const Hash = async (password: string, salt: number) => {
  return await bcrypt.hash(password, salt);
};

export const Compare = async (password: string, hashPassword: string) => {
  return bcrypt.compare(password, hashPassword);
};

export function createToken(payload: string | Buffer | object) {
  return sign(payload, process.env.JWT_SECRET!, {
    expiresIn: "1d",
  });
}

export function verifyToken(token: string) {
  return verify(token, process.env.JWT_SECRET!);
}
