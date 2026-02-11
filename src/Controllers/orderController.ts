import { Request, Response } from "express";
import Order from "../Models/OrderModel";
import mongoose from "mongoose";

/**
 * @desc    Create new order (USER)
 * @route   POST /api/orders
 * @access  Private
 */
export const createOrder = async (req: Request, res: Response) => {
  try {
    // 🔐 userId comes from JWT middleware
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { items } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "Order items are required" });
    }

    // 💰 Calculate total
    const totalAmount = items.reduce(
      (sum: number, item: any) => sum + item.quantity * item.price,
      0,
    );

    const order = await Order.create({
      userId,
      items,
      totalAmount,
      status: "pending",
    });

    res.status(201).json(order);
  } catch (error) {
    console.error("Create order error:", error);
    res.status(500).json({ message: "Failed to create order" });
  }
};

/**
 * @desc    Get orders for logged-in user
 * @route   GET /api/orders/my
 * @access  Private
 */
export const getMyOrders = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const orders = await Order.find({ userId }).sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (error) {
    console.error("Get my orders error:", error);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

/**
 * @desc    Get all orders (ADMIN)
 * @route   GET /api/orders
 * @access  Admin
 */
export const getAllOrders = async (_req: Request, res: Response) => {
  try {
    const orders = await Order.find()
      .populate("userId", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (error) {
    console.error("Get all orders error:", error);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

/**
 * @desc    Update order status (ADMIN)
 * @route   PUT /api/orders/:id/status
 * @access  Admin
 */
export const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const { status } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = status;
    await order.save();

    res.status(200).json(order);
  } catch (error) {
    console.error("Update order status error:", error);
    res.status(500).json({ message: "Failed to update order" });
  }
};

/**
 * @desc    Delete order (ADMIN)
 * @route   DELETE /api/orders/:id
 * @access  Admin
 */
export const deleteOrder = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: "Order not found" });
    }

    const order = await Order.findByIdAndDelete(id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error("Delete order error:", error);
    res.status(500).json({ message: "Failed to delete order" });
  }
};
