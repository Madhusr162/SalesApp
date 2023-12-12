const express=require('express');
const router=express.Router();
const jwt=require('jsonwebtoken');
const mongoose=require('mongoose');
const bcryptjs=require('bcryptjs');
const usermodel=mongoose.model("UserModel");
const {JWT_SECRET}=require('../config');

// register route to make the registration for the user
router.post("/register", function(req,res){
     const {firstName,lastName,email,password}=req.body;
     if(!firstName || !lastName || !email || !password)
     return res.status(400).json({error: "One or more mandatory field is missing"});
    usermodel.findOne({email: email})
    .then((userInDB)=>{
        if(userInDB)
        return res.status(500).json({error: "User with this email already registered"});
        bcryptjs.hash(password, 16)
        .then((hashedPassword)=>{
            const user=new usermodel({firstName,lastName,email,password:hashedPassword});
            user.save()
            .then((newUser)=>{
                res.status(201).json({result: "User signed up successfully"});
            })
            .catch((err)=>{
                console.log(err);
            })
        })
    })
    .catch((err)=>{
        console.log(err);
    })
})

// login route to make the user login with the particular email and password which is already registered
router.post("/login", function(req,res){
    const {email,password}=req.body;
    if( !email || !password)
    return res.status(400).json({error: "One or more mandatory field is missing"});
   usermodel.findOne({email: email})
   .then((userInDB)=>{
       if(!userInDB)
       return res.status(401).json({error: "Invalid Credentials"});
       bcryptjs.compare(password, userInDB.password)
       .then((didMatch)=>{
           if(didMatch){
           const jwtToken=jwt.sign({_id: userInDB._id}, JWT_SECRET);
           const userInfo={"email": userInDB.email, "firstName":userInDB.firstName, "lastName":userInDB.lastName}
           res.status(200).json({result: {token: jwtToken, user: userInfo}});
           }else{
            return res.status(401).json({error: "Invalid Credentials"});
           }
        })
   })
   .catch((err)=>{
       console.log(err);
   })
})

module.exports=router;