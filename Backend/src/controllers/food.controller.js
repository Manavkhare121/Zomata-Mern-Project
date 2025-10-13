import { FoodModel } from "../models/food.model.js";
import { LikeModel } from "../models/like.model.js";
import { uploadFile } from "../services/storage.service.js";
import { SaveModel } from "../models/save.model.js";
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

const likeFood=async (req,res)=>{
    const{foodId}=req.body;
    const user=req.user;
    const isAlreadyLiked=await LikeModel.findOne({
        user:user._id,
        food:foodId
    })

    if(isAlreadyLiked){
        await LikeModel.deleteOne({
            user:user._id,
            food:foodId
        })

        await FoodModel.findByIdAndUpdate(foodId,{
        $inc:{likeCount:-1}
    })
        return res.status(200).json({
            message:"Food Unliked successfully"
        })
    }

    const Like=await LikeModel.create({
        user:req.user._id,
        food:foodId
    })

    await FoodModel.findByIdAndDelete(foodId,{
        $inc:{likeCount:1}
    })

    res.status(201).json({
        message:"Food Liked successfully",
        Like
    }) 
}

const saveFood=async (req,res)=>{
     const{foodId}=req.body;
    const user=req.user;
    const isAlreadysave=await SaveModel.findOne({
        user:user._id,
        food:foodId
    })

    if(isAlreadysave){
        await SaveModel.deleteOne({
            user:user._id,
            food:foodId
        })

        return res.status(200).json({
            message:"Food unsaved successfully"
        })
    }

    const save=await LikeModel.create({
        user:req.user._id,
        food:foodId
    })

   

    res.status(201).json({
        message:"Food save successfully",
        Like
    }) 
}
export {
    createFood,getFoodItems,likeFood,saveFood
};
