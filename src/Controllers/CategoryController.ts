import { Request, Response } from "express";
import CategorySchema from "../Models/CategorySchema";

export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await CategorySchema.find();
    res.json(categories);
  } catch (error) {
    console.error("Get categories error:", error);
    res.status(500).json({ message: "Failed to fetch categories" });
  }
};

export const getCategoriesById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const category = await CategorySchema.findById(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.json(category);
  } catch (error) {
    console.error("Get category by id error:", error);
    res.status(500).json({ message: "Failed to fetch category" });
  }
};

export const createCategory = async (req: Request, res: Response) => {
  try {
    const newCategory = new CategorySchema({
      name: req.body.name,
      description: req.body.description,
      image: req.body.image,
    });
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (error: any) {
    console.error("Create category error:", error);
    if (error.code === 11000) {
      return res.status(400).json({ message: "Category already exists" });
    }
    res.status(500).json({ message: "Failed to create category" });
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const category = await CategorySchema.findByIdAndUpdate(
      id,
      { name: req.body.name, description: req.body.description, image: req.body.image },
      { new: true, runValidators: true }
    );
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.json(category);
  } catch (error) {
    console.error("Update category error:", error);
    res.status(500).json({ message: "Failed to update category" });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const category = await CategorySchema.findByIdAndDelete(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(204).send();
  } catch (error) {
    console.error("Delete category error:", error);
    res.status(500).json({ message: "Failed to delete category" });
  }
};
