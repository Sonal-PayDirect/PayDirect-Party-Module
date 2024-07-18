const Merchant = require('../models/Merchant');
const Party = require('../models/Party');

// Fetch all merchants
const getAllMerchants = async (req, res) => {
  try {
    const merchants = await Merchant.findAll({ include: Party });
    res.json(merchants);
  } catch (error) {
    console.error('Error fetching merchants:', error);
    res.status(500).json({ error: 'Error fetching merchants' });
  }
};

// Create a new merchant
const createMerchant = async (req, res) => {
  try {
    const { name, email, phone, address, business_name, website } = req.body;
    const partyData = {
      name,
      email,
      phone,
      address,
      party_type: 'merchant',
    };

    const newParty = await Party.create(partyData);
    const merchantData = {
      party_id: newParty.party_id,
      business_name,
      website,
    };

    const newMerchant = await Merchant.create(merchantData);
    res.status(201).json({ party: newParty, merchant: newMerchant });
  } catch (error) {
    console.error('Error creating merchant:', error);
    res.status(500).json({ error: 'Error creating merchant' });
  }
};

module.exports = {
  getAllMerchants,
  createMerchant,
};
