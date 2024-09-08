import express from "express"
import { isAuthenticatedUser, authorizeRoles } from "../middlewares/auth.js";
import { deleteProduct, getProductDetails, getProducts, newProduct, updateProduct } from "../controllers/productController.js";
import { deleteOrder, deleteReview, deleteUser, getAllOrders, getAllUsers, getUserDetails, updateOrder, updateUserDetails } from "../controllers/adminController.js";
const router = express.Router()

// Admin Users Routes
router.route("/admin/users").get(isAuthenticatedUser, authorizeRoles("admin"), getAllUsers)
router.route("/admin/user/:id").get(isAuthenticatedUser, authorizeRoles("admin"), getUserDetails)
router.route("/admin/update/user/:id").put(isAuthenticatedUser, authorizeRoles("admin"), updateUserDetails)
router.route("/admin/delete/user/:id").delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUser)

// Admin Product routes
router.route("/admin/products").get(isAuthenticatedUser, authorizeRoles("admin"), getProducts)
router.route("/admin/products/:id").get(isAuthenticatedUser, authorizeRoles("admin"), getProductDetails)
router.route("/admin/product/create").post(isAuthenticatedUser, authorizeRoles("admin"), newProduct)
router.route("/admin/product/update/:id").put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct)
router.route("/admin/product/delete/:id").delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct)

// Admin Orders Routes
router.route("/admin/orders").get(isAuthenticatedUser, authorizeRoles("admin"), getAllOrders)
router.route("/admin/order/update/:id").put(isAuthenticatedUser, authorizeRoles("admin"), updateOrder)
router.route("/admin/order/delete/:id").delete(isAuthenticatedUser, authorizeRoles("admin"), deleteOrder)

// Admin Reviews Routes
router.route("/admin/delete/review").delete(isAuthenticatedUser, authorizeRoles("admin"), deleteReview)

export default router