import jwt, { TokenExpiredError } from "jsonwebtoken";
import config from "config";
import logger from "./logger"




export function signJwt(
    object:Object,
    keyName:"accessPrivateKey"|"refreshPrivateKey",
    options?:jwt.SignOptions|undefined){
    
    const signingKey = Buffer.from(
    config.get<string>(keyName),
    "base64"
    ).toString("ascii");
    logger.info(signingKey);
    return jwt.sign(object,signingKey,{
        ...(options&&options),
    });
}

export function verifyJwt(
    token:string,
    keyName:"accessPublicKey"|"refreshPublicKey",
    ){
try {
    const publicKey = Buffer.from(config.get<string>(keyName), "base64").toString(
        "ascii"
      );
    const decoded= jwt.verify(token,publicKey);
    return{
        valid:true,
        expired:false,
        decoded
    }
} catch (e:any) {
    logger.error(e);
    return{
        valid:false,
        expired:e.message==="jwt expired",
        decoded:null,
    }
}
}