import express from "express"
import { registerUser, loginUser, logoutUser, forgotPassword, resetPassword } from "../controllers/authController.js";
const router = express.Router()

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/logout").get(logoutUser)

router.route("/password/forgot").post(forgotPassword)
router.route("/password/reset/:token").put(resetPassword)

export default router