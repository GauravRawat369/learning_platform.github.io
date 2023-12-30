const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    blogwriter:String,
    title: String,
    summary: String,
    content: String,
    coverimg : String
},{
    timestamps:true,
})
const PostModel = mongoose.model("Post",PostSchema)
module.exports = PostModel