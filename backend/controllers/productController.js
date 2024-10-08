import Product from "../models/product.js";
import ErrorHandler from "../utilities/errorHandler.js";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import APIFilters from "../utilities/apiFilters.js";

// Get Products   ==>   /api/v1/products  
export const getProducts = catchAsyncErrors(async (req, res) => {

    try {
        const resPerPage = 4

        const apiFilters = new APIFilters(Product, req.query).search().filters()

        let products = await apiFilters.query;
        let filteredProductsCount = products.length

        apiFilters.pagination(resPerPage);
        products = await apiFilters.query.clone();


        res.status(200).json({
            message: "All Products are these...",
            resPerPage,
            filteredProductsCount,
            products
        });

    } catch (error) {
        return next(new ErrorHandler("Products not found, something is gone wrong...", 404))
    }


});

// Create new product   ==>   /api/v1/admin/products
export const newProduct = catchAsyncErrors(async (req, res) => {

    try {

        req.body.user = req.user._id;

        const product = await Product.create(req.body);

        res.status(200).json({
            product
        });

    } catch (error) {
        return next(new ErrorHandler("Product couldn't create, something is gone wrong...", 404))
    }

});

// Get single product details   ==>   /api/v1/products/:id
export const getProductDetails = catchAsyncErrors(async (req, res, next) => {
    try {
        const product = await Product.findById(req?.params?.id);

        if (!product) {
            return next(new ErrorHandler("no waynot found with this ID", 404))
        }

        if (product === null) {
            return next(new ErrorHandler("Product", 404))
        } else {
            res.status(200).json({
                product
            });
        }
    } catch (error) {
        return next(new ErrorHandler("Product not found with this ID", 404))
    }
});

// Update Product   ==>   /api/v1/product/:id
export const updateProduct = catchAsyncErrors(async (req, res) => {
    try {
        let product = await Product.findById(req?.params?.id);
        product = await Product.findByIdAndUpdate(req?.params?.id, req.body, { new: true }) // new: true parametre basicly working for put, does not allow other parameters to be null
        res.status(200).json({
            product
        });
    } catch (error) {
        return next(new ErrorHandler("Product not found with this ID", 404))
    }
});

// Delete Product   ==>   /api/v1/product/:id
export const deleteProduct = catchAsyncErrors(async (req, res) => {
    try {
        let product = await Product.findById(req?.params?.id);
        await product.deleteOne();
        res.status(200).json({
            message: "Product deleted"
        });
    } catch (error) {
        return next(new ErrorHandler("Product not found with this ID", 404))
    }
});


// Create/Update new review   ==>   /api/v1/review
export const createProductReview = catchAsyncErrors(async (req, res, next) => {

    const { rating, comment, productId } = req.body;

    const review = {
        user: req?.user?._id,
        rating: Number(rating),
        comment
    };

    const product = await Product.findById(productId);

    if (!product) {
        return next(new ErrorHandler('Product not found', 404));
    }

    const isReviewed = product?.reviews?.find((r) => r.user.toString() == req?.user?._id.toString());

    if (isReviewed) {
        product.reviews.forEach((review) => {
            if (review?.user?.toString() === req?.user?._id.toString()) {
                review.comment = comment;
                review.rating = rating;
            };
        });
    } else {
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length;
    }

    product.ratings = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;

    await product.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true,
    });

});

// Get Product Reviews   ==>   /api/v1/reviews
export const getProductReviews = catchAsyncErrors(async (req, res, next) => {

    const product = await Product.findById(req?.query?.id);

    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }

    res.status(200).json({
        success: true,
        reviews: product?.reviews
    });

});

