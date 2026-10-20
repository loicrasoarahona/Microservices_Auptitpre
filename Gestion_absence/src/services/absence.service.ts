import { Request } from "express";
import { AlertSentAttributes } from "../types/interfaces.js";

export interface AbsenceService {
  sendAlertByEmail(
    absenceId: number,
    request: Request,
    parentId?: number,
  ): Promise<AlertSentAttributes>;
  sendAlertByPhone(
    absenceId: number,
    request: Request,
    parentId?: number,
  ): Promise<AlertSentAttributes>;
  getAlertMessageModel(
    absenceId: number,
    alertType: "email" | "phone",
    request: Request,
    parentId?: number,
  ): Promise<string>;
}
