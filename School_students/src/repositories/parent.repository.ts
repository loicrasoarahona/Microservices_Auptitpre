import { Parent } from "../models/parent.model.js";
import { Student } from "../models/student.model.js";
import { ParentAttributes } from "../types/interfaces.js";

export class ParentRepository {
  public static async findByStudent(
    studentId: number,
  ): Promise<ParentAttributes[]> {
    const result = await Parent.findAll({
      include: [
        {
          model: Student,
          as: "students",
          where: {
            id: studentId,
          },
        },
      ],
    });

    return result.map((el) => el.dataValues);
  }
}
