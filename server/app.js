require('dotenv').config()
const express = require("express");
const UserModel = require("./Models/User.js")
const PostModel = require("./Models/Post.js")
const port = process.env.PORT_1 || 8000;
const cors = require("cors");
const mongoose = require("mongoose")
const bcrypt = require('bcrypt')
const multer  = require('multer')
const uploadfile = multer({ dest: 'uploads/' })
const fs = require('fs')
mongoose.connect(process.env.MONGO_URL_USER)//mongodb connection
const app = express();
app.use(express.json());//middleware
app.use(cors())
app.use('/uploads',express.static(__dirname + '/uploads'))
app.post('/signup',(req,res)=>{
    req.body.password = bcrypt.hashSync(req.body.password,10);
    // console.log(res.body);
    UserModel.create(req.body)
    .then(Users => res.json(Users))
    .catch(err => res.json(err))
})
// app.get('/username',(req,res) =>{
//     //only send username
//     UserModel.find().select('username')
//     .then(user => res.json(user) )
//     .catch(err => res.json(err))
// })
app.post('/login',(req,res) =>{
    const {email,password} = req.body;
    UserModel.findOne({email:email})
    .then(user => {
        if(user)
        {
            const passcheck = bcrypt.compareSync(password,user.password)
            passcheck ? res.json({message: "success",user:user.usertype,username : user.username}): res.json({message: "wrong pass"})
        }
        else
        {
            res.json({message:"user not found"})
        }
        // res.json({user});
    })
})
app.post('/createpost',uploadfile.single('file'), async (req,res) =>{
    const {originalname,path} = req.file;
    const part = originalname.split('.');
    const lastpart = part[part.length -1];
    const newpath = path+'.'+lastpart
    fs.renameSync(path,newpath)

    // const [title,summary,content] = req.body;
    const postDetail = await PostModel.create({
        blogwriter:req.body.blogwriter,
        title:req.body.title,
        summary:req.body.summary,
        content:req.body.content,
        coverimg: newpath
    })
    res.json({postDetail})
})
app.get('/post',(req,res)=>{
    PostModel.find().populate('_id').sort({createdAt: -1})
    .then(post => res.json(post))
    .catch(err => res.json(err))
})
app.get('/postpage/:id' ,async (req,res) =>{
    const {id} = req.params;
    await PostModel.findById(id).populate('_id').then(post => res.json(post))
    
})
app.listen(port,() => {console.log(`port listed on port number : ${port}!`)})