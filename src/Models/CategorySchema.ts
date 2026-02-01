import mongoose, { Schema } from "mongoose";
import { Category } from "./CategoryModel";

const categorySchema = new Schema<Category>({
  id: { type: String, unique: true },
  name: { type: String, required: true },
  description: { type: String },
  image: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model<Category>("Category", categorySchema);
