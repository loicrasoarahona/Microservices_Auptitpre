import { DataTypes, Model } from "sequelize";
import { AbsenceAttributes } from "../types/interfaces.js";
import sequelize from "../config/database.js";
import { AbsenceReasonStd } from "./absenceReasonStd.model.js";

export class Absence extends Model<AbsenceAttributes> {}

Absence.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "id",
    },
    absenceDate: {
      type: DataTypes.DATE,
      allowNull: false,
      field: "absence_date",
    },
    studentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "student_id",
    },
    studentName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "student_name",
    },
    studentSurname: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "student_surname",
    },
    studentClass: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "student_class",
    },
    reasonStdId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: AbsenceReasonStd,
        key: "id",
      },
      field: "reason_std_id",
    },
    reasonDetail: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: "reason_detail",
    },
    absenceReturnId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      unique: true,
      references: {
        // référencé par nom de table (et non par import du modèle AbsenceReturn)
        // pour éviter un import circulaire entre absence.model.ts et absenceReturn.model.ts
        model: "absence_return",
        key: "id",
      },
      field: "absence_return_id",
    },
  },
  { sequelize, tableName: "absence", modelName: "Absence" },
);
