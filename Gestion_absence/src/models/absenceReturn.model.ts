import { DataTypes, Model } from "sequelize";
import { AbsenceReturnAttributes } from "../types/interfaces.js";
import sequelize from "../config/database.js";
import { Absence } from "./absence.model.js";

export class AbsenceReturn extends Model<AbsenceReturnAttributes> {}

AbsenceReturn.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "id",
    },
    absenceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      references: {
        model: Absence,
        key: "id",
      },
      field: "absence_id",
    },
    returnDate: {
      type: DataTypes.DATE,
      allowNull: false,
      field: "return_date",
    },
  },
  { sequelize, tableName: "absence_return", modelName: "AbsenceReturn" },
);
