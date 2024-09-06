import ErrorHandler from "../utilities/errorHandler.js";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import User from "../models/user.js";

// Get current user profile   =>   /api/v1/profile
export const getUserProfile = catchAsyncErrors(async (req, res, next) => {

    const user = await User.findById(req?.user?._id);

    res.status(200).json({
        user,
    });

});

// Update user password   =>   /api/v1/password/update
export const updateUserPassword = catchAsyncErrors(async (req, res, next) => {

    const user = await User.findById(req?.user?._id).select("+password");

    // Check the previous user password
    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

    if (!isPasswordMatched) {
        return next(new ErrorHandler("Old password is incorrect", 400));
    }

    user.password = req.body.password;
    user.save()

    res.status(200).json({
        success: true
    });

});

// Update user profile   =>   /api/v1/profile/update
export const updateUserProfile = catchAsyncErrors(async (req, res, next) => {

    const newUserData = {
        name: req.body.name,
        email: req.body.email
    }

    const user = await User.findByIdAndUpdate(req?.user?._id, newUserData, {
        new: true,
    });

    res.status(200).json({
        success: true
    });

});