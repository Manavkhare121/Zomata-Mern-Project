import { FoodModel } from "../models/food.model.js";
import { LikeModel } from "../models/like.model.js";
import { SaveModel } from "../models/save.model.js";
import { uploadFile } from "../services/storage.service.js";
import { v4 as uuid } from "uuid";

const createFood = async (req, res) => {
  const fileUploadResult = await uploadFile(req.file.buffer, uuid());
  const fooditem = await FoodModel.create({
    name: req.body.name,
    description: req.body.description,
    video: fileUploadResult.url,
    foodPartner: req.foodPartner._id,
  });
  res.status(201).json({ message: "Food Created Successfully", food: fooditem });
};

const getFoodItems = async (req, res) => {
  const fooditems = await FoodModel.find({});
  res.status(200).json({ message: "Food Items Fetched Successfully", fooditems });
};

const likeFood = async (req, res) => {
  const { foodId } = req.body;
  const user = req.user;
  if (!user) return res.status(401).json({ message: "Unauthorized" });

  const existing = await LikeModel.findOne({ user: user._id, food: foodId });

  if (existing) {
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
  const user = req.user;
  if (!user) return res.status(401).json({ message: "Unauthorized" });

  const existing = await SaveModel.findOne({ user: user._id, food: foodId });

  if (existing) {
    await SaveModel.deleteOne({ user: user._id, food: foodId });
    await FoodModel.findByIdAndUpdate(foodId, { $inc: { savesCount: -1 } });
    return res.status(200).json({ message: "Food unsaved successfully" });
  }

  const save = await SaveModel.create({ user: user._id, food: foodId });
  await FoodModel.findByIdAndUpdate(foodId, { $inc: { savesCount: 1 } });
  res.status(201).json({ message: "Food saved successfully", save });
};

const getsavedfood = async (req, res) => {
  try {
    const userId = req.user._id;

    const savedDocs = await SaveModel
      .find({ user: userId })
      .populate("food");

    // ✅ remove null foods
    const savedFoods = savedDocs
      .map(doc => doc.food)
      .filter(food => food !== null);

    res.status(200).json({
      message: "Saved foods fetched successfully",
      saved: savedFoods,
    });
  } catch (error) {
    console.error("Error fetching saved foods:", error);
    res.status(500).json({ message: "Failed to fetch saved foods" });
  }
};

export { createFood, getFoodItems, likeFood, saveFood, getsavedfood };
