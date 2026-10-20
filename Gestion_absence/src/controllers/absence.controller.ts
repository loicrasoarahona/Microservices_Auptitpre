import { Request, Response } from "express";
import { Absence } from "../models/absence.model.js";
import { AbsenceReturn } from "../models/absenceReturn.model.js";
import { AbsenceRepository } from "../repositories/absence.repository.js";
import { createAbsenceDto, createAbsenceReturnDto } from "../types/dto.js";
import { retrieveQueryParameter } from "../util/request-param.util.js";
import serviceLocatorCore from "../core/service-locator.core.js";

export class AbsenceController {
  public static async listOngoing(req: Request, res: Response) {
    try {
      const absences = await AbsenceRepository.findOngoing();
      res.json(absences);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Impossible de récupérer les absences en cours" });
    }
  }

  public static async listReasonsStd(req: Request, res: Response) {
    try {
      const reasons = await AbsenceRepository.findAllReasonsStd();
      res.json(reasons);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Impossible de récupérer les motifs d'absence" });
    }
  }

  public static async createAbsence(req: Request, res: Response) {
    const {
      absenceDate,
      studentId,
      studentName,
      studentSurname,
      studentClass,
      reasonStdId,
      reasonDetail,
    } = req.body as createAbsenceDto;

    if (!studentId || !studentName || !studentSurname || !studentClass) {
      res.status(400).json({ message: "Champs requis manquants" });
      return;
    }

    try {
      const absence = await Absence.create({
        absenceDate: absenceDate ? new Date(absenceDate) : new Date(),
        studentId,
        studentName,
        studentSurname,
        studentClass,
        reasonStdId,
        reasonDetail,
      });

      res.status(201).json(absence);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Impossible de créer l'absence" });
    }
  }

  public static async createAbsenceReturn(req: Request, res: Response) {
    const id = parseInt(req.params.id.toString());
    const { returnDate, reasonStdId, reasonDetail } =
      req.body as createAbsenceReturnDto;

    try {
      const absence = await AbsenceRepository.findById(id);
      if (!absence) {
        res.status(404).json({ message: "Absence non trouvée" });
        return;
      }

      const existingReturn = await AbsenceReturn.findOne({
        where: { absenceId: id },
      });
      if (existingReturn) {
        res.status(409).json({ message: "Cette absence a déjà un retour" });
        return;
      }

      const absenceReturn = await AbsenceReturn.create({
        absenceId: id,
        returnDate: returnDate ? new Date(returnDate) : new Date(),
      });

      await Absence.update(
        {
          absenceReturnId: absenceReturn.dataValues.id,
          ...(reasonStdId !== undefined && { reasonStdId }),
          ...(reasonDetail !== undefined && { reasonDetail }),
        },
        { where: { id } },
      );

      res.status(201).json(absenceReturn);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Impossible de créer le retour d'absence" });
    }
  }

  public static async getMessageModel(req: Request, res: Response) {
    const alertType = retrieveQueryParameter(
      req,
      "alertType",
      "string",
    ).toString();
    const id = parseInt(req.params.id.toString());
    const parentId = req.query.parentId
      ? Number(req.query.parentId)
      : undefined;
    if (alertType !== "email" && alertType !== "phone") {
      res.status(400).json({ message: "alertType inconnu" });
      return;
    }

    try {
      const message =
        await serviceLocatorCore.absenceService.getAlertMessageModel(
          id,
          alertType,
          req,
          parentId,
        );
      res.json({ message });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Impossible de générer le modèle de message" });
    }
  }

  public static async getLastAlertSent(req: Request, res: Response) {
    const alertType = retrieveQueryParameter(
      req,
      "alertType",
      "string",
    ).toString();
    const id = parseInt(req.params.id.toString());
    if (alertType !== "email" && alertType !== "phone") {
      res.status(400).json({ message: "alertType inconnu" });
      return;
    }

    try {
      const alertSent = await AbsenceRepository.findLastAlertSent(
        id,
        alertType,
      );
      res.json(alertSent);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Impossible de récupérer la dernière alerte" });
    }
  }

  public static async sendAlert(req: Request, res: Response) {
    const alertType = retrieveQueryParameter(req, "alertType", "string");
    const id = parseInt(req.params.id.toString());
    const parentId = req.query.parentId
      ? Number(req.query.parentId)
      : undefined;
    if (alertType == "email") {
      const alertSent = await serviceLocatorCore.absenceService.sendAlertByEmail(
        id,
        req,
        parentId,
      );
      return res.status(201).json(alertSent);
    }
    if (alertType == "phone") {
      const alertSent = await serviceLocatorCore.absenceService.sendAlertByPhone(
        id,
        req,
        parentId,
      );
      return res.status(201).json(alertSent);
    } else {
      throw "alert type not found";
    }
  }
}
