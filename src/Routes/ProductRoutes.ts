import express from "express";
import { authMiddleware } from '../middleware/authMiddleware';
import * as controller from "../Controllers/ProductController";
import { requireRole } from "../middleware/roleMiddleware";

const router = express.Router();



/**
 * @swagger
 * /api/products:
 *   post:
 *     tags: [products]
 *     summary: Create product (Admin/Vendor only)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/product'
 *     responses:
 *       201:
 *         description: Product created
 *       403:
 *         description: Forbidden
 */
router.post("/", requireRole(["admin","vendor"]), controller.createProduct);

/**
 * @swagger
 * /api/products:
 *   get:
 *     tags: [products]
 *     summary: Get all products
 *     responses:
 *       200:
 *         description: List of products
 */

router.get("/", controller.getProducts);

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     tags: [products]
 *     summary: Get product by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product found
 *       404:
 *         description: Product not found
 */

router.get("/:id",  controller.getProductById);


/**
 * @swagger
 * /api/products:
 *   post:
 *     tags: [products]
 *     summary: Create a product
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/product'
 *     responses:
 *       201:
 *         description: Product created
 */
router.post("/", authMiddleware, controller.createProduct);

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     tags: [products]
 *     summary: Update a product
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/product'
 *     responses:
 *       200:
 *         description: Product updated
 *       404:
 *         description: Product not found
 */
router.put("/:id", authMiddleware, controller.updateProduct);

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     tags: [products]
 *     summary: Delete a product
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Product deleted
 *       404:
 *         description: Product not found
 */
router.delete("/:id", authMiddleware, controller.deleteProduct);

export default router;
