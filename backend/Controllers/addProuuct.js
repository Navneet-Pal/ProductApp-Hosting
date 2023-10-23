const Product = require('../Model/productSchema')

exports.addProduct = async (req,res)=>{
    try {
        const {productID,name,price,featured,company} = req.body;
        const response = await Product.create({
            productID:productID,
            name:name,
            price:price,
            featured:featured,
            company:company,
        });
        res.status(201).json({
            success:true,
            data:response,
            message:"product added successfully"
        })
    } 
    catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message:error.message,
            
        });
    }
}