// routes/vendors.js
const express = require('express');
const router = express.Router();
const Vendor = require('../models/Vendor');
const Party = require('../models/Party');

router.get('/', async (req, res) => {
  try {
    const vendors = await Vendor.findAll({ include: Party });
    res.json(vendors);
  } catch (error) {
    console.error('Error fetching vendors:', error);
    res.status(500).json({ error: 'Error fetching vendors' });
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
      party_type: 'vendor'
    };
    console.log('Party data:', partyData); // Log the party data being received

    const newParty = await Party.create(partyData);

    const vendorData = {
      party_id: newParty.party_id,
      business_name,
      website
    };
    console.log('Vendor data:', vendorData); // Log the vendor data being created

    const newVendor = await Vendor.create(vendorData);

    res.status(201).json({ party: newParty, vendor: newVendor });
  } catch (error) {
    console.error('Error creating vendor:', JSON.stringify(error, null, 2)); // Log the detailed error
    res.status(500).json({ error: 'Error creating vendor' });
  }
});

module.exports = router;
