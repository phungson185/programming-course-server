const express = require('express');
const courseController = require('../../controllers/course.controller');
const authAdmin = require('../../middlewares/authAdmin');

const router = express.Router();

router.post('/add', authAdmin, courseController.addCourse);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Course
 *   description: Only admins can update course.
 */

/**
 * @swagger
 * /course/add:
 *   post:
 *     summary: Add course
 *     tags: [Course]
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
 *               - description
 *               - image
 *               - categoryId
 *               - lessons
 *               - quiz
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               image:
 *                 type: string
 *               categoryId:
 *                 type: string
 *               lessons:
 *                 type: array
 *               quiz:
 *                 type: object
 *             example:
 *               name: python course
 *               description: python course description
 *               image: https://www.example.com/image.png
 *               categoryId: 62cb8c8a4ce8cb5bc86fca42
 *               lessons: [{name: 'lesson 1', description: 'lesson 1 description', video: 'https://www.example.com/video.mp4'}, {name: 'lesson 2', description: 'lesson 2 description', video: 'https://www.example.com/video.mp4'}]
 *               quiz: {title: 'quiz 1', questions: [{question: 'question 1', answers: {A: 'answer 1', B: 'answer 2', C: 'answer 3', D: 'answer 4'}, correctAnswer: 'A'}, {question: 'question 2', answers: {A: 'answer 1', B: 'answer 2', C: 'answer 3', D: 'answer 4'}, correctAnswer: 'A'}]}
 *     responses:
 *       "200":
 *         description: SUCCESS
 */
