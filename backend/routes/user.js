import express from "express"
import { getUserProfile, updateUserPassword, updateUserProfile } from "../controllers/userController.js"
import { isAuthenticatedUser } from "../middlewares/auth.js"
const router = express.Router()

router.route("/self/profile").get(isAuthenticatedUser, getUserProfile)
router.route("/self/profile/update").put(isAuthenticatedUser, updateUserProfile)
router.route("/self/password/update").put(isAuthenticatedUser, updateUserPassword)


export default router