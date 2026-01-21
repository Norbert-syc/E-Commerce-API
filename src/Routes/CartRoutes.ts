import express from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import * as controller from "../Controllers/CartController";

const router = express.Router();

/**
 * @swagger
 * /api/carts:
 *   get:
 *     tags: [carts]
 *     summary: Get logged-in user's cart
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Cart retrieved
 *       404:
 *         description: Cart not found
 */
router.get("/", authMiddleware, controller.getCart);

/**
 * @swagger
 * /api/carts/items:
 *   post:
 *     tags: [carts]
 *     summary: Add product to logged-in user's cart
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [productId, quantity]
 *             properties:
 *               productId:
 *                 type: string
 *               quantity:
 *                 type: number
 *     responses:
 *       200:
 *         description: Product added to cart
 */
router.post("/items", authMiddleware, controller.addToCart);

/**
 * @swagger
 * /api/carts/items/{productId}:
 *   put:
 *     tags: [carts]
 *     summary: Update quantity of a product in cart
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [quantity]
 *             properties:
 *               quantity:
 *                 type: number
 *     responses:
 *       200:
 *         description: Product quantity updated
 */
router.put("/items/:productId", authMiddleware, controller.updateCartItem);

/**
 * @swagger
 * /api/carts/items/{productId}:
 *   delete:
 *     tags: [carts]
 *     summary: Remove a product from cart
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product removed from cart
 */
router.delete("/items/:productId", authMiddleware, controller.removeCartItem);

/**
 * @swagger
 * /api/carts:
 *   delete:
 *     tags: [carts]
 *     summary: Clear all products in cart
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Cart cleared
 */
router.delete("/", authMiddleware, controller.clearCart);


export default router;
