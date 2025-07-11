import type { SignOptions } from "jsonwebtoken";
import { sign, verify } from "jsonwebtoken";
import { env } from "@/env";

export interface JWTPayload {
  userId: string;
  email: string;
}

const DEFAULT_SIGN_OPTIONS: SignOptions = {
  expiresIn: "1d",
};

export function signJWT(
  payload: JWTPayload,
  options: SignOptions = DEFAULT_SIGN_OPTIONS
) {
  const secret = env.AUTH_SECRET;
  if (!secret) {
    throw new Error("JWT secret is not defined");
  }
  return sign(payload, secret, options);
}

export function verifyJWT(token: string) {
  const secret = env.AUTH_SECRET;
  if (!secret) {
    throw new Error("JWT secret is not defined");
  }
  return verify(token, secret) as JWTPayload;
} 