import ErrorHandler from "../utilities/errorHandler.js";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import Order from "../models/order.js";

// Create New Order   =>   /api/v1/orders/create
export const createOrder = catchAsyncErrors(async (req, res, next) => {

    const {
        shippingInfo,
        orderItems,
        paymentMethod,
        paymentInfo,
        itemsPrice,
        taxAmount,
        shippingAmount,
        totalAmount
    } = req.body;

    const order = await Order.create({
        shippingInfo, // => shippingInfo: shippingInfo,
        orderItems,
        paymentMethod,
        paymentInfo,
        itemsPrice,
        taxAmount,
        shippingAmount,
        totalAmount,
        user: req.user._id
    });

    res.status(200).json({
        order
    });

});

// Get Order Details   =>   /api/v1/orders/:id
export const getOrderDetails = catchAsyncErrors(async (req, res, next) => {

    const order = await Order.findById(req.params.id)

    if (!order) {
        return next(new ErrorHandler('Order not found with this ID', 404));
    }

    res.status(200).json({
        order,
    });
});

// Get Logged in(Current) User Orders   =>   /api/v1/orders/user/:id
export const getCurrentUserOrder = catchAsyncErrors(async (req, res, next) => {

    const orders = await Order.find({ user: req.user._id }).populate("user", "name email"); // shows name and email beside user id on request

    res.status(200).json({
        orders
    });

});