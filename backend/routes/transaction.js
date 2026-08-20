const express=require("express");
const router=express.Router();
const {addTransaction,showTransaction,updateTransaction,deleteTransaction}=require("../controllers/transaction");
 router.post("/transaction",addTransaction);
 router.get("/transaction",showTransaction);
 router.put("/transaction/:id",updateTransaction);
 router.delete("/transaction/:id", deleteTransaction);
 module.exports=router;