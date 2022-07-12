const express = require('express');
const userController = require('../../controllers/user.controller');
const authAdmin = require('../../middlewares/authAdmin');

const router = express.Router();

router.get('', authAdmin, userController.getUsers);
router.get('/:id', authAdmin, userController.getUserById);
router.put('/:id', authAdmin, userController.updateUserById);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: User
 *   description: Only admins can update users.
 */

/**
 * @swagger
 * /user:
 *   get:
 *     summary: Get list users
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       "200":
 *         description: SUCCESS
 */

/**
 * @swagger
 * /user/{id}:
 *   get:
 *     summary: Get user by id
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: UserId
 *     responses:
 *       "200":
 *         description: SUCCESS
 */

/**
 * @swagger
 * /user/{id}:
 *   put:
 *     summary: Update user
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
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
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *             example:
 *               name: test
 *               email: test@gmail.com
 *     responses:
 *       "200":
 *         description: SUCCESS
 */
