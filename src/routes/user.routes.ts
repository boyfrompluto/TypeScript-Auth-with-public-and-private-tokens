
import {Express,Request,Response} from "express"
import { createUserHandler } from "../controller/user.controller"
import validate from "../middleware/validateResource"
import { createUserSchema } from "../schema/user.schema"
import { createSessonHandler } from "../controller/session.controller";
import { createSessionSchema } from "../schema/session.schema";
function routes(app:Express){
    app.get("/healthCheck",(req:Request,res:Response)=>{
        res.sendStatus(200)
    });
    app.post("/api/users",validate(createUserSchema),createUserHandler);
    app.post("/api/sessions",validate(createSessionSchema),createSessonHandler);

}

export default routes;