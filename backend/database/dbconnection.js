const mysql = require("mysql2/promise");
const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD
});
db.getConnection().then(() => {
    console.log("db connected");
}).catch((error) => {
    console.log(error);
    
    console.log("db not connected");
});
module.exports=db;
