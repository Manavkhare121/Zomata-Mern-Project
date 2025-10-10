import { foodPartnerModel } from "../models/foodpartner.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { json } from "express";
const registerFoodPartner=async (req,res)=>{
    const {name,email,password,phone,address,contactName}=req.body;
    const isAccountAlreadyExists = await foodPartnerModel.findOne({ email });

if (isAccountAlreadyExists) {   
    return res.status(400).json({
        message: "Food partner account already exists"
    });
}

    const hasshedpassword=await bcrypt.hash(password,10);
    const foodpartner=await foodPartnerModel.create({
        name,
        email,
        password:hasshedpassword,
        phone,
        address,
        contactName
    })

    const token = jwt.sign({
        id:foodpartner._id,
    },process.env.JWT_SECRET)

    res.cookie("token",token)

    res.status(201).json({
        message:"Food Partner registered successfully",
        foodpartner:{
            _id:foodpartner._id,
            email:foodpartner.email,
            name:foodpartner.name,
            phone:foodpartner.phone,
            address:foodpartner.address,
            contactName:foodpartner.contactName
        }
    })
}

const loginFoodPartner=async (req,res)=>{
    const { email, password } = req.body;
      const foodpartner = await foodPartnerModel.findOne({ email });
    
      if (!foodpartner) {
        return res.status(400).json({
          message: "Invalid email or password", // this is used to slow or make the affect to small odf dictionary and brute force attack
        });
      }
    
      const ispassword = await bcrypt.compare(password, foodpartner.password);
      if (!ispassword) {
        return res.status(400).json({
          message: "Invalid email or password",
        });
      }
    
      const token = jwt.sign(
        {
          id: foodpartner._id,
        },
        process.env.JWT_SECRET
      );
    
      res.cookie("token",token);
      res.status(200).json({
        message:"Food Partner Logged in successfully",
        user:{
            _id:foodpartner._id,
            email:foodpartner.email,
            fullName:foodpartner.fullName
        }
      })
}

const logoutFoodPartner=async (req,res)=>{
    res.clearCookie("token")
    res.status(200).json({message:"Food Partner Logged out successfully"})
}

export {registerFoodPartner,
    loginFoodPartner,
    logoutFoodPartner
    
}