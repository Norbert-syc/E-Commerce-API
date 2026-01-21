import { Request, Response } from "express";
import CategorySchema from "../Models/CategorySchema";

export const getCategories = async (req: Request, res: Response) => {
  const categories = await CategorySchema.find();
  res.json(categories);
};

export const getCategoriesById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const category = await CategorySchema.findById(id);
  if (!category) {
    return res.status(404).json({ message: "Category not found" });
  }
  res.json(category);
};

export const createCategory = async (req: Request, res: Response) => {
  const newCategory = new CategorySchema({
    name: req.body.name,
    description: req.body.description,
  });
  await newCategory.save();
  res.status(201).json(newCategory);
};

export const updateCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  const category = await CategorySchema.findByIdAndUpdate(
    id,
    { name: req.body.name, description: req.body.description },
    { new: true, runValidators: true }
  );
  if (!category) {
    return res.status(404).json({ message: "Category not found" });
  }
  res.json(category);
};

export const deleteCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  const category = await CategorySchema.findByIdAndDelete(id);
  if (!category) {
    return res.status(404).json({ message: "Category not found" });
  }
  res.status(204).send();
};
