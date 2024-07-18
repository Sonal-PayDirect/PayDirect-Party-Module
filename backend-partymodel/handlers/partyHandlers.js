const { Party, Merchant, Vendor, Customer } = require('../models');

async function getParties(req, res) {
  try {
    const parties = await Party.findAll();
    res.json(parties);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching parties' });
  }
}

async function createParty(req, res) {
  try {
    const { name, email, phone, address, party_type, business_name, website } = req.body;
    const partyData = { name, email, phone, address, party_type };
    const newParty = await Party.create(partyData);

    switch (party_type) {
      case 'merchant':
        await Merchant.create({ party_id: newParty.party_id, business_name, website });
        break;
      case 'vendor':
        await Vendor.create({ party_id: newParty.party_id, business_name, website });
        break;
      case 'customer':
        await Customer.create({ party_id: newParty.party_id });
        break;
    }

    res.status(201).json(newParty);
  } catch (error) {
    console.error('Error creating party:', error);
    res.status(500).json({ error: 'Error creating party' });
  }
}

async function updateParty(req, res) {
  try {
    const { partyId } = req.params;
    const { name, email, phone, address, party_type, business_name, website } = req.body;
    const partyData = { name, email, phone, address, party_type };
    const [updated] = await Party.update(partyData, { where: { party_id: partyId } });

    if (updated) {
      switch (party_type) {
        case 'merchant':
          await Merchant.update({ business_name, website }, { where: { party_id: partyId } });
          break;
        case 'vendor':
          await Vendor.update({ business_name, website }, { where: { party_id: partyId } });
          break;
        case 'customer':
          // Update customer specific fields if any
          break;
      }
      res.status(200).json({ message: 'Party updated successfully' });
    } else {
      res.status(404).json({ message: 'Party not found' });
    }
  } catch (error) {
    console.error('Error updating party:', error);
    res.status(500).json({ error: 'Error updating party' });
  }
}

async function deleteParty(req, res) {
  try {
    const { partyId } = req.params;

    const party = await Party.findByPk(partyId);
    if (!party) {
      return res.status(404).json({ message: 'Party not found' });
    }

    switch (party.party_type) {
      case 'merchant':
        await Merchant.destroy({ where: { party_id: partyId } });
        break;
      case 'vendor':
        await Vendor.destroy({ where: { party_id: partyId } });
        break;
      case 'customer':
        await Customer.destroy({ where: { party_id: partyId } });
        break;
    }

    await Party.destroy({ where: { party_id: partyId } });
    res.status(200).json({ message: 'Party deleted successfully' });
  } catch (error) {
    console.error('Error deleting party:', error);
    res.status(500).json({ error: 'Error deleting party' });
  }
}

module.exports = { getParties, createParty, updateParty, deleteParty };
