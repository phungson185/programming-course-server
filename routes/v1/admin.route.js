const express = require('express');
const adminController = require('../../controllers/admin.controller');
const authAdmin = require('../../middlewares/authAdmin');

const router = express.Router();

router.get('/:id', authAdmin, adminController.getInfo);
router.get('/course/:id', authAdmin, adminController.getInfoCourse);

module.exports = router;
/**
 * @swagger
 * tags:
 *   name: Dashboard
 *   description: Only admins can dashboard .
 */

/**
 * @swagger
 * /dashboard/{id}:
 *   get:
 *     summary: Get course
 *     tags: [Dashboard]
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
/**
 * @swagger
 * /dashboard/course/{id}:
 *   get:
 *     summary: Get course
 *     tags: [Dashboard]
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
