import { Router } from "express";

import { checkPermissionAdmin } from "../middlewares/checkePermission.js";
import { checkPermissionHr } from "../middlewares/checkePermission.js";

import { create, getAll, getDetail, remove, update } from "../controllers/test.js";

const routerTests = Router();

routerTests.get("/", getAll);
routerTests.get("/:id", getDetail);
routerTests.post("/", create);
routerTests.put("/:id", update);
routerTests.delete("/:id", remove);

export default routerTests;