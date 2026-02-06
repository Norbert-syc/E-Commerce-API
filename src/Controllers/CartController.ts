import { Request, Response } from "express";
import CartSchema from "../Models/CartSchema";

export const getCart = async (req: Request, res: Response) => {
  try {
    const userId = req.userId as string;
    let cart = await CartSchema.findOne({ userId }).populate('items.productId');
    
    if (!cart) {
      cart = new CartSchema({ userId, items: [] });
      await cart.save();
    }
    
    const totalAmount = cart.items.reduce((sum, item: any) => {
      return sum + (item.productId?.price || 0) * item.quantity;
    }, 0);
    
    res.json({ ...cart.toObject(), totalAmount });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const addToCart = async (req: Request, res: Response) => {
  try {
    const userId = req.userId as string;
    const { productId, quantity = 1 } = req.body;
    
    if (!productId) {
      return res.status(400).json({ message: "ProductId is required" });
    }

    let cart = await CartSchema.findOne({ userId });
    if (!cart) {
      cart = new CartSchema({ userId, items: [] });
    }

    const existingItem = cart.items.find(item => item.productId.toString() === productId);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }

    await cart.save();
    const populatedCart = await CartSchema.findById(cart._id).populate('items.productId');
    res.json({ message: "Item added to cart", cart: populatedCart });
  } catch (error) {
    console.error('Cart error:', error);
    res.status(500).json({ message: "Failed to add to cart" });
  }
};

export const updateCartItem = async (req: Request, res: Response) => {
  try {
    const userId = req.userId as string;
    const { productId, quantity } = req.body;
    
    const cart = await CartSchema.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const item = cart.items.find(item => item.productId.toString() === productId);
    if (!item) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    item.quantity = quantity;
    await cart.save();
    const populatedCart = await CartSchema.findById(cart._id).populate('items.productId');
    res.json({ message: "Cart updated", cart: populatedCart });
  } catch (error) {
    res.status(500).json({ message: "Failed to update cart" });
  }
};

export const removeFromCart = async (req: Request, res: Response) => {
  try {
    const userId = req.userId as string;
    const { productId } = req.body;
    
    const cart = await CartSchema.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = cart.items.filter(item => item.productId.toString() !== productId);
    await cart.save();
    const populatedCart = await CartSchema.findById(cart._id).populate('items.productId');
    res.json({ message: "Item removed", cart: populatedCart });
  } catch (error) {
    res.status(500).json({ message: "Failed to remove item" });
  }
};

export const clearCart = async (req: Request, res: Response) => {
  try {
    const userId = req.userId as string;
    
    const cart = await CartSchema.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = [];
    await cart.save();
    res.json({ message: "Cart cleared", cart });
  } catch (error) {
    res.status(500).json({ message: "Failed to clear cart" });
  }
};

export const removeCartItem = async (req: Request, res: Response) => {
  try {
    const userId = req.userId as string;
    const { productId } = req.params;
    
    const cart = await CartSchema.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = cart.items.filter(item => item.productId.toString() !== productId);
    await cart.save();
    const populatedCart = await CartSchema.findById(cart._id).populate('items.productId');
    res.json({ message: "Item removed", cart: populatedCart });
  } catch (error) {
    res.status(500).json({ message: "Failed to remove item" });
  }
};

export const getAllCarts = async (req: Request, res: Response) => {
  try {
    const carts = await CartSchema.find().populate('items.productId');
    
    const cartsWithTotal = carts.map(cart => {
      const totalAmount = cart.items.reduce((sum, item: any) => {
        return sum + (item.productId?.price || 0) * item.quantity;
      }, 0);
      return { ...cart.toObject(), totalAmount };
    });
    
    res.json(cartsWithTotal);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch carts" });
  }
};