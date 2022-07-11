const express = require('express');
const categoryController = require('../../controllers/category.controller');
const authAdmin = require('../../middlewares/authAdmin');

const router = express.Router();

router.get('', categoryController.getCategories);
router.post('/add', authAdmin, categoryController.addCategory);
router.put('/:id/edit', authAdmin, categoryController.editCategory);
router.delete('/:id/delete', authAdmin, categoryController.deleteCategory);


module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Catgory
 *   description: Only admins can update categories.
 */

/**
 * @swagger
 * /category:
 *   get:
 *     summary: Get categories
 *     tags: [Catgory]
 *     responses:
 *       "200":
 *         description: SUCCESS
 */

/**
 * @swagger
 * /category/add:
 *   post:
 *     summary: Add category
 *     tags: [Catgory]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *             example:
 *               name: python
 *     responses:
 *       "200":
 *         description: SUCCESS
 */

/**
 * @swagger
 * /category/{id}/edit:
 *   put:
 *     summary: Edit category
 *     tags: [Catgory]
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
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *             example:
 *               name: python
 *     responses:
 *       "200":
 *         description: SUCCESS
 */

/**
 * @swagger
 * /category/{id}/delete:
 *   delete:
 *     summary: Delete category
 *     tags: [Catgory]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: SUCCESS
 */
