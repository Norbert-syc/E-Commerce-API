import mongoose, { Schema } from "mongoose";

export interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
}

export interface Order {
  userId: string;
  items: OrderItem[];
  totalAmount: number;
  status: "pending" | "processing" | "paid" | "shipped";
}

const orderItemSchema = new Schema<OrderItem>(
  {
    productId: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
  },
  { _id: false },
);

const orderSchema = new Schema<Order>(
  {
    userId: { type: String, required: true },
    items: { type: [orderItemSchema], required: true },
    totalAmount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "processing", "paid", "shipped"],
      default: "pending",
    },
  },
  { timestamps: true },
);

export default mongoose.model<Order>("Order", orderSchema);
