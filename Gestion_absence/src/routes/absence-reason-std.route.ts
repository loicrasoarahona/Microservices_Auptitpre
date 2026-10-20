import express from "express";
import { AbsenceController } from "../controllers/absence.controller.js";

const router = express.Router();

router.get("/", AbsenceController.listReasonsStd);

export default router;
