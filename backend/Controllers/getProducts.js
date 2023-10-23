const Product = require("../Model/productSchema")

exports.getAllProducts = async (req,res) =>{
    try {
        const products = await Product.find();
        res.status(200).json({
            success:true,
            data:products
        })    
    } 
    catch (error) {
        res.status(500).json({
            success:false,
            error: error.message 
        });
    }
}

exports.updateProduct = async (req,res) =>{
    try {
        const {productID,name,price,featured,company} = req.body;
        const product = await Product.findOne({productID});
        if(!product){
            res.status(404).json({
               error: 'Product not found'
            })
        }
        product.name = name;
        product.price = price;
        product.featured = featured;
        product.company = company;
        const updatedProduct = await product.save();

        res.status(200).json({
            success:true,
            data:updatedProduct
        })    
    } 
    catch (error) {
        res.status(500).json({
            success:false,
            error: error.message 
        });
    }
}

exports.deleteProduct = async (req,res) =>{
    try {
        const {productID} = req.body;
        await Product.findOneAndDelete({productID});
        res.status(200).json({
            success:true,
            message:'Product deleted'
        })    
    } 
    catch (error) {
        res.status(500).json({
            success:false,
            error: error.message 
        });
    }
}

exports.getProductLessPrice = async (req,res) =>{
    try {
        const value = Number(req.body.value);
        const products = await Product.find({price : {$lt:value } });
        res.status(200).json({
            success:true,
            data:products,
        })    
    } 
    catch (error) {
        res.status(500).json({
            success:false,
            error: error.message 
        });
    }
}

exports.getProductHighRating = async (req,res) =>{
    try {
        const value = Number(req.body.value);
        const products = await Product.find({rating : {$gt:value } });
        res.status(200).json({
            success:true,
            data:products,
        })    
    } 
    catch (error) {
        res.status(500).json({
            success:false,
            error: error.message 
        });
    }
}