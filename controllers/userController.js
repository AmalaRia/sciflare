const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const crypt = require('../helpers/tpyrcne')
const mongoose = require('mongoose');
const User = require('../model/userModel')
const Admin = require('../model/adminModel')

const Verify = require('../helpers/verification')
router.use(express.json()); // for parsing application/json
router.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

exports.userRegister = async (req, res) => {
    console.log("req: ", req.body);
    console.log("req.body.email: ", req.body.email);

    const getUser = await User.find({email:req.body.email})
    console.log("getUser: ", getUser);
    if(getUser.length > 0){
        res.json({status:false,message:"Already Registered" });
    }
    else{
        // const password = crypt.encrypt(req.body.password)
        // console.log("password: ", password);
    const user = new User({
        email: req.body.email,
        password:req.body.password,
        username: req.body.username,
        type: req.body.type,
        organization: req.body.organization,
        contactNumber: req.body.contactNumber
    });

    try {
        const savedUser = await user.save();
        jwt.sign({user}, 'privatekey', { expiresIn: '1h' },(err, token) => {
            if(err) { console.log(err) }    
            res.json({status:true,message:"Registration Success",token:token });

        })
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "An error occurred while saving the user." });
    }
    


}
}

exports.userLogin = async(req,res)=>{

    if(!req.body){
    res.json({status:false,mesage:"Fields are Required"})
    }else{
        // const password = await crypt.decrypt('36c72744a9e6acc0085cfe3cbdcc4c27')
        // console.log("password: ", password);
        let UserType
        if(req.body.email == 'admin@gmail.com'){
             UserType= await Admin.find({email:req.body.email,password:req.body.password})

        }else{
             UserType= await User.find({email:req.body.email,password:req.body.password})

        }
        console.log("UserType: ", UserType);
        if(UserType.length > 0){
            jwt.sign({UserType}, 'privatekey', { expiresIn: '1h' },(err, token) => {
                if(err) { console.log(err) }    
                res.json({status:true,mesage:"Login Success",token:token})      
            })
        }else{
            res.json({status:false,mesage:"Kindly Register"})    
        }
    }
}

exports.UserDetails = async (req, res) => {

    if(req.body.email == "admin@gmail.com"){
        const getDetails = await User.find({ });
        console.log("getDetails: ", getDetails.length);
    
        if (getDetails.length > 0) {
            res.json({ status: true, data: getDetails });
        }   
    }
else{
    const getDetails = await User.find({ email: req.body.email },{email:1,username:1,organization:1,type:1,contactNumber:1,_id:0});
    console.log("getDetails: ", getDetails.length);

    if (getDetails.length > 0) {
        res.json({ status: true, data: getDetails });
    } 
}


}

