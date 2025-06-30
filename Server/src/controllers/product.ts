import { Request, Response } from "express"
import {Product} from "../models/productos"

export const getProducts = async (req: Request, res: Response) => {
    const productos = await Product.findAll();
    res.json(productos)
}