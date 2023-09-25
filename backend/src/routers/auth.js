import  express  from "express";
import { signUp, singIn } from '../controllers/auth.js';

const router = express.Router();

router.post("/signup", signUp);
router.post("/signin", singIn);

export default router 