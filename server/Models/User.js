const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    usertype: String
})
const UserModel = mongoose.model("User",UserSchema)
module.exports = UserModel;