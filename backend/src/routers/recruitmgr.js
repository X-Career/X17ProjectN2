
import { Router } from "express";

import { checkPermissionAdmin } from "../middlewares/checkePermission.js";
import { checkPermissionHr } from "../middlewares/checkePermission.js";

import { create, getAll, getDetail, remove, update } from "../controllers/recruitmgr.js";

const routerRecruitmgr = Router();

routerRecruitmgr.get("/", getAll);
routerRecruitmgr.get("/:id", getDetail);
routerRecruitmgr.post("/", create);
routerRecruitmgr.put("/:id", update);
routerRecruitmgr.delete("/:id", remove);

export default routerRecruitmgr;