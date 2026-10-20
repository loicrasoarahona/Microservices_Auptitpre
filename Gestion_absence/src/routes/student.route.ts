import express from "express";
import serviceLocator from "../core/service-locator.core.js";
import { StudentController } from "../controllers/student.controller.js";

const router = express.Router();

router.get("/", StudentController.findAll);

router.get("/paginated", StudentController.findAllPaginated);

router.get("/:id/parents", StudentController.findParents);

router.get("/:id/attendance-report", StudentController.getAttendanceReport);

export default router;
