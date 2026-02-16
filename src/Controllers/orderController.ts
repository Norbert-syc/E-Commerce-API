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
 * @desc    Get all orders (ADMIN) or user's orders (USER)
 * @route   GET /api/orders
 * @access  Private
 */
export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const isAdmin = req.userRole === "admin";

    if (isAdmin) {
      const orders = await Order.find()
        .populate("userId", "name email")
        .sort({ createdAt: -1 });
      return res.status(200).json(orders);
    }

    if (!req.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const orders = await Order.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    console.error("Get orders error:", error);
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
    const id = req.params.id as string;
    
    console.log("Update status request:", {
      id,
      body: req.body,
      headers: req.headers['content-type']
    });

    // Accept status from body in various formats
    const status = req.body.status || req.body.orderStatus || req.body.newStatus;

    if (!status) {
      console.log("Status missing from body:", req.body);
      return res.status(400).json({ 
        message: "Status is required",
        received: req.body 
      });
    }

    const normalizedStatus = String(status).toLowerCase();
    const validStatuses = ["pending", "processing", "paid", "shipped"];
    
    if (!validStatuses.includes(normalizedStatus)) {
      return res.status(400).json({ 
        message: `Invalid status value. Must be one of: ${validStatuses.join(", ")}`,
        received: status
      });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: "Order not found" });
    }

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = normalizedStatus as "pending" | "processing" | "paid" | "shipped";
    await order.save();

    console.log("Order status updated successfully:", { id, newStatus: normalizedStatus });
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
