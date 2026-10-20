import express from "express";
import { ClassLevelRepository } from "../repositories/class-level.repository.js";

const router = express.Router();

router.get("/", async (req, res) =>
  res.json(await ClassLevelRepository.findAll()),
);

export default router;
