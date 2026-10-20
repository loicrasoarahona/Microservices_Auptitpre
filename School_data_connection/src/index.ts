import express, { NextFunction, Request, Response } from "express";
import "./config/env.js";
import studentRoute from "./routes/student.route.js";
import classLevelRoute from "./routes/class-level.route.js";
import { EntityNotFoundError } from "./errors/entity-not-found.error.js";

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "API OK",
  });
});

app.use("/students", studentRoute);
app.use("/class-levels", classLevelRoute);

// gestion d'erreurs http
app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error(err);

  if (err instanceof EntityNotFoundError) {
    return res.status(404).json({ error: err.message });
  }
  return res.status(500).json({ error: "Une erreur s'est produite" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
