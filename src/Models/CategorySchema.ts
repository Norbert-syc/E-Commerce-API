import mongoose, { Schema } from "mongoose";
import { Category } from "./CategoryModel";

const categorySchema = new Schema<Category>({
  name: { type: String, required: true },
  description: { type: String }
}, { timestamps: true });

export default mongoose.model<Category>("Category", categorySchema);
