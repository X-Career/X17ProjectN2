import { Router } from "express";

import { checkPermissionAdmin } from "../middlewares/checkePermission.js";
import { checkPermissionHr } from "../middlewares/checkePermission.js";

import { create, getAll, getDetail, remove, update, getJobOfRecruit } from "../controllers/job.js";

const routerJobs = Router();

routerJobs.get("/", getAll);
routerJobs.get("/:id", getDetail);
routerJobs.post("/", create);
routerJobs.put("/:id", update);
routerJobs.delete("/:id", remove);
routerJobs.get("/get-job-of-recruit/:recruitId", getJobOfRecruit);

export default routerJobs;