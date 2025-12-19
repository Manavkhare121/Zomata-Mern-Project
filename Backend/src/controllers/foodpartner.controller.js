import { foodPartnerModel } from "../models/foodpartner.model.js";
import { FoodModel } from "../models/food.model.js"; // ✅ Make sure this path is correct
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const registerFoodPartner = async (req, res) => {
  try {
    const { name, email, password, phone, address, contactName } = req.body;
    const isAccountAlreadyExists = await foodPartnerModel.findOne({ email });

    if (isAccountAlreadyExists) {
      return res.status(400).json({
        message: "Food partner account already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const foodpartner = await foodPartnerModel.create({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
      contactName,
    });

    const token = jwt.sign({ id: foodpartner._id }, process.env.JWT_SECRET);
    res.cookie("token", token, {
  httpOnly: true,
  secure: true,
  sameSite: "None",
});

    res.status(201).json({
      message: "Food Partner registered successfully",
      foodpartner: {
        _id: foodpartner._id,
        email: foodpartner.email,
        name: foodpartner.name,
        phone: foodpartner.phone,
        address: foodpartner.address,
        contactName: foodpartner.contactName,
      },
    });
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const loginFoodPartner = async (req, res) => {
  try {
    const { email, password } = req.body;
    const foodpartner = await foodPartnerModel.findOne({ email });

    if (!foodpartner) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, foodpartner.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: foodpartner._id }, process.env.JWT_SECRET);
    res.cookie("token", token, {
  httpOnly: true,
  secure: true,
  sameSite: "None",
});


    res.status(200).json({
      message: "Food Partner logged in successfully",
      user: {
        _id: foodpartner._id,
        email: foodpartner.email,
        name: foodpartner.name,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const logoutFoodPartner = async (req, res) => {
  res.clearCookie("token", {
  httpOnly: true,
  secure: true,
  sameSite: "None",
});

  res.status(200).json({ message: "Food Partner logged out successfully" });
};


const getFoodPartnerById = async (req, res) => {
  try {
    const foodPartnerId = req.params.id; // ✅ FIXED HERE

    // find food partner
    const foodPartner = await foodPartnerModel.findById(foodPartnerId);
    if (!foodPartner) {
      return res.status(404).json({ message: "Food Partner not found" });
    }

    // find food items linked to this partner
    const foodItemsByFoodPartner = await FoodModel.find({ foodPartner: foodPartnerId });

    res.status(200).json({
      message: "Food partner retrieved successfully",
      foodPartner: {
        ...foodPartner.toObject(),
        foodItems: foodItemsByFoodPartner,
      },
    });
  } catch (error) {
    console.error("Error in getFoodPartnerById:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export {
  registerFoodPartner,
  loginFoodPartner,
  logoutFoodPartner,
  getFoodPartnerById,
};
