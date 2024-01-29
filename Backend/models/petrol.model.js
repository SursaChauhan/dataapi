const mongoose =require('mongoose');

const petrolSchema =mongoose.Schema({
date:{type:String,require:true},
OdometerReading:{type:String,require:true},
petrolprice:{type:String,require:true},
petrolVolume:{type:String,require:true},
station:{type:String,require:true,enum:["Shell", "Bharat-petroleum", "HP"]},
admin_email:{type:String,require:true},
})
const petrolModel =mongoose.model('stations',petrolSchema)

module.exports ={petrolModel};