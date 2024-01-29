const express =require('express');
const {petrolModel} =require('../models/petrol.model');
const { userModel } = require('../models/User.model');

const petrolRouter =express.Router();

//get the petrollogs

petrolRouter.get("/",async function(req,res){
res.send({msg:"hello from Station"});
});


petrolRouter.post("/create",async function(req,res){
    const {date,OdometerReading,petrolprice,petrolVolume,station} =req.body;
    const userID =req.userID;
    console.log("userID from create petrol admin",userID)
    const user =await userModel.findOne({_id:userID});

    console.log("hey there",user);
  const  admin_email = user.email;
console.log(admin_email);

  await petrolModel.create({
    date:date,
    OdometerReading:OdometerReading,
    petrolprice:petrolprice,
    petrolVolume:petrolVolume,
    station:station,
    admin_email:admin_email
  })
  res.send("created admin success");
    });

    //edit petrollogs

    petrolRouter.patch("/edit/:stationid",async function(req,res){
        const stationID =req.params.stationid;
       console.log(stationID);

        const payload =req.body;
const userID = req.userID;
        
        const user =await userModel.findOne({_id:userID});

        const user_email =user.email;
        const admin =await petrolModel.findOne({_id:stationID});

        const admin_email =admin.admin_email;
        
if(user_email !== admin_email){
    return res.send({msg:"not authorised"});

}else{
    await petrolModel.findByIdAndUpdate(stationID,payload);

    return  res.send("this log updated");
}
       

        });

        //delete that log

        petrolRouter.delete("/delete/:stationID",async function(req,res){
            const stationID =req.params.stationID;
           console.log(stationID);
            // const payload =req.body;
    //  const userID = req.userID;
            
    //         const user =await userModel.findOne({_id:userID});
    
    //         const user_email =user.email;
    //         const admin =await petrolModel.findOne({_id:stationID});
    
    //         const admin_email =admin.admin_email;
            
    // if(user_email !== admin_email){
    //     return res.send({msg:"not authorised to delete"});
    
    // }else{
    //     // await BlogModel.findByIdAndDelete(stationID);
    
    //     return  res.send("this log deleted");
    // }
           });
module.exports ={petrolRouter}