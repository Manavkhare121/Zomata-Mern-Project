import mongoose, { Schema } from "mongoose";
const saveSchema=new Schema({
    user:{
         type:Schema.Types.ObjectId,
        ref:"user",
        required:true
    },
    food:{
         type:Schema.Types.ObjectId,
        ref:"Food",
        required:true
    }
},{
    timestamps:true
})
export const SaveModel = mongoose.model("save", saveSchema);