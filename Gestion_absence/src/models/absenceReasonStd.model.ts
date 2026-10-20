import { DataTypes, Model } from "sequelize";
import { AbsenceReasonStdAttributes } from "../types/interfaces.js";
import sequelize from "../config/database.js";

export class AbsenceReasonStd extends Model<AbsenceReasonStdAttributes> {}

AbsenceReasonStd.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "id",
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: "name",
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: "description",
    },
  },
  {
    sequelize,
    tableName: "absence_reason_std",
    modelName: "AbsenceReasonStd",
  },
);
