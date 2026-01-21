import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware';
import * as controller from '../Controllers/CategoryController';

const router = express.Router();

/**
 * @swagger
 * /api/categories:
 *   get:
 *     tags: [categories]
 *     summary: Get all categories
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of categories
 */


router.get('/',  controller.getCategories);

/**
 * @swagger
 * /api/categories/{id}:
 *   get:
 *     tags: [categories]
 *     summary: Get category by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Category found
 *       404:
 *         description: Category not found
 */

router.get("/:id",  controller.getCategoriesById);

/**
 * @swagger
 * /api/categories:
 *   post:
 *     tags: [categories]
 *     summary: Create a category
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Category created
 */
router.post('/', authMiddleware, controller.createCategory);


/**
 * @swagger
 * /api/categories/{id}:
 *   put:
 *     tags: [categories]
 *     summary: Update a category
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
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       200:
 *         description: Category updated
 *       404:
 *         description: Category not found
 */

router.put('/:id', authMiddleware, controller.updateCategory);

/**
 * @swagger
 * /api/categories/{id}:
 *   delete:
 *     tags: [categories]
 *     summary: Delete a category
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Category deleted
 *       404:
 *         description: Category not found
 */

router.delete('/:id', authMiddleware, controller.deleteCategory);
export default router;