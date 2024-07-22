const express = require('express');
const router = express.Router();
const { getParties, createParty, updateParty, deleteParty, getPartyById } = require('../handlers/partyHandlers');

router.get('/', getParties);
router.post('/', createParty);
router.get('/:partyId', getPartyById);
router.put('/:partyId', updateParty);
router.delete('/:partyId', deleteParty);

module.exports = router;
