const express=require("express");
const router=express.Router();
const {signUp,logIn}=require("../controllers/authcontrol");
const upload=require("../middleware/auth")
router.post("/signup",upload.single("img"),signUp);
router.post("/login",logIn);
module.exports=router;