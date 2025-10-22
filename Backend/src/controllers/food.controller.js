import { FoodModel } from "../models/food.model.js";
import { LikeModel } from "../models/like.model.js";
import { uploadFile } from "../services/storage.service.js";
import { SaveModel } from "../models/save.model.js";
import { v4 as uuid } from "uuid";

const createFood = async (req, res) => {
  console.log(req.body);
  console.log(req.foodPartner);
  console.log(req.file);
  console.log("req.headers:", req.headers["content-type"]);

  const fileUploadResult = await uploadFile(req.file.buffer, uuid());
  const fooditem = await FoodModel.create({
    name: req.body.name,
    description: req.body.description,
    video: fileUploadResult.url,
    foodPartner: req.foodPartner._id,
  });
  res.status(201).json({
    message: "Food Created Successfully",
    food: fooditem,
  });
};

const getFoodItems = async (req, res) => {
  const fooditems = await FoodModel.find({});
  res.status(200).json({
    message: "Food Items Fetched Successfully",
    fooditems,
  });
};

const likeFood = async (req, res) => {
  const { foodId } = req.body;
  const user = req.user || req.foodPartner;

  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const isAlreadyLiked = await LikeModel.findOne({
    user: user._id,
    food: foodId,
  });

  if (isAlreadyLiked) {
    await LikeModel.deleteOne({ user: user._id, food: foodId });
    await FoodModel.findByIdAndUpdate(foodId, { $inc: { likeCount: -1 } });
    return res.status(200).json({ message: "Food Unliked successfully" });
  }

  const like = await LikeModel.create({ user: user._id, food: foodId });
  await FoodModel.findByIdAndUpdate(foodId, { $inc: { likeCount: 1 } });

  res.status(201).json({ message: "Food Liked successfully", like });
};

const saveFood = async (req, res) => {
  const { foodId } = req.body;
  const user = req.user || req.foodPartner;

  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const isAlreadySaved = await SaveModel.findOne({
    user: user._id,
    food: foodId,
  });

  if (isAlreadySaved) {
    await SaveModel.deleteOne({ user: user._id, food: foodId });
    return res.status(200).json({ message: "Food unsaved successfully" });
  }

  const save = await SaveModel.create({ user: user._id, food: foodId });
  res.status(201).json({ message: "Food saved successfully", save });
};


const getsavedfood=async (req,res)=>{
    const user=req.user
    const savedfoods=await SaveModel.find({user:user._id}).populate('food');
    if(!savedfoods || savedfoods.length===0){
        return res.status(404).json({message:"No Saved Foods Found"});
    }

    res.status(200).json({
        message:"Saved Foods Retrieved Successfully",
        savedfoods
    })
}
export { createFood, getFoodItems, likeFood, saveFood,getsavedfood};
