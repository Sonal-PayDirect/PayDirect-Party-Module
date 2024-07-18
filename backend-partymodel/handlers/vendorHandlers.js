const Vendor = require('../models/Vendor');
const Party = require('../models/Party');

// Fetch all vendors
const getAllVendors = async (req, res) => {
  try {
    const vendors = await Vendor.findAll({ include: Party });
    res.json(vendors);
  } catch (error) {
    console.error('Error fetching vendors:', error);
    res.status(500).json({ error: 'Error fetching vendors' });
  }
};

// Create a new vendor
const createVendor = async (req, res) => {
  try {
    const { name, email, phone, address, business_name, website } = req.body;
    const partyData = {
      name,
      email,
      phone,
      address,
      party_type: 'vendor',
    };

    const newParty = await Party.create(partyData);
    const vendorData = {
      party_id: newParty.party_id,
      business_name,
      website,
    };

    const newVendor = await Vendor.create(vendorData);
    res.status(201).json({ party: newParty, vendor: newVendor });
  } catch (error) {
    console.error('Error creating vendor:', error);
    res.status(500).json({ error: 'Error creating vendor' });
  }
};

module.exports = {
  getAllVendors,
  createVendor,
};
