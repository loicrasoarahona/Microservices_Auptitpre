import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import { initDB, insertInitialData } from "./config/init.js";
import "./config/env.js";
import { setupRelations } from "./models/setupRelations.js";
import StudentRoute from "./routes/student.route.js";
import AbsenceRoute from "./routes/absence.route.js";
import ClassLevelRoute from "./routes/class-level.route.js";
import AbsenceReasonStdRoute from "./routes/absence-reason-std.route.js";
import { UndefinedQueryParameterError } from "./util/request-param.util.js";
import { EntityNotFoundError } from "./error/entity-not-found.error.js";

async function main() {
  try {
    const PORT = process.env.PORT || 3000;
    const app = express();
    app.use(cors());
    app.use(express.json());

    await initDB();
    setupRelations();
    await insertInitialData();

    app.get("/", (req, res) => {
      res.json({
        message: "API OK",
      });
    });

    app.get("/hello", (req, res) => {
      res.send("Hello, world !!");
    });

    app.use("/students", StudentRoute);
    app.use("/absences", AbsenceRoute);
    app.use("/class-levels", ClassLevelRoute);
    app.use("/absence-reason-stds", AbsenceReasonStdRoute);

    // gestion d'erreurs http
    app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
      console.error(err);
      if (err instanceof UndefinedQueryParameterError) {
        return res.status(400).json({ error: err.message });
      }
      if (err instanceof EntityNotFoundError) {
        return res.status(404).json({ error: err.message });
      }
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
