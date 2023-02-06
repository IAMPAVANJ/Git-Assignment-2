const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const userSchema = new Schema({
    name: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true, min:6, max:20},
},{timestamps: true})

const userModel  = mongoose.model('User', userSchema);

module.exports = userModel;