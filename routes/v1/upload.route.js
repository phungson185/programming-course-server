const express = require('express');
const uploadController = require('../../controllers/upload.controller');

const router = express.Router();

router.post('/', uploadController.upload);
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
 *     parameters:
 *       - in: formData
 *         name: imageFiles
 *         required: true
 *         schema:
 *           type: file
 *     responses:
 *       "200":
 *         description: SUCCESS
 */
