const express = require('express');
const courseController = require('../../controllers/course.controller');
const authAdmin = require('../../middlewares/authAdmin');

const router = express.Router();

router.get('', courseController.getCourses);
router.get('/:id', courseController.getCourseById);
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
 * /course:
 *   get:
 *     summary: Get courses
 *     tags: [Course]
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Course name
 *       - in: query
 *         name: categoryId
 *         schema:
 *           type: string
 *         description: Course categoryId
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: sort by query in the form of field:desc/asc (ex. name:asc)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 10
 *         description: Maximum number of courses per page
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *     responses:
 *       "200":
 *         description: SUCCESS
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
 *               image: https://random.imagecdn.app/500/150
 *               categoryId: 62cb8c8a4ce8cb5bc86fca42
 *               lessons: [{name: 'lesson 1', description: 'lesson 1 description', video: 'https://www.youtube.com/watch?v=UL-gyDKblFQ'}, {name: 'lesson 2', description: 'lesson 2 description', video: 'https://www.youtube.com/watch?v=qbwXRAJCQrg'}]
 *               quiz: {title: 'quiz 1', questions: [{question: 'question 1', answers: {A: 'answer 1', B: 'answer 2', C: 'answer 3', D: 'answer 4'}, correctAnswer: 'A'}, {question: 'question 2', answers: {A: 'answer 1', B: 'answer 2', C: 'answer 3', D: 'answer 4'}, correctAnswer: 'A'}]}
 *     responses:
 *       "200":
 *         description: SUCCESS
 */

/**
 * @swagger
 * /course/{id}:
 *   get:
 *     summary: Get course
 *     tags: [Course]
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
