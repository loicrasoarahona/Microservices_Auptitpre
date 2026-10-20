import { ClassLevel } from "../models/class_level.model.js";
import { ClassLevelAttributes } from "../types/interfaces.js";

export class ClassLevelRepository {
  public static async findAll(): Promise<ClassLevelAttributes[]> {
    return (await ClassLevel.findAll()).map((el) => el.dataValues);
  }
}
