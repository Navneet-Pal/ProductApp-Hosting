const jwt = require("jsonwebtoken");
require("dotenv").config();

//This is only for authentication when different roles have different access.
//through the middleware we can verify our user and as well as grant route for further process

exports.authen = async(req,res,next)=>{
    try {
        const token = req.header("Authorization").replace("Bearer ","") ;

        if(!token || token===undefined){
            return res.status(401).json({
                success:false,
                message:'Token Missing',
            });
        }

        try {
            const payload = jwt.verify(token , process.env.JWT_SECRET);
           
        } 
        catch (error) {
             return res.status(401).json({
                success:false,
                message:'token is invalid',
            });
        }

        next();
    } 

    catch (error) {
        return res.status(500).json({
            success:false,
            message:'auth failure',
        });
    }
}