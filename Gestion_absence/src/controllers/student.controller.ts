import { Request, Response } from "express";
import serviceLocatorCore from "../core/service-locator.core.js";
import { AbsenceRepository } from "../repositories/absence.repository.js";
import { retrieveQueryParameter } from "../util/request-param.util.js";

export class StudentController {
  public static async findAll(req: Request, res: Response) {
    const { class_level, name } = req.query;

    try {
      const students = await serviceLocatorCore.studentClient.findAllUsers(
        {
          class_level: class_level ? Number(class_level) : undefined,
          name: name ? String(name) : undefined,
        },
        req,
      );

      res.json(students);
    } catch (error) {
      console.error(error);
      res.status(502).json({ message: "Impossible de récupérer les élèves" });
    }
  }

  public static async findAllPaginated(req: Request, res: Response) {
    const { class_level, name, page, limit } = req.query;

    try {
      const students =
        await serviceLocatorCore.studentClient.findAllUsersPaginated(
          {
            class_level: class_level ? Number(class_level) : undefined,
            name: name ? String(name) : undefined,
            page: page ? Number(page) : undefined,
            limit: limit ? Number(limit) : undefined,
          },
          req,
        );

      res.json(students);
    } catch (error) {
      console.error(error);
      res.status(502).json({ message: "Impossible de récupérer les élèves" });
    }
  }

  public static async findParents(req: Request, res: Response) {
    const id = req.params.id;
    if (typeof id != "string") throw "invalid format of id";
    const retour = await serviceLocatorCore.studentClient.findParents(
      parseInt(id),
      req,
    );
    res.json(retour);
  }

  public static async getAttendanceReport(req: Request, res: Response) {
    const studentId = parseInt(req.params.id.toString());
    const from = new Date(
      retrieveQueryParameter(req, "from", "string").toString(),
    );
    const to = new Date(retrieveQueryParameter(req, "to", "string").toString());

    try {
      const student = await serviceLocatorCore.studentClient.findById(
        studentId,
        req,
      );
      const absences = await AbsenceRepository.findByStudentAndPeriod(
        studentId,
        from,
        to,
      );

      const totalAbsences = absences.length;
      const justifiedCount = absences.filter(
        (absence) => absence.return != null,
      ).length;
      const unjustifiedCount = totalAbsences - justifiedCount;

      res.json({
        student: {
          id: studentId,
          name: student.name,
          surname: student.surname,
        },
        period: { from, to },
        totalAbsences,
        justifiedCount,
        unjustifiedCount,
        absences: absences.map((absence) => ({
          id: absence.id,
          absenceDate: absence.absenceDate,
          reasonStd: absence.reasonStd ?? null,
          reasonDetail: absence.reasonDetail ?? null,
          justified: absence.return != null,
          returnDate: absence.return?.returnDate ?? null,
          alerts: absence.alerts ?? [],
        })),
      });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Impossible de générer le bulletin d'assiduité" });
    }
  }
}
