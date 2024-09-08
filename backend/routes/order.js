import express from "express";
import { isAuthenticatedUser } from "../middlewares/auth.js";
import { createOrder, getCurrentUserOrder, getOrderDetails } from "../controllers/orderController.js";

const router = express.Router();

router.route("/orders/create").post(isAuthenticatedUser, createOrder);
router.route("/order/:id").get(isAuthenticatedUser, getOrderDetails);
router.route("/orders/user/:id").get(isAuthenticatedUser, getCurrentUserOrder);

export default router;