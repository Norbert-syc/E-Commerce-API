import mongoose, { Schema } from "mongoose";
import { Product } from "./ProductModel";

const productSchema = new Schema<Product>({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  categoryId: { type: String, required: true },
  description: { type: String },
  quantity: { type: Number, required: true }
}, { timestamps: true });

export default mongoose.model<Product>("Product", productSchema);
