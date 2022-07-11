const express = require('express');
const attendanceController = require('../../controllers/attendance.controller');
const authUser = require('../../middlewares/authUser');

const router = express.Router();

router.post('/add', authUser, attendanceController.addAttendance);
router.get('/:userId/:courseId', authUser, attendanceController.getAttendanceByUserIdAndCourseId);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Attendance
 *   description: Attendance
 */

/**
 * @swagger
 * /attendance/add:
 *   post:
 *     summary: Add attendance
 *     tags: [Attendance]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - courseId
 *             properties:
 *               userId:
 *                 type: string
 *               courseId:
 *                 type: string
 *             example:
 *               userId: 5e9f8c8a4ce8cb5bc86fca42
 *               courseId: 5e9f8c8a4ce8cb5bc86fca42
 *     responses:
 *       "200":
 *         description: SUCCESS
 */

/**
 * @swagger
 * /attendance/{userId}/{courseId}:
 *   get:
 *     summary: Get attendance by userId and courseId
 *     tags: [Attendance]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: UserId
 *       - in: path
 *         name: courseId
 *         required: true
 *         schema:
 *           type: string
 *         description: CourseId
 *     responses:
 *       "200":
 *         description: SUCCESS
 */