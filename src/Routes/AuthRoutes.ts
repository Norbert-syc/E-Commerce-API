import {Router } from 'express';
import { register, login } from '../Controllers/AuthController';

const router = Router();

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     tags: [auth]
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/registerRequest'
 *     responses:
 *       201:
 *         description: User registered successfully
 */
router.post("/register", register);


/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     tags: [auth]
 *     summary: Login user and get JWT
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/loginRequest'
 *     responses:
 *       200:
 *         description: Login successful
 */
router.post("/login", login);



export default router;