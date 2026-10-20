import { DataTypes, Model } from "sequelize";
import { StudentAttributes } from "../types/interfaces.js";
import sequelize from "../config/database.js";
import { ClassLevel } from "./class_level.model.js";

export class Student extends Model<StudentAttributes> {}

Student.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "id",
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "name",
    },
    surname: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "surname",
    },
    classLevelId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: ClassLevel,
        key: "id",
      },
      field: "class_level_id",
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "address",
    },
  },
  { sequelize, tableName: "student", modelName: "Student" },
);
