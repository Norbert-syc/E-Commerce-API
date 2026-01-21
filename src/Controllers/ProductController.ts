import { Request, Response } from "express";
import ProductSchema from "../Models/ProductSchema";

export const getProducts = async (req: Request, res: Response) => {
  const products = await ProductSchema.find();
  res.json(products);
};

export const getProductById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await ProductSchema.findById(id);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }
  res.json(product);
};

export const createProduct = async (req: Request, res: Response) => {
  const { name, price, categoryId, description, quantity } = req.body;

  if (!name || price === undefined || !categoryId) {
    return res.status(400).json({
      message: "Missing required fields: name, price, and categoryId are required.",
    });
  }

  const newProduct = new ProductSchema({
    name,
    price,
    categoryId,
    description,
    quantity,
  });
  await newProduct.save();
  res.status(201).json(newProduct);
};

export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await ProductSchema.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }
  res.json(product);
};

export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await ProductSchema.findByIdAndDelete(id);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }
  res.status(204).send();
};
