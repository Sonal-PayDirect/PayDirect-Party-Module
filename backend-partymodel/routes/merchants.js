// routes/merchants.js
const express = require('express');
const router = express.Router();
const Merchant = require('../models/Merchant');
const Party = require('../models/Party');

router.get('/', async (req, res) => {
  try {
    const merchants = await Merchant.findAll({ include: Party });
    res.json(merchants);
  } catch (error) {
    console.error('Error fetching merchants:', error);
    res.status(500).json({ error: 'Error fetching merchants' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { name, email, phone, address, business_name, website } = req.body;
    const partyData = {
      name,
      email,
      phone,
      address,
      party_type: 'merchant'
    };
    console.log('Party data:', partyData); // Log the party data being received

    const newParty = await Party.create(partyData);

    const merchantData = {
      party_id: newParty.party_id,
      business_name,
      website
    };
    console.log('Merchant data:', merchantData); // Log the merchant data being created

    const newMerchant = await Merchant.create(merchantData);

    res.status(201).json({ party: newParty, merchant: newMerchant });
  } catch (error) {
    console.error('Error creating merchant:', JSON.stringify(error, null, 2)); // Log the detailed error
    res.status(500).json({ error: 'Error creating merchant' });
  }
});

module.exports = router;
