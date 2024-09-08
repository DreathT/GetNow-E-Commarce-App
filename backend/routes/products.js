import express from "express"
import { deleteProduct, getProductDetails, getProducts, newProduct, updateProduct } from "../controllers/productController.js";
import { isAuthenticatedUser, authorizeRoles } from "../middlewares/auth.js";

const router = express.Router()

router.route("/products").get(isAuthenticatedUser, getProducts)
router.route("/product/:id").get(isAuthenticatedUser, getProductDetails)
router.route("/product/create").post(isAuthenticatedUser, newProduct)
router.route("/product/update/:id").put(isAuthenticatedUser, updateProduct)
router.route("/product/delete/:id").delete(isAuthenticatedUser, deleteProduct)

export default router