import { Router } from "express";

import {updateUserRole, fixCategoryIndex} from "../Controllers/adminController";
import { authMiddleware } from "../middleware/authMiddleware";
import {requireRole} from"../middleware/roleMiddleware";

const router = Router();



/**
 * @swagger
 * /api/admin/users/{id}/role:
 *   patch:
 *     summary: Update a user's role
 *     tags: [auth]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               role:
 *                 type: string
 *                 enum: [user, admin, vendor]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User role updated successfully
 *       403:
 *         description: Access Denied
 */
router.patch(
  "/users/:id/role",
  authMiddleware,
  requireRole(["admin"]),
  updateUserRole,
);

router.post(
  "/fix-category-index",
  authMiddleware,
  requireRole(["admin"]),
  fixCategoryIndex,
);


export default router;