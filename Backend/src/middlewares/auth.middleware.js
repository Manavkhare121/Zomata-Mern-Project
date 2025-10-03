import { foodPartnerModel } from "../models/foodpartner.model.js";
import jwt from "jsonwebtoken";

const authFoodPartnerMiddleware=async (req,res,next)=>{
    if(!token){
        return res.status(400).json({
            message:"Please login First"
        })
    }

    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        const foodPartner=await foodPartnerModel.findById(decoded.id)
        req.foodPartner=foodPartner
        next()
    }catch(err){
        return res.status(401).json({
            message:"Invalid Token"
        })
    }
}

export default authFoodPartnerMiddleware;