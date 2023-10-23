const User = require("../Model/user")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");

exports.signUp = async(req,res) =>{
    try {
        const {name,email,password} = req.body;
        const existUser = await User.findOne({email});
        if(existUser){
            return res.json({
                status: false,
                message:"email already used"
            });
        }    
        let encrypyPass;
        try {
            encrypyPass = await bcrypt.hash(password,10);
        } 
        catch (error) {
            return res.status(500).json({
                status: false,
                error: error.message
            })
        }

        const response = await User.create({name,email,password:encrypyPass});
        res.status(200).json({
            status:true,
            message:"user signed up successfully"
        })
    } 
    catch (error) {
        res.status(400).json({
            status:false,
            error:error.message,
        })
    }
}

exports.login = async (req,res)=>{
    try {
        const {email,password} = req.body;

        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:'PLease fill all the details carefully',
            });
        }
        const user = await User.findOne({email});
        if(!user){
            return res.status(401).json({
                success:false,
                message:'User is not registered',
            });
        }

        const validation = await bcrypt.compare(password,user.password);
        if(!validation){
            return res.status(403).json({
                success:false,
                message:"Password Incorrect",
            });
        }

        const payload = {
            email:user.email,
            id:user._id
        }
        let token = jwt.sign( {email:user.email,id:user._id} , process.env.JWT_Secret,{expiresIn:"12h"});

        res.status(200).json({
            status:true,
            token:token,
        })
    } 
    catch (error) {
        return res.status(500).json({
            success:false,
            message:'Login Failure',
            error:error.message
        });
    }
}