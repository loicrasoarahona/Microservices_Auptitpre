import { Op, WhereOptions } from "sequelize";
import { Student } from "../models/student.model.js";
import { ClassLevel } from "../models/class_level.model.js";
import { Parent } from "../models/parent.model.js";
import { StudentAttributes } from "../types/interfaces.js";

export interface FindAllStudentsOptions {
  page: number;
  limit: number;
  classLevelId?: number;
  name?: string;
}

export interface FindAllStudentsResult {
  members: StudentAttributes[];
  totalItems: number;
}

export class StudentRepository {
  public static async findAll({
    page,
    limit,
    classLevelId,
    name,
  }: FindAllStudentsOptions): Promise<FindAllStudentsResult> {
    const conditions: WhereOptions[] = [];

    if (classLevelId !== undefined) {
      conditions.push({ classLevelId });
    }

    if (name !== undefined) {
      conditions.push({
        [Op.or]: [
          { name: { [Op.iLike]: `%${name}%` } },
          { surname: { [Op.iLike]: `%${name}%` } },
        ],
      });
    }

    const { rows, count } = await Student.findAndCountAll({
      where: conditions.length ? { [Op.and]: conditions } : undefined,
      include: [
        { model: ClassLevel, as: "classLevel" },
        { model: Parent, as: "parents" },
      ],
      limit,
      offset: (page - 1) * limit,
      distinct: true,
    });

    return {
      members: rows.map((el) => el.dataValues),
      totalItems: count,
    };
  }
}
