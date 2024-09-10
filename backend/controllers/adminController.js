import ErrorHandler from "../utilities/errorHandler.js";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import User from "../models/user.js";
import Order from "../models/order.js";
import Product from "../models/product.js";

// Get all Users   =>   /api/v1/admin/users
export const getAllUsers = catchAsyncErrors(async (req, res, next) => {

    const users = await User.find();

    res.status(200).json({
        users
    });

});

// Get user details   =>   /api/v1/admin/user/:id
export const getUserDetails = catchAsyncErrors(async (req, res, next) => {

    const user = await User.findById(req?.params.id);


    if (!user) {
        return next(new ErrorHandler(`User not found with this ID: ${req?.params?.id}`, 404));
    }

    res.status(200).json({
        user
    })

});

// Update user details   =>   /api/v1/admin/update/user/:id
export const updateUserDetails = catchAsyncErrors(async (req, res, next) => {

    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role
    }

    const user = await User.findByIdAndUpdate(req?.params?.id, newUserData, {
        new: true
    });

    res.status(200).json({
        user
    })

});

// Delete user   =>   /api/v1/admin/delete/user/:id
export const deleteUser = catchAsyncErrors(async (req, res, next) => {

    const user = await User.findById(req?.params?.id);

    if (!user) {
        return next(new ErrorHandler(`User not found with this ID: ${req?.params?.id}`, 404));
    }

    // TODO - Remove user avatar from cloudinary

    await user.deleteOne();

    res.status(200).json({
        message: `User deleted successfully ${req?.params?.id}.`
    });

});

// Get All Orders   =>   /api/v1/admin/orders
export const getAllOrders = catchAsyncErrors(async (req, res, next) => {

    const orders = await Order.find();

    res.status(200).json({
        orders
    });

});

// Update Order   =>   /api/v1/admin/orders/:id
export const updateOrder = catchAsyncErrors(async (req, res, next) => {

    const order = await Order.findById(req?.params?.id);

    if (!order) {
        return next(new ErrorHandler("Order not found with this ID", 404));
    }

    if (order.orderStatus === "Delivered") {
        return next(new ErrorHandler("You have already delivered this order", 400));
    }

    // Update product stock
    if (order.orderStatus !== "Shipped") { // My own rule => can be problem later
        order?.orderItems?.forEach(async item => {
            const product = await Product.findById(item?.product?.toString());
            if (!product) {
                return next(new ErrorHandler("Product not found with this ID", 404));
            }
            product.stock = product.stock - item.quantity;
            await product.save()
        });
    }


    order.orderStatus = req.body.status;
    order.deliveredAt = Date.now();

    await order.save();

    res.status(200).json({
        order,
    });

});

// Delete Order   =>   /api/v1/admin/order/:id
export const deleteOrder = catchAsyncErrors(async (req, res, next) => {

    const order = await Order.findById(req?.params?.id)

    if (!order) {
        return next(new ErrorHandler("Order not found with this ID", 404));
    }

    await order.deleteOne();

    res.status(200).json({
        message: `Order deleted successfully ${req?.params?.id}`
    });

});

// Delete Product Review   ==>   /api/v1/review
export const deleteReview = catchAsyncErrors(async (req, res, next) => {

    let product = await Product.findById(req?.query?.productId);

    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }

    const reviews = product?.reviews?.filter(review => review._id.toString() !== req?.query?.id.toString());

    const numOfReviews = reviews.length;

    const ratings = numOfReviews === 0 ? 0 : reviews.reduce((acc, item) => item.rating + acc, 0) / numOfReviews;

    product = await Product.findByIdAndUpdate(req.query.productId, { reviews, numOfReviews, ratings }, { new: true })

    res.status(200).json({
        success: true,
        product
    })

});