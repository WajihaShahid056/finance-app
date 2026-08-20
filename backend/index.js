const express=require("express");
const app=express();
require("dotenv").config();
const port=process.env.SERVER_PORT;
const route=require("./routes/authroute");
const profileData=require("./routes/profile");
const transaction=require("./routes/transaction");
const budget=require("./routes/budget");
const dashboard=require("./routes/dashboard");
const session=require("express-session");
const mySqlStore = require("express-mysql-session")(session);
const sessionStore = new mySqlStore({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD
});
app.use(session({
  secret: process.env.SESSION_SECRET,
  store:sessionStore,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000*60*60*24 ,
    httpOnly: true
  }
}));
app.use(express.json());
app.use(express.static("frontend"));
app.use("/uploads", express.static("./backend/uploads"));
app.use("/",route);
app.use("/", profileData);
app.use("/",transaction);
app.use("/",budget);
app.use("/",dashboard)
app.listen(port,()=>{console.log("server started");
});