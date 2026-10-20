import express from "express";
import { AbsenceController } from "../controllers/absence.controller.js";

const router = express.Router();

router.get("/ongoing", AbsenceController.listOngoing);

router.post("/", AbsenceController.createAbsence);

router.post("/:id/send-alert", AbsenceController.sendAlert);

router.get("/:id/message-model", AbsenceController.getMessageModel);

router.get("/:id/last-alert-sent", AbsenceController.getLastAlertSent);

router.post("/:id/return", AbsenceController.createAbsenceReturn);

export default router;
