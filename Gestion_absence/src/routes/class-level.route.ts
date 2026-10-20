import express from "express";
import serviceLocatorCore from "../core/service-locator.core.js";

const router = express.Router();

router.get("/", async (req, res) =>
  res.json(await serviceLocatorCore.studentClient.findAllClassLevels(req)),
);

export default router;
