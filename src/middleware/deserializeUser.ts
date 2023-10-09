import { NextFunction, Request, Response } from "express";
import { get } from "lodash";
import { verifyJwt } from "../utils/jwt.utils";
import logger from "../utils/logger";



const deserializeUser=async (req:Request,res:Response,next:NextFunction)=>{

    const authToken=<string>req.headers.authorization;
    const authToken2=authToken.split(" ")
    const accessToken=<string>authToken2[1]
    const {decoded,expired}= verifyJwt(accessToken,"accessPublicKey")
    
    if(decoded){
        res.locals.user=decoded;
        return next();
    }
    
     
    return next()
} 

export default deserializeUser