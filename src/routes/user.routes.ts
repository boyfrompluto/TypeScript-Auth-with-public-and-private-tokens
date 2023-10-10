
import {Express,Request,Response} from "express"
import { createUserHandler } from "../controller/user.controller"
import validate from "../middleware/validateResource"
import { createUserSchema } from "../schema/user.schema"
import { createSessonHandler, deleteSessionHandler, getUserSessonsHandler } from "../controller/session.controller";
import { createSessionSchema } from "../schema/session.schema";
import requireUser from "../middleware/requireUser";
function routes(app:Express){
    app.get("/healthCheck",(req:Request,res:Response)=>{
        res.sendStatus(200)
    });
    app.post("/api/users",validate(createUserSchema),createUserHandler);
    app.post("/api/sessions",validate(createSessionSchema),createSessonHandler);
    app.get("/api/sessions",requireUser,getUserSessonsHandler);
    app.delete("/api/sessions",requireUser,deleteSessionHandler);

}

export default routes;