import { DataTypes, Model } from "sequelize";
import { StudentParentAttributes } from "../types/interfaces.js";
import sequelize from "../config/database.js";
import { Student } from "./student.model.js";
import { Parent } from "./parent.model.js";

export class StudentParent extends Model<StudentParentAttributes> {}

StudentParent.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "id",
    },
    studentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Student,
        key: "id",
      },
      field: "student_id",
    },
    parentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Parent,
        key: "id",
      },
      field: "parent_id",
    },
  },
  { sequelize, tableName: "student_parent", modelName: "StudentParent" },
);
