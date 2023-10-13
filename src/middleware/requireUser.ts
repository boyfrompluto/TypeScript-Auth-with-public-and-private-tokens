import { NextFunction, Request, Response } from "express";
import logger from "../utils/logger";

const requireUser = (req: Request, res: Response, next: NextFunction) => {
    const user = res.locals.user;

    if (!user) {
        res.sendStatus(403);
    } else return next();
};

export default requireUser;
