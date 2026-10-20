import express from "express";
import ServiceSelector from "../core/ServiceSelector.js";
import { EntityNotFoundError } from "../errors/entity-not-found.error.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const filter = req.query;
  res.json(await ServiceSelector.studentClient.getAll(filter, req));
});

router.get("/paginated", async (req, res) => {
  const filter = req.query;
  const retour = await ServiceSelector.studentClient.getAllPaginated(
    filter,
    parseInt(filter.page?.toString() || "1"),
    req,
  );
  res.json(retour);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id.toString();
  const retour = await ServiceSelector.studentClient.getById(parseInt(id), req);
  if (!retour) throw new EntityNotFoundError(`Student ${id} not found`);
  res.json(retour);
});

router.get("/:id/parents", async (req, res) => {
  const id = req.params.id.toString();
  const retour = await ServiceSelector.studentClient.getParents(
    parseInt(id),
    req,
  );
  res.json(retour);
});

export default router;
