// routes/parties.js
const express = require('express');
const router = express.Router();
const Party = require('../models/Party');

router.get('/', async (req, res) => {
  try {
    const parties = await Party.findAll();
    res.json(parties);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching parties' });
  }
});

router.post('/', async (req, res) => {
  try {
    const party = await Party.create(req.body);
    res.status(201).json(party);
  } catch (error) {
    res.status(500).json({ error: 'Error creating party' });
  }
});

module.exports = router;
