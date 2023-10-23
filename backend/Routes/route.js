const express = require("express")
const router = express.Router();

const {addProduct} = require("../Controllers/addProuuct")
const{getAllProducts,updateProduct,deleteProduct,getProductLessPrice,getProductHighRating} = require("../Controllers/getProducts");
const { signUp, login } = require("../Controllers/auth");


router.post("/signup", signUp)
router.post("/login", login)

router.post("/addProduct", addProduct );
router.get("/get-all-products", getAllProducts)
router.put("/update-product", updateProduct)
router.delete("/delete-product", deleteProduct)
router.get("/get-Product-LessPrice", getProductLessPrice)
router.get("/get-Product-HighRating", getProductHighRating)

module.exports = router;

