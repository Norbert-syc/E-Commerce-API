import {Schema , model, Document} from "mongoose";
import {Product} from "./ProductModel";

const productSchema = new Schema<Product>({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  categoryId: { type: String, required: true },
  description: { type: String },
  image: { type: String, required: true },
  quantity: { type: Number, required: true }
}, { timestamps: true });

export default model<Product>("Product", productSchema);
