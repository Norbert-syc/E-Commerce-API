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
 */
router.get("/", authMiddleware, controller.getCart);

/**
 * @swagger
 * /api/carts/all:
 *   get:
 *     tags: [carts]
 *     summary: Get all carts (Admin)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: All carts with total amounts
 */
router.get("/all", authMiddleware, controller.getAllCarts);

/**
 * @swagger
 * /api/carts/items:
 *   post:
 *     tags: [carts]
 *     summary: Add product to cart
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
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
 * /api/carts/update:
 *   put:
 *     tags: [carts]
 *     summary: Update cart item quantity
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *               quantity:
 *                 type: number
 *     responses:
 *       200:
 *         description: Cart updated
 */
router.put("/update", authMiddleware, controller.updateCartItem);

/**
 * @swagger
 * /api/carts/remove:
 *   delete:
 *     tags: [carts]
 *     summary: Remove item from cart
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Item removed
 */
router.delete("/remove", authMiddleware, controller.removeFromCart);

/**
 * @swagger
 * /api/carts/clear:
 *   delete:
 *     tags: [carts]
 *     summary: Clear entire cart
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Cart cleared
 */
router.delete("/clear", authMiddleware, controller.clearCart);

/**
 * @swagger
 * /api/carts/items/{productId}:
 *   delete:
 *     tags: [carts]
 *     summary: Remove specific item by ID
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
 *         description: Item removed
 */
router.delete("/items/:productId", authMiddleware, controller.removeCartItem);

export default router;
