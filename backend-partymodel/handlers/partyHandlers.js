const { Party, Merchant, Vendor, Customer } = require('../models');
const {sequelize} = require('../config/database');

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


async function getPartyById(req, res) {
  try {
    const { partyId } = req.params;
    console.log(`Fetching party with ID: ${partyId}`);

    const party = await Party.findByPk(partyId);
    console.log(`Party found: ${party}`);

    if (!party) {
      return res.status(404).json({ message: 'Party not found' });
    }

    let businessName = '';
    let website = '';

    switch (party.party_type) {
      case 'merchant':
        const merchant = await Merchant.findOne({ where: { party_id: partyId } });
        if (merchant) {
          businessName = merchant.business_name;
          website = merchant.website;
        }
        break;
      case 'vendor':
        const vendor = await Vendor.findOne({ where: { party_id: partyId } });
        if (vendor) {
          businessName = vendor.business_name;
          website = vendor.website;
        }
        break;
      case 'customer':
        // Handle customer-specific fields if any
        break;
    }

    const partyDetails = {
      party_id: party.party_id,
      name: party.name,
      email: party.email,
      phone: party.phone,
      address: party.address,
      party_type: party.party_type,
      business_name: businessName,
      website: website
    };

    res.status(200).json(partyDetails);
  } catch (error) {
    console.error('Error fetching party:', error);
    res.status(500).json({ error: 'Error fetching party 1' });
  }
}


async function updateParty(req, res) {
  try {
    const { partyId } = req.params;
    const { name, email, phone, address, party_type, business_name, website } = req.body;
    const partyData = { name, email, phone, address, party_type };

    // Fetch the current party data
    const party = await Party.findByPk(partyId);

    if (!party) {
      return res.status(404).json({ message: 'Party not found' });
    }

    const currentPartyType = party.party_type;

    // Update the Party
    await Party.update(partyData, { where: { party_id: partyId } });

    // Check if party type has changed
    if (currentPartyType !== party_type) {
      // Delete from current party type table
      switch (currentPartyType) {
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

      // Insert into the new party type table
      switch (party_type) {
        case 'merchant':
          await Merchant.create({ party_id: partyId, business_name, website });
          break;
        case 'vendor':
          await Vendor.create({ party_id: partyId, business_name, website });
          break;
        case 'customer':
          await Customer.create({ party_id: partyId });
          break;
      }
    } else {
      // Update the respective party type table
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
    }

    res.status(200).json({ message: 'Party updated successfully' });
  } catch (error) {
    console.error('Error updating party:', error);
    res.status(500).json({ error: 'Error updating party' });
  }
}

async function deleteParty(req, res) {
  try {
    const { partyId } = req.params;

    // Fetch the party to determine its type
    const party = await Party.findByPk(partyId);
    if (!party) {
      return res.status(404).json({ message: 'Party not found' });
    }

    // Delete related records based on party type
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
      default:
        // Handle unknown party types if necessary
        break;
    }

    // Delete the party record itself
    await Party.destroy({ where: { party_id: partyId } });

    res.status(200).json({ message: 'Party deleted successfully' });
  } catch (error) {
    console.error('Error deleting party:', error);
    res.status(500).json({ error: 'Error deleting party' });
  }
}


module.exports = { getParties, createParty, updateParty, deleteParty, getPartyById };
