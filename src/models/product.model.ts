import mongoose from "mongoose";
import { nanoid } from 'nanoid'
import { UserDocument } from "./user.model";

const id=nanoid()
export interface productInput{
    user: UserDocument["_id"];
    title:string;
    price:number;
    image:string;
    description:string
}
export interface ProductDocument extends productInput,mongoose.Document{
    createdAt: Date;
    updatedAt: Date;
}
const productSchema = new mongoose.Schema({

    productId:{
        type:String,
        required:true,
        unique:true,
        default:()=>{`product_${id}`
        }
    },
    user:{
        type:mongoose.Schema.Types.ObjectId, ref:"User",
        required:true
    },
    title:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    
},{
    timestamps:true
});



const Product= mongoose.model<ProductDocument>("Product",productSchema);

export default Product