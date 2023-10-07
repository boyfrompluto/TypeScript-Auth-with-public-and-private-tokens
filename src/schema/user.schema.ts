import {object,string,TypeOf}from "zod";

export const createUserSchema=object({
    body: object({
        email:string({
            required_error: "Email is required"
        }).email("invalid email"),
        password:string({
            required_error: "Password is required"
        }).min(6,"Password must be longer than 6 char"),
        passwordConfirmation:string({
            required_error: "confirm password"
        }),
        name:string({
            required_error: "Name is required"
        })
    } ).refine((data)=>data.password=== data.passwordConfirmation,{
        message:"passwords do not match",
        path:["passwordConfirmation"]
    })
})

export type CreateUserInput=Omit<
TypeOf<typeof createUserSchema>,
"body.passwordConfirmation"
>