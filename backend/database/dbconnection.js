const mysql = require("mysql2/promise");
const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD,
      ssl: {
        rejectUnauthorized: false
    }
});
db.getConnection().then(() => {
    console.log("db connected");
}).catch((error) => {
    console.log(error);
    
    console.log("db not connected");
});
module.exports=db;
