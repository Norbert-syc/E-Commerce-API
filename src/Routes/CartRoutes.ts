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
router.post("/items", authMiddleware, controller.addToCart);
router.put("/update", authMiddleware, controller.updateCartItem);
router.delete("/remove", authMiddleware, controller.removeFromCart);

export default router;
