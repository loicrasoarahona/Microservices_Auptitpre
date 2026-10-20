import express from "express";
import ServiceSelector from "../core/ServiceSelector.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const retour = await ServiceSelector.studentClient.getClassLevels(req);
  res.json(retour);
});

export default router;
