const database=require("../database/dbconnection");
async function getProfile(id) {
    const [result]=await database.query("SELECT name,email,img FROM user WHERE id=?",[id]);
    return result[0];
};
async function update(id,name,email,img,password) {
    const result=await database.query("UPDATE user SET name=?,email=?,img=?,password=? WHERE id=?",[id,name,email,img,password]);
    return result;
}
module.exports={
    getProfile,
    update
};
