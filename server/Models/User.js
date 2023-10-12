const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    email: String,
    password: String
})
const UserModel = mongoose.model("User",UserSchema)
module.exports = UserModel;