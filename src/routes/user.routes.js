import { Router } from "express";
import { userRegister } from "../controllers/user.controller.js";
import { upload } from "../middelware/multer.middelware.js";







const router = Router()
router.post("/register", upload.single("avatar"),userRegister)





export default router




