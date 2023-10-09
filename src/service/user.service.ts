
import {FilterQuery} from "mongoose"
import User, { UserDocument, userInput } from "../models/user.model";
import { omit } from "lodash";
import logger from "../utils/logger";

export async function createUser(input:userInput){
    try{
    const user=await  User.create(input);
    return omit(user.toJSON(),"password");
    }catch(e:any){
        throw new Error(e)
    }
}

export async function validatePassword({email,password}:{
    email:string;
    password:string;
}){
    
    const user= await User.findOne({email})
    
   
    if(!user){
        return false
    }
    const isValid = await user.comparePassword(password);
    if(!isValid){return false}
    return omit(user.toJSON(),"password");

}