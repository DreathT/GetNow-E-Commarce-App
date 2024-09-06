import express from "express"
import { getUserProfile, updateUserPassword, updateUserProfile } from "../controllers/userController.js"
import { isAuthenticatedUser } from "../middlewares/auth.js"
const router = express.Router()

router.route("/profile").get(isAuthenticatedUser, getUserProfile)
router.route("/profile/update").put(isAuthenticatedUser, updateUserProfile)
router.route("/password/update").put(isAuthenticatedUser, updateUserPassword)


export default router