import { FoodModel } from "../models/food.model.js";
import { uploadFile } from "../services/storage.service.js";

import { v4 as uuid } from "uuid";  

const createFood = async (req, res) => {
    console.log(req.body);
    console.log(req.foodPartner);
    console.log(req.file);
    console.log("req.headers:", req.headers["content-type"])
   

    const fileUploadResult = await uploadFile(req.file.buffer, uuid());
    const fooditem=await FoodModel.create({
        name:req.body.name,
        description:req.body.description,
        video:fileUploadResult.url,
        foodPartner:req.foodPartner._id
    })
  res.status(201).json({
    message:"Food Created Successfully",
    food:fooditem
  })
};

const getFoodItems=async (req,res)=>{
    const fooditems=await FoodModel.find({})
    res.status(200).json({
        message:"Food Items Fetched Successfully",
        fooditems
    })
}

export {
    createFood,getFoodItems
};
