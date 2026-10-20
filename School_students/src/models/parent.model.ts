import { DataTypes, Model } from "sequelize";
import { ParentAttributes } from "../types/interfaces.js";
import sequelize from "../config/database.js";

export class Parent extends Model<ParentAttributes> {}

Parent.init(
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
    email: {
      type: DataTypes.STRING,
      field: "email",
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "phone",
    },
  },
  { sequelize, tableName: "parent", modelName: "Parent" },
);
