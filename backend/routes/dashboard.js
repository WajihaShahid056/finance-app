const express=require("express");
const router=express.Router();
const controller=require("../controllers/dashboard")
router.get("/dashboard",controller.dashboardDisplay);
module.exports=router;