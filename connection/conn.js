const mongoose = require("mongoose");

async function getConnect(){
    await mongoose.connect('mongodb://localhost/assignmet');
}

module.exports = getConnect;