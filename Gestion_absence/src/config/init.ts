import { AlertSentType } from "../models/alertSentType.model.js";
import { AbsenceReasonStd } from "../models/absenceReasonStd.model.js";
import sequelize from "./database.js";

export async function initDB() {
  await sequelize.authenticate();
  console.log("Connexion PostgreSQL OK");

  await sequelize.sync({ alter: true });
}

const ABSENCE_REASONS = [
  { name: "Maladie", description: "Absence pour cause de maladie" },
  { name: "Rendez-vous médical", description: "Consultation médicale, dentiste, etc." },
  { name: "Problème familial", description: "Absence liée à un événement familial" },
  { name: "Retard de transport", description: "Transport scolaire ou personnel en retard" },
  { name: "Convenance personnelle", description: "Absence demandée par la famille" },
  { name: "Non justifiée", description: "Aucun motif n'a été communiqué" },
];

export async function insertInitialData() {
  for (const name of ["email", "phone"]) {
    const existing = await AlertSentType.findOne({ where: { name } });
    if (!existing) {
      await AlertSentType.create({ name });
    }
  }

  for (const reason of ABSENCE_REASONS) {
    const existing = await AbsenceReasonStd.findOne({
      where: { name: reason.name },
    });
    if (!existing) {
      await AbsenceReasonStd.create(reason);
    }
  }
}
