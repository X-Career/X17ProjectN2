import { Router } from "express";

import { checkPermissionAdmin } from "../middlewares/checkePermission.js";
import { checkPermissionHr } from "../middlewares/checkePermission.js";

import { create, getAll, getDetail, remove, update } from "../controllers/candidate.js";

const routerCandidates = Router();

routerCandidates.get("/", getAll);
routerCandidates.get("/:id", getDetail);
routerCandidates.post("/", create);
routerCandidates.put("/:id", update);
routerCandidates.delete("/:id", remove);

export default routerCandidates;