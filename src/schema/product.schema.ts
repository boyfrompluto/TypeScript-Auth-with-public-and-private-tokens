import {object,number,string,TypeOf} from "zod";


const payload={
    body:object({
        title:string({
            required_error: "title is required"
        }),
        image:string({
            required_error: "image is required"
        }),
        price:number({
            required_error: "price is required"
        }),
        description:string({
            required_error: "description is required"
        }).min(20,"minimum of 20 character for description"),
    })
}

const params={
    params:object({
        productId:string({
            required_error:"id is required"
        })
    })
}

export const createProductSchema=object({
    ...payload
})
export const updateProductSchema=object({
    ...payload,
    ...params
})
export const deleteProductSchema=object({
    ...params
})
export const getProductSchema=object({
    ...params
})

export type CreateProductInput=TypeOf<typeof createProductSchema>
export type UpdateProductInput=TypeOf<typeof updateProductSchema>
export type DeleteProductInput=TypeOf<typeof deleteProductSchema>
export type ReadProductInput=TypeOf<typeof getProductSchema>