const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose")
require ("dotenv").config();
const User = require("./models/User")
const bcrypt =require("bcryptjs")
const jwt = require("jsonwebtoken")

const app = express();

app.use(cors({credentials:true, origin:"http://localhost:5173"}));
app.use(express.json());

//database Connection
const MONGODB_URI = process.env.MONGODB_URI;
console.log(MONGODB_URI);
mongoose.connect(MONGODB_URI);

app.get("/", (req, res) =>{
    res.send("<h1>This is a RESFUL")
})

//User Register
const salt = bcrypt.genSaltSync(10);
app.post("/register", async (req,res)=>{
    const {username, password} = req.body; // สลายโครงสร้าง  
    try {
        const userDoc = await User.create({
            username,
            password: bcrypt.hashSync(password, salt),
        });
        res.json(userDoc)
    } catch (error) {
        console.log(error);
        res.status(400).json(error)
    }
})


//Login
const secret = process.env.SECRET;
app.post("/login", async(req,res)=>{
    const {username, password} = req.body;
    const userDoc = await User.findOne({username}); //เอา username ไปหาข้อมูลจากฐานข้อมูล
    const isMatchedPassword = bcrypt.compareSync(password, userDoc.password); //เช็ค พาส ที่ได้จากฟอร์ม และในฐานข้อมูลว่าเหมือนกันไหม
    if(isMatchedPassword){
        //logged in
        jwt.sign({username, id: userDoc}, secret, {}, (err, token)=>{
            if(err) throw err;
            res.cookie("token", token).json({
                id: userDoc.id,
                username,
            });
        });
    }else{
        res.status(400).json("wrong credentials")
    }
});

app.post("/logout", (req, res) =>{
    res.cookie("token","").json("ok")
})

const PORT = process.env.PORT;
app.listen(PORT, ()=>{
    console.log("server is running 0n http://localhost:" + PORT);
})
