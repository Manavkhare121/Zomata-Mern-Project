import mongoose, { Schema } from "mongoose";

const LikeSchema=new Schema({
    user:{
         type:Schema.Types.ObjectId,
        ref:"user",
        required:true
    },
    food:{
         type:Schema.Types.ObjectId,
        ref:"Food",
        required:true
    },
    likeCount:{
        type:Number,
        default:0
    }
},{
    timestamps:true
})

export const LikeModel = mongoose.model("like", LikeSchema);
