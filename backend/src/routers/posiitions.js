import { Router } from "express";

import { checkPermissionAdmin } from "../middlewares/checkePermission.js";
import { checkPermissionHr } from "../middlewares/checkePermission.js";

import { create, getAll, getDetail, remove, update } from "../controllers/position.js";

const routerPositions = Router();

routerPositions.get("/", getAll);
routerPositions.get("/:id", getDetail);
routerPositions.post("/", create);
routerPositions.put("/:id", update);
routerPositions.delete("/:id", remove);

export default routerPositions;