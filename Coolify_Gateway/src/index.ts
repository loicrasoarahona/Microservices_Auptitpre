import express from "express";
import "./config/env.js";
import { authManagerProxy } from "./proxies/authManager.proxy.js";
import { schoolGradesProxy } from "./proxies/schoolGrades.proxy.js";
import { schoolStudentsProxy } from "./proxies/schoolStudents.proxy.js";
import { gestionAbsenceProxy } from "./proxies/gestionAbsence.proxy.js";
import { authenticate, authorize } from "./middlewares/auth.middleware.js";
import cors from "cors";

const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors());

// Pas de express.json() global : ça consommerait le flux de la requête
// avant que le proxy ne le relaie tel quel à Auth_Manager (body vide sinon).

app.get("/", (req, res) => {
  res.json({
    message: "API OK",
  });
});

app.get("/hello", (req, res) => {
  res.send("Hello, Gateway");
});

// Proxy transparent vers Auth_Manager : /Auth_manager/* -> AUTH_MANAGER_URL/*
// (le chemin interne du service, ex. /auth/login, est conservé tel quel).
// Aucune vérification JWT ici pour l'instant : Auth_Manager reste seul
// responsable de sa propre authentification/autorisation.
app.use("/Auth_manager", authManagerProxy);

// Proxy vers School_grades : réservé aux utilisateurs authentifiés avec
// le rôle admin (vérification JWT via la clé publique d'Auth_Manager).
app.use("/School_grades", authenticate, authorize("admin"), schoolGradesProxy);

// Proxy vers School_students : réservé aux utilisateurs authentifiés,
// sans restriction de rôle particulière.
app.use("/School_students", authenticate, schoolStudentsProxy);

// Proxy vers Gestion_absence : réservé aux utilisateurs authentifiés,
// sans restriction de rôle particulière.
app.use("/Gestion_absence", authenticate, gestionAbsenceProxy);

app.listen(PORT, () => {
  console.log(`Gateway running on port ${PORT}`);
});

export default app;
