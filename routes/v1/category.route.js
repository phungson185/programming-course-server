const express = require('express');
const categoryController = require('../../controllers/category.controller');
const authAdmin = require('../../middlewares/authAdmin');

const router = express.Router();

router.get('', categoryController.getCategories);
router.get('/:id', categoryController.getCategoryById);
router.post('/add', authAdmin, categoryController.addCategory);
router.put('/:id/edit', authAdmin, categoryController.editCategory);
router.delete('/:id/delete', authAdmin, categoryController.deleteCategory);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Category
 *   description: Only admins can update categories.
 */

/**
 * @swagger
 * /category:
 *   get:
 *     summary: Get categories
 *     tags: [Category]
 *     responses:
 *       "200":
 *         description: SUCCESS
 */

/**
 * @swagger
 * /category/add:
 *   post:
 *     summary: Add category
 *     tags: [Category]
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
 * /category/{id}:
 *   get:
 *     summary: Get category by id
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: CategoryId
 *     responses:
 *       "200":
 *         description: SUCCESS
 */

/**
 * @swagger
 * /category/{id}/edit:
 *   put:
 *     summary: Edit category
 *     tags: [Category]
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
 *     tags: [Category]
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
