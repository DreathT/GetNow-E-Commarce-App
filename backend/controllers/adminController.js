import ErrorHandler from "../utilities/errorHandler.js";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import User from "../models/user.js";

// Get all Users   =>   /api/v1/admin/users
export const getAllUsers = catchAsyncErrors(async (req, res) => {

    const users = await User.find();

    res.status(200).json({
        users
    });

});

// Get user details   =>   /api/v1/admin/user/:id
export const getUserDetails = catchAsyncErrors(async (req, res) => {

    const user = await User.findById(req?.params.id);

    if (!user) {
        return next(new ErrorHandler(`User not found with this ID: ${req?.params?.id}`, 404));
    }

    res.status(200).json({
        user
    })

});

// Update user details   =>   /api/v1/admin/update/user/:id
export const updateUserDetails = catchAsyncErrors(async (req, res) => {

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
export const deleteUser = catchAsyncErrors(async (req, res) => {

    const user = await User.findById(req?.params?.id);

    if (!user) {
        return next(new ErrorHandler(`User not found with this ID: ${req?.params?.id}`, 404));
    }

    // TODO - Remove user avatar from cloudinary

    await user.deleteOne();

    res.status(200).json({
        message: `User deleted successfully ${req?.params?.id}.`
    })

})