import express from "express";
import {
  signUp,
  singIn,
  logOut,
  updateUser,
  updatePassword,
  updateInfo,
  getUser,
} from "../controllers/auth.js";

const router = express.Router();

router.post("/signup", signUp);
router.get("/getUser/:id", getUser);
router.put("/:id", updateUser);
router.put("/updateInfo/:id", updateInfo);
router.put("/updatePassword/:id", updatePassword);
router.post("/signin", singIn);
router.post("/logout", logOut);

export default router;
