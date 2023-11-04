import  express  from "express";
import { signUp, singIn, logOut, updateUser } from '../controllers/auth.js';

const router = express.Router();

router.post("/signup", signUp);
router.put("/:id", updateUser);
router.post("/signin", singIn);
router.post("/logout", logOut);

export default router 