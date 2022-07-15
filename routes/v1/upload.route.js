const express = require('express');
const uploadController = require('../../controllers/upload.controller');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const router = express.Router();

router.post('/', upload.single('fileName'), uploadController.upload);
module.exports = router;
/**
 * @swagger
 * tags:
 *   name: Upload
 *   description: Upload media .
 */

/**
 * @swagger
 * /upload:
 *   post:
 *     summary: Upload media
 *     tags: [Upload]
 *     consumes:
 *         - multipart/form-data
 *         - application/x-www-form-urlencoded
 *         - binary
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               fileName:
 *                 type: string
 *                 format: binary
 *     responses:
 *       "200":
 *         description: SUCCESS
 */
