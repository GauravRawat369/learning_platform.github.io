const express = require("express");
const UserModel = require("./Models/User.js")
const port = 8000;
const cors = require("cors");
const mongoose = require("mongoose")
mongoose.connect("mongodb://127.0.0.1:27017/User")
const app = express();
app.use(express.json());
app.use(cors())
app.post('/signup',(req,res)=>{
    UserModel.create(req.body)
    .then(Users => res.json(Users))
    .catch(err => res.json(err))
})
app.post('/login',(req,res) =>{
    const {email,password} = req.body;
    UserModel.findOne({email:email})
    .then(user => {
        if(user)
        {
            if(user.password === password){
                res.json("success")
            }
            else{
                res.json({message:"wrong password"})
            }
        }
        else
        {
            res.json({message:"user not found"})
        }
    })
})
app.listen(port,() => {console.log(`port listed on port number : ${port}!`)})