const express = require('express');
const router = express.Router();
const { getAllMerchants, createMerchant } = require('../handlers/merchantHandlers');

router.get('/', getAllMerchants);
router.post('/', createMerchant);

module.exports = router;
