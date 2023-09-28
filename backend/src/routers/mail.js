import { Router } from "express";

import { checkPermissionAdmin } from "../middlewares/checkePermission.js";
import { checkPermissionHr } from "../middlewares/checkePermission.js";

import { emailtoCandicate } from "../controllers/mail.js";

const routerMail = Router();


routerMail.post("/", emailtoCandicate);


export default routerMail;