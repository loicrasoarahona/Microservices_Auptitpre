import { Absence } from "./absence.model.js";
import { AbsenceReasonStd } from "./absenceReasonStd.model.js";
import { AbsenceReturn } from "./absenceReturn.model.js";
import { AlertSent } from "./alertSent.model.js";
import { AlertSentType } from "./alertSentType.model.js";

export function setupRelations() {
  AbsenceToAbsenceReturnRelation();
  AbsenceToAbsenceReasonStdRelation();
  AbsenceToAlertSentRelation();
  AlertSentTypeToAlertSentRelation();
}

function AbsenceToAbsenceReturnRelation() {
  Absence.hasOne(AbsenceReturn, { foreignKey: "absenceId", as: "return" });
  AbsenceReturn.belongsTo(Absence, { foreignKey: "absenceId", as: "absence" });
}

function AbsenceToAbsenceReasonStdRelation() {
  AbsenceReasonStd.hasMany(Absence, {
    foreignKey: "reasonStdId",
    as: "absences",
  });
  Absence.belongsTo(AbsenceReasonStd, {
    foreignKey: "reasonStdId",
    as: "reasonStd",
  });
}

function AbsenceToAlertSentRelation() {
  Absence.hasMany(AlertSent, { foreignKey: "absenceId", as: "alerts" });
  AlertSent.belongsTo(Absence, { foreignKey: "absenceId", as: "absence" });
}

function AlertSentTypeToAlertSentRelation() {
  AlertSentType.hasMany(AlertSent, {
    foreignKey: "alertSentTypeId",
    as: "alerts",
  });
  AlertSent.belongsTo(AlertSentType, {
    foreignKey: "alertSentTypeId",
    as: "alertSentType",
  });
}
