const express=require("express");
const router=express.Router();
const {profileData,updateProfile,logOut}=require("../controllers/profile");
const upload=require("../middleware/auth")
router.get("/profile",profileData);
router.put("/profile",upload.single("img"),updateProfile);
router.post("/logout", logOut);
 module.exports=router;