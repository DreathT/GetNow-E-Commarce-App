import ErrorHandler from "../utilities/errorHandler.js";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import User from "../models/user.js";

// Get current user profile   =>   /api/v1/me
export const getUserProfile = catchAsyncErrors(async (req, res, next) => {

    const user = await User.findById(req?.user?._id);

    res.status(200).json({
        user,
    });

});