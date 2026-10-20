import { existsSync, readFileSync } from "node:fs";
import jwt from "jsonwebtoken";
import "./env.js";

const PUBLIC_KEY_PATH = process.env.JWT_PUBLIC_KEY_PATH ?? "keys/public.key";
const ALGORITHM = "RS256";

if (!existsSync(PUBLIC_KEY_PATH)) {
  throw new Error(
    `Clé publique JWT introuvable (${PUBLIC_KEY_PATH}). ` +
      "La gateway ne signe jamais de token, elle doit recevoir la clé publique générée par Auth_Manager.",
  );
}

const publicKey = readFileSync(PUBLIC_KEY_PATH, "utf8");

export interface JwtPayload {
  sub: number;
  email: string;
  roles: string[];
}

export function verifyToken(token: string): JwtPayload {
  return jwt.verify(token, publicKey, {
    algorithms: [ALGORITHM],
  }) as unknown as JwtPayload;
}
