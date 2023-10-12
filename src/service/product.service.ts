import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import Product, { ProductDocument, productInput } from "../models/product.model";

export async function creatProduct(input:productInput){
    return Product.create(input)
}
export async function findProduct(query:FilterQuery<ProductDocument>,options:QueryOptions={
    lean:true
}){
    return Product.findOne(query,{},options)
}
export async function findAndUpdateProduct(
    query:FilterQuery<ProductDocument>,update:UpdateQuery<ProductDocument>,options:QueryOptions
){
    Product.findOneAndUpdate(query,update,options)
}
export async function deleteProduct(query:FilterQuery<ProductDocument>){
    return Product.deleteOne(query)
}
