const bcrypt=require("bcrypt");
const userModel=require("../models/usermodel")
async function signUp(req,res) {
    try {
        console.log(req.body);
        console.log(req.file);
        const {name,email,password}=req.body;
        const img=req.file?req.file.filename: null;
        if (!name ||!email ||!password|| !img) {
            return res.status(400).json({message:"all fileds required"})
        }
        const emailCheck=await  userModel.emailCheck(email);
        if (emailCheck) {
           return res.status(409).json({message:"email already exists"}) ;    
           }
           const passwordHash=await bcrypt.hash(password,10);
            const newUser=await userModel.createUser(name,email,passwordHash,img);
           req.session.user={
            id:newUser.insertId,
            email:email,
           }
           res.status(201).json({message:"account created successfully.now please login"});
        
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"server error"})
        
    }
};
async function logIn(req,res) {
    try {
        const {email,password}=req.body;
        // validation
        if (!email || !password) {
          return res.status(400).json({message:"all fields required"});
        }
        // emailcheck
        const emailVerify=await userModel.emailCheck(email);
        if (!emailVerify) {
            return res.status(401).json({message:"invalid password or email"});
        }
        // passwordcheck
        const passwordVerify=await bcrypt.compare(password, emailVerify.password);
        if (!passwordVerify) {
            return res.status(401).json({message:"invalid password or email"});
        };
        req.session.user={
            id:emailVerify.id,
            email:emailVerify.email
        };
        req.session.save((err) => {
    if (err) {
        console.log(err);
        return res.status(500).json({ message: "session save error" });
    }
    return res.status(200).json({ message: "login successful"});
});

        
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"server error"});
    }
};
module.exports={
    signUp,
    logIn
}