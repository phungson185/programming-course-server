const express = require('express');
const adminController = require('../../controllers/admin.controller');
const authAdmin = require('../../middlewares/authAdmin');

const router = express.Router();

router.get('/:id', authAdmin, adminController.getInfo);
module.exports = router;
