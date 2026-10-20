import { DataTypes, Model } from "sequelize";
import { AlertSentTypeAttributes } from "../types/interfaces.js";
import sequelize from "../config/database.js";

export class AlertSentType extends Model<AlertSentTypeAttributes> {}

AlertSentType.init(
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
  { sequelize, tableName: "alert_sent_type", modelName: "AlertSentType" },
);
