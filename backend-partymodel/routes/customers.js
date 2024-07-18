const express = require('express');
const router = express.Router();
const { getAllCustomers, createCustomer } = require('../handlers/customerHandlers');

router.get('/', getAllCustomers);
router.post('/', createCustomer);

module.exports = router;
