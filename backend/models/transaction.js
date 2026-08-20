const db=require("../database/dbconnection");
async function addData(user_id,type,amount,category,date,description) {
    const result=await db.query("INSERT INTO transaction(user_id,type,amount,category,date,description)VALUES(?,?,?,?,?,?)",[user_id,type,amount,category,date,description]);
    return result;
};
async function getTransaction(user_id) {
    const [result]=await db.query("SELECT id,type,amount,category,date,description FROM transaction WHERE user_id=?",[user_id]);
    return result;
};
async function updateUserTransaction(id, type, amount, category, date, description) {
    const result = await db.query(
        "UPDATE transaction SET type=?, amount=?, category=?, date=?, description=? WHERE id=?", [type, amount, category, date, description, id]
    );
    return result;
};
async function deleteUserTransaction(id) {
    const result = await db.query("DELETE FROM transaction WHERE id=?",[id]);
    return result;
}
module.exports={
    addData,
getTransaction,
updateUserTransaction,
deleteUserTransaction
};