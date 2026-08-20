const db=require("../database/dbconnection");
async function totalIncome(user_id) {
    const [result]=await db.query("SELECT SUM(amount) AS totalIncome FROM transaction WHERE user_id=? AND type=?",[user_id,"income"]);
      return result[0].totalIncome || 0;
};
async function totalExpense(user_id) {
    const [result]=await db.query("SELECT SUM(amount) AS totalExpense FROM transaction WHERE user_id=? AND type=?",[user_id,"expense"]);
      return result[0].totalExpense || 0;
    
};
async function totalBudget(user_id) {
    const currentMonth = new Date().toISOString().slice(0, 7);
    const [result]=await db.query("SELECT SUM(amount) AS totalBudget FROM budget WHERE user_id=? AND month=?",[user_id,currentMonth]);
      return result[0].totalBudget || 0;
   
};
async function recentTransactions(user_id) {
    const [result] = await db.query("SELECT id,type,amount,category,date,description FROM transaction WHERE user_id=? ORDER BY date DESC LIMIT 3",[user_id] );
    return result;
};
module.exports={
    totalIncome,
    totalExpense,
    totalBudget,
    recentTransactions
}