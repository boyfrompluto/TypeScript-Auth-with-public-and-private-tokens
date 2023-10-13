import jwt, { TokenExpiredError } from "jsonwebtoken";
import config from "config";
import logger from "./logger";
import * as fs from "fs";

export function signJwt(
    object: Object,
    keyName: "accessPrivateKey" | "refreshPrivateKey",
    options?: jwt.SignOptions | undefined
) {
    const signingKey = <string>config.get(keyName);

    return jwt.sign(object, fs.readFileSync(`${signingKey}`), {
        ...(options && options),
        algorithm: "RS256",
    });
}

export function verifyJwt(
    token: string,
    keyName: "accessPublicKey" | "refreshPublicKey"
) {
    try {
        const publicKey = config.get<string>(keyName);
        const decoded = jwt.verify(token, fs.readFileSync(`${publicKey}`));
        return {
            valid: true,
            expired: false,
            decoded,
        };
    } catch (e: any) {
        logger.error(e);
        return {
            valid: false,
            expired: e.message === "jwt expired",
            decoded: null,
        };
    }
}
