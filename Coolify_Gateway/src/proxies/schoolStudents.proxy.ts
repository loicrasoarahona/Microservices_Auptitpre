import { createProxyMiddleware } from "http-proxy-middleware";
import "../config/env.js";

const SCHOOL_STUDENTS_URL =
  process.env.SCHOOL_STUDENTS_URL ?? "http://localhost:3004";

export const schoolStudentsProxy = createProxyMiddleware({
  target: SCHOOL_STUDENTS_URL,
  changeOrigin: true,
});
