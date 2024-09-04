import express from "express"
import { deleteProduct, getProductDetails, getProducts, newProduct, updateProduct } from "../controllers/productController.js";
import { isAuthenticatedUser, authorizeRoles } from "../middlewares/auth.js";

const router = express.Router()

router.route("/products").get(isAuthenticatedUser, getProducts)
router.route("/products").post(isAuthenticatedUser, newProduct)
router.route("/products/:id").get(isAuthenticatedUser, getProductDetails)
router.route("/products/:id").put(isAuthenticatedUser, updateProduct)
router.route("/products/:id").delete(isAuthenticatedUser, deleteProduct)

// Admin routes
router.route("/admin/products").get(isAuthenticatedUser, authorizeRoles("admin"), getProducts)
router.route("/admin/products").post(isAuthenticatedUser, authorizeRoles("admin"), newProduct)
router.route("/admin/products/:id").get(isAuthenticatedUser, authorizeRoles("admin"), getProductDetails)
router.route("/admin/products/:id").put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct)
router.route("/admin/products/:id").delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct)


export default router