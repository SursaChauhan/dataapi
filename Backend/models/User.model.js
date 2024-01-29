const mongoose =require('mongoose');

const userSchema =mongoose.Schema({
name:{type:String,require:true},
email:{type:String,require:true},
password:{type:String,require:true},
phonenumber:{type:String,require:true},
vehicle_type:{type:String,require:true}
})
const userModel =mongoose.model('user',userSchema)

module.exports ={userModel};