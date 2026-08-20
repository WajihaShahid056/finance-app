const db = require("../database/dbconnection");
async function emailCheck(email) {
    const [rows] = await db.query("SELECT*FROM user WHERE email=?", [email])
    return rows[0];
}
async function createUser(name, email, password, img) {
    const [result] = await db.query("INSERT INTO user(name,email,password,img)VALUES(?,?,?,?)", [name, email, password, img])
    return result;
}
module.exports = {
    emailCheck,
    createUser
}