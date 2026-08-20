const express=require("express");
const router=express.Router();
const {addBudget,showBudget,deleteUserBudget}=require("../controllers/budget");
 router.post("/budget",addBudget);
 router.get("/budget",showBudget);
 router.delete("/budget/:id", deleteUserBudget);
 module.exports=router;