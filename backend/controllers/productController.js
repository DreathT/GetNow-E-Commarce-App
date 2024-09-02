import Product from "../models/product.js";

// Get Products   ==>   /api/v1/products  
export const getProducts = async (req, res) => {

    const products = await Product.find();

    res.status(200).json({
        message: "All Products are these...",
        products
    });
};

// Create new product   ==>   /api/v1/admin/products
export const newProduct = async (req, res) => {

    const product = await Product.create(req.body);

    res.status(200).json({
        product
    });
};

// Get single product details   ==>   /api/v1/products/:id
export const getProductDetails = async (req, res) => {

    try {
        const product = await Product.findById(req?.params?.id);

        if (product === null) {
            res.status(404).json({
                message: "null?"
            });
        } else {
            res.status(200).json({
                product
            });
        }
    } catch (error) {
        res.status(404).json({
            error: "Product not found with this ID"
        });
    }

};

// Update Product   ==>   /api/v1/product/:id
export const updateProduct = async (req, res) => {

    try {
        let product = await Product.findById(req?.params?.id);

        product = await Product.findByIdAndUpdate(req?.params?.id, req.body, { new: true })

        res.status(200).json({
            product
        });
    } catch (error) {
        res.status(404).json({
            error: "Product not found with this ID"
        });
    }

};

// Delete Product   ==>   /api/v1/product/:id
export const deleteProduct = async (req, res) => {

    try {
        let product = await Product.findById(req?.params?.id);

        await product.deleteOne();

        res.status(200).json({
            message: "Product deleted"
        });
    } catch (error) {
        res.status(404).json({
            error: "Product not found with this ID"
        });
    }

};