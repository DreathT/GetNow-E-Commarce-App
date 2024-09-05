import express from "express"
import { getUserProfile } from "../controllers/profileController.js"
import { isAuthenticatedUser } from "../middlewares/auth.js"
const router = express.Router()

router.route("/me").get(isAuthenticatedUser, getUserProfile)

export default router