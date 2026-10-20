import { Request, Response } from "express";
import { Student } from "../models/student.model.js";
import { Parent } from "../models/parent.model.js";

export async function findStudentById(req: Request, res: Response) {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    return res.status(400).json({ message: "id doit être un nombre" });
  }

  const student = await Student.findByPk(id, {
    include: [{ model: Parent, as: "parents" }],
  });

  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }

  return res.json(student);
}
