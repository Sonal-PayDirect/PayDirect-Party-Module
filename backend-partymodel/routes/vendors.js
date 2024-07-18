const express = require('express');
const router = express.Router();
const { getAllVendors, createVendor } = require('../handlers/vendorHandlers');

router.get('/', getAllVendors);
router.post('/', createVendor);

module.exports = router;
