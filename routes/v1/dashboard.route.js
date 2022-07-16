const express = require('express');
const dashboardController = require('../../controllers/dashboard.controller');
const authAdmin = require('../../middlewares/authAdmin');

const router = express.Router();

router.get('', authAdmin, dashboardController.getDashboard);
router.get('/courseStatistics', authAdmin, dashboardController.getCourseStatistics);

module.exports = router;
/**
 * @swagger
 * tags:
 *   name: Dashboard
 *   description: Only admins can update dashboard.
 */

/**
 * @swagger
 * /dashboard:
 *   get:
 *     summary: Get dashboard
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       "200":
 *         description: SUCCESS
 */

/**
 * @swagger
 * /dashboard/courseStatistics:
 *   get:
 *     summary: Get course statistics
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       "200":
 *         description: SUCCESS
 */
