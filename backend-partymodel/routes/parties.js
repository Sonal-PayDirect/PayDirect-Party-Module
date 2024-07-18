const express = require('express');
const router = express.Router();
const { getParties, createParty, updateParty, deleteParty } = require('../handlers/partyHandlers');

router.get('/', getParties);
router.post('/', createParty);
router.put('/:partyId', updateParty);
router.delete('/:partyId', deleteParty);

module.exports = router;
