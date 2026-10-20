import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import { initDB, insertInitialData } from "./config/init.js";
import "./config/env.js";
import { setupRelations } from "./models/setupRelations.js";
import StudentRoute from "./routes/student.route.js";
import classLevelRoute from "./routes/class-level.route.js";

async function main() {
  try {
    const PORT = process.env.PORT || 3000;
    const app = express();
    app.use(cors());
    app.use(express.json());

    await initDB();
    setupRelations();
    insertInitialData();

    app.get("/", (req, res) => {
      res.json({
        message: "API OK",
      });
    });

    app.get("/hello", (req, res) => {
      res.send("Hello, world !!");
    });

    app.use("/students", StudentRoute);
    app.use("/class-levels", classLevelRoute);

    // gestion d'erreurs http
    app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
      console.error(err);

      return res.status(500).json({ error: "Une erreur s'est produite" });
    });

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
}

main();
