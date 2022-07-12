const express = require('express');
const uploadController = require('../../controllers/upload.controller');

const router = express.Router();

router.post('/', uploadController.upload);
module.exports = router;
