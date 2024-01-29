const express =require("express")
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const {connections} =require('./configs/db');
const {userModel} =require('./models/User.model');
const {petrolRouter } = require("./Routes/petrol.route");
const { authentication } = require("./middleware/authentication.middleware");

const app=express();
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("server started")
})

// signup
app.post("/signup",(req,res)=>{
    const {name,email,password,phonenumber,vehicle_type} =req.body;
    try{
        bcrypt.hash(password, 4,async function(err, hash) {
            // Store hash in your password DB.
            await userModel.create({name:name,email:email,password:hash,phonenumber,vehicle_type});
            return res.send({msg:"registeration done"})
        });

    }catch(err){
        console.log("err from signup",err);
        return res.send({msg:"something went wrong while signup"})

    }
})

// login 
app.post("/login",async(req,res)=>{
    const {email,password} =req.body;
    const user =await userModel.findOne({email});
    if(!user){
        return res.send({msg:"invalid credentials"});
    }
    const hashedpassword = user.password;

   try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(401).json({ msg: "Invalid credentials" });
        }
        const hashedPassword = user.password;
        bcrypt.compare(password, hashedPassword, function(err, result) {
            if (err) {
                console.log("Error while comparing passwords:", err);
                return res.status(500).json({ msg: "Internal server error" });
            }
            if (result) {
                var token = jwt.sign({ userID: user._id }, 'loginsecret');
                return res.status(200).json({ msg: "Login success", token: token });
            } else {
                return res.status(401).json({ msg: "Invalid credentials" });
            }
        });

    }catch(err){
        console.log("err from signup",err);
        return res.send({msg:"something went wrong while login"})

    }
})
app.use(authentication);

app.use("/petrollog",petrolRouter)

app.listen(7500,()=>{
    try{
        console.log("listening on 7500");
    }catch(err){
        console.log("err from starting server",err)
    }
})