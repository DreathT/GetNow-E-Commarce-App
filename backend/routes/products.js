import express from "express"
import { createProductReview, deleteProduct, getProductDetails, getProductReviews, getProducts, newProduct, updateProduct } from "../controllers/productController.js";
import { isAuthenticatedUser } from "../middlewares/auth.js";

const router = express.Router()

router.route("/products").get(getProducts)
router.route("/product/:id").get(getProductDetails)
router.route("/product/create").post(isAuthenticatedUser, newProduct)
router.route("/product/update/:id").put(isAuthenticatedUser, updateProduct)
router.route("/product/delete/:id").delete(isAuthenticatedUser, deleteProduct)

router.route("/reviews").put(isAuthenticatedUser, createProductReview)
router.route("/review").get(isAuthenticatedUser, getProductReviews)

export default router