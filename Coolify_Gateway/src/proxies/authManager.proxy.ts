import { createProxyMiddleware } from "http-proxy-middleware";
import "../config/env.js";

const AUTH_MANAGER_URL =
  process.env.AUTH_MANAGER_URL ?? "http://localhost:3002";

export const authManagerProxy = createProxyMiddleware({
  target: AUTH_MANAGER_URL,
  changeOrigin: true,
});
