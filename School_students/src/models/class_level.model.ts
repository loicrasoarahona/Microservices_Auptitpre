import { DataTypes, Model } from "sequelize";
import { ClassLevelAttributes } from "../types/interfaces.js";
import sequelize from "../config/database.js";

export class ClassLevel extends Model<ClassLevelAttributes> {}

ClassLevel.init(
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
  },
  { sequelize, tableName: "class_level", modelName: "ClassLevel" },
);
