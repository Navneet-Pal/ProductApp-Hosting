const mongoose = require("mongoose")
require("dotenv").config();

exports.DBconnect = ()=>{
    mongoose.connect(process.env.DATABASE_URL , {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then( console.log("database successfully connected") )
    .catch( (err) => { 
        console.log("database connection failed")
        console.log(err)
        process.exit(1);
    });
}



