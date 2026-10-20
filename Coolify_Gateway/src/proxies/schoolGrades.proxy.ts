import { createProxyMiddleware } from "http-proxy-middleware";
import "../config/env.js";

const SCHOOL_GRADES_URL =
  process.env.SCHOOL_GRADES_URL ?? "http://localhost:3000";

export const schoolGradesProxy = createProxyMiddleware({
  target: SCHOOL_GRADES_URL,
  changeOrigin: true,
});
