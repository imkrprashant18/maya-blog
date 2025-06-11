import { Router } from "express";
import { userRegister, loginUser, getCurrentUser, logoutUser } from "../controllers/user.controller.js";
import { upload } from "../middelware/multer.middelware.js";
import {jwtAuth} from "../middelware/auth.middelware.js"

const router = Router()
router.post("/register", upload.single("avatar"),userRegister)
router.post("/login", loginUser)
// protected route
// get current user
router.get("/current-user", jwtAuth, getCurrentUser )
// logout
router.post("/logout", jwtAuth, logoutUser)

export default router




