const Customer = require('../models/Customer');
const Party = require('../models/Party');

// Fetch all customers
const getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.findAll({ include: Party });
    res.json(customers);
  } catch (error) {
    console.error('Error fetching customers:', error);
    res.status(500).json({ error: 'Error fetching customers' });
  }
};

// Create a new customer
const createCustomer = async (req, res) => {
  try {
    const { name, email } = req.body;
    const party = {
      name,
      email,
      party_type: 'customer',
    };
    const newParty = await Party.create(party);
    const newCustomer = await Customer.create({ party_id: newParty.party_id });
    res.status(201).json(newCustomer);
  } catch (error) {
    console.error('Error creating customer:', error);
    res.status(500).json({ error: 'Error creating customer' });
  }
};

module.exports = {
  getAllCustomers,
  createCustomer,
};
