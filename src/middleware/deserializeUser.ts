import { NextFunction, Request, Response } from "express";
import { get } from "lodash";
import { verifyJwt } from "../utils/jwt.utils";
import { reIssueAccessToken } from "../service/session.service";

const deserializeUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const refreshToken = <string>get(req, "headers.x-refresh");
    const authToken = <string>req.headers.authorization;
    const authToken2 = authToken.split(" ");
    const accessToken = <string>authToken2[1];

    const { decoded, expired } = verifyJwt(accessToken, "accessPublicKey");

    if (decoded) {
        res.locals.user = decoded;
        return next();
    }
    if (expired && refreshToken) {
        const newAccessToken = await reIssueAccessToken({ refreshToken });

        if (newAccessToken) {
            res.setHeader("x-new-access-token", newAccessToken);
        }

        const result = verifyJwt(newAccessToken as string, "accessPublicKey");

        res.locals.user = result.decoded;

        return next();
    } else {
        res.sendStatus(403);
    }

    return next();
};

export default deserializeUser;
