import mongoose, { Schema } from "mongoose";
import { Cart, CartItem } from "./CartModel";

const cartItemSchema = new Schema<CartItem>({
  productId: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: { type: Number, required: true },
}, { _id: false });

const cartSchema = new Schema<Cart>({
  userId: { type: String, required: true, unique: true },
  items: [cartItemSchema],
}, { timestamps: true });

export default mongoose.model<Cart>("Cart", cartSchema);
