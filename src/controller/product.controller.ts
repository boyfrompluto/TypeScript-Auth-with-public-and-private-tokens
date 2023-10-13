import { Request, Response } from "express";
import {
    CreateProductInput,
    ReadProductInput,
    UpdateProductInput,
} from "../schema/product.schema";
import {
    creatProduct,
    findProduct,
    findAndUpdateProduct,
    deleteProduct,
} from "../service/product.service";
import logger from "../utils/logger";

export async function createProductHandler(
    req: Request<{}, {}, CreateProductInput["body"]>,
    res: Response
) {
    const userId = res.locals.user._id;

    const body = req.body;
    try {
        const product = await creatProduct({ ...body, user: userId });
        res.status(200).send(product);
    } catch (error) {
        logger.info(error);
    }
}

export async function getProductHandler(
    req: Request<ReadProductInput["params"]>,
    res: Response
) {
    const productId = req.params.productId;
    const product = await findProduct({ productId });

    if (!product) {
        return res.sendStatus(404);
    }
    return res.send(product);
}
export async function updateProductHandler(
    req: Request<UpdateProductInput["params"]>,
    res: Response
) {
    const userId = res.locals.user._id;
    const productId = req.params.productId;
    const body = req.body;
    const product = await findProduct({ productId });

    if (!product) {
        return res.sendStatus(404);
    }
    if (String(product.user) !== userId) {
        return res.sendStatus(403);
    }

    const updateProduct = await findAndUpdateProduct({ productId }, body, {
        new: true,
    });

    return res.send(updateProduct);
}
export async function deleteProductHandler(
    req: Request<UpdateProductInput["params"]>,
    res: Response
) {
    const userId = res.locals.user._id;
    const productId = req.params.productId;

    const product = await findProduct({ productId });
    if (!product) {
        return res.sendStatus(404);
    }
    if (String(product.user) !== userId) {
        return res.sendStatus(403);
    }

    await deleteProduct({ productId: productId });

    res.sendStatus(200);
}
