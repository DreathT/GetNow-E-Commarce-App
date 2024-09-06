import express from "express"
import { isAuthenticatedUser, authorizeRoles } from "../middlewares/auth.js";
import { deleteUser, getAllUsers, getUserDetails, updateUserDetails } from "../controllers/adminController.js";
const router = express.Router()

router.route("/admin/users").get(isAuthenticatedUser, authorizeRoles("admin"), getAllUsers)
router.route("/admin/user/:id").get(isAuthenticatedUser, authorizeRoles("admin"), getUserDetails)
router.route("/admin/update/user/:id").put(isAuthenticatedUser, authorizeRoles("admin"), updateUserDetails)
router.route("/admin/delete/user/:id").delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUser)

export default router