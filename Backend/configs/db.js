const mongoose =require('mongoose');
require("dotenv").config();
const connections =mongoose.connect(`${process.env.MONG0_URL}/petrolstation`)
module.exports ={connections};