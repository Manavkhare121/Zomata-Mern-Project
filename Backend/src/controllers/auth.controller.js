import { usermodel } from "../models/user.model.js";

import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { json } from "express";

const registeruser = async (req, res) => {
  const { fullName, email, password } = req.body;

  const isalreadyalreadyexits = await usermodel.findOne({
    email,
  });

  if (isalreadyalreadyexits) {
    return res.status(400).json({
      message: "User already exists",
    });
  }

  const hasshedpassword = await bcrypt.hash(password, 10);

  const user = await usermodel.create({
    fullName,
    email,
    password: hasshedpassword,
  });

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.cookie("token", token);
  res.status(201).json({
    message: "User registered successfully",
    user: {
      _id: user._id,
      email: user.email,
      fullName: user.fullName,
    },
  });
};

const loginuser = async (req, res) => {
  const { email, password } = req.body;
  const user = await usermodel.findOne({ email });

  if (!user) {
    return res.status(400).json({
      message: "Invalid email or password", // this is used to slow or make the affect to small odf dictionary and brute force attack
    });
  }

  const ispassword = await bcrypt.compare(password, user.password);
  if (!ispassword) {
    return res.status(400).json({
      message: "Invalid email or password",
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET
  );

  res.cookie("token",token);
  res.status(200).json({
    message:"User Logged in successfully",
    user:{
        _id:user._id,
        email:user.email,
        fullName:user.fullName
    }
  })
};

export { registeruser, loginuser };
