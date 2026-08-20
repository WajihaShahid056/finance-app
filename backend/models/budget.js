const db=require("../database/dbconnection");
async function addBudget(user_id,month,budget) {
    const result=await db.query("INSERT INTO budget(user_id,month,amount)VALUES(?,?,?)",[user_id,month,budget]);
    return result;
};
async function showBudget(user_id) {
    const [result]=await db.query("SELECT id,month,amount FROM budget WHERE user_id=?",[user_id]);
    return result;
};

async function deleteUserBudget(id) {
    const result = await db.query("DELETE FROM budget WHERE id=?",[id]);
    return result;
}
module.exports={
    addBudget,
    showBudget,
    deleteUserBudget
};