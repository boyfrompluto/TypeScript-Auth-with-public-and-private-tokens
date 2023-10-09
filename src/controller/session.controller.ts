import { Request, Response } from "express";
import { validatePassword } from "../service/user.service";
import { createSession, findSessions } from "../service/session.service";
import { signJwt } from "../utils/jwt.utils";
import config from "config";
import logger from "../utils/logger";

 export async function createSessonHandler(req:Request,res:Response){
    const user = await validatePassword(req.body);
    if(user){
        const session  = await createSession(user._id,req.get("user-agent")||"");
    
        const accessToken= signJwt({
            ...user,session:session._id},
            "accessPrivateKey",
            {
            expiresIn: config.get("accessTokenTtl")
        })
        const  refreshToken=signJwt({
            ...user,session:session._id},
            "refreshPrivateKey",
            {
            expiresIn: config.get("refreshTokenTtl")
        })
        res.send({accessToken,refreshToken})
    }
    else if(!user)res.status(401).send("invalid password or email")


};
 export async function getUserSessonsHandler(req:Request,res:Response){
    // const userId=res.locals.user._id;
   
    
    // const sessions= await findSessions({user:userId,valid:true})
    // logger.info(sessions)
    // res.status(200).send(sessions)
}  