import { createProxyMiddleware } from "http-proxy-middleware";
import "../config/env.js";

const GESTION_ABSENCE_URL =
  process.env.GESTION_ABSENCE_URL ?? "http://localhost:3005";

export const gestionAbsenceProxy = createProxyMiddleware({
  target: GESTION_ABSENCE_URL,
  changeOrigin: true,
});
