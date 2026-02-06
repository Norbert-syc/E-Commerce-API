import {Schema , model, Document} from "mongoose";
import {IProduct} from "./ProductModel";

const productSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  description: { type: String },
  image: { type: String, required: true },
  quantity: { type: Number, required: true }
}, { timestamps: true });

export default model<IProduct>("Product", productSchema);
