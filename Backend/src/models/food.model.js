import mongoose, { Schema } from "mongoose";
const foodSchema =new Schema({
    name:{
        type:String,
        required:true
    },
    video:{
        type:String,
        required:true
    },
    description:{
        type:String,

    }
    ,foodPartner:{
        type:Schema.Types.ObjectId,
        ref:"FoodPartner"
    }
},{
    timestamps:true
})

export const FoodModel = mongoose.model("Food", foodSchema);