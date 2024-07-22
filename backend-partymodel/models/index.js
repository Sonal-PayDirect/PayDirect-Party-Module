const Party = require('./Party');
const Merchant = require('./Merchant');
const Vendor = require('./Vendor');
const Customer = require('./Customer');

// Define associations here
Merchant.belongsTo(Party, { foreignKey: 'party_id' });
Vendor.belongsTo(Party, { foreignKey: 'party_id' });
Customer.belongsTo(Party, { foreignKey: 'party_id' });

Party.hasOne(Merchant, { foreignKey: 'party_id' });
Party.hasOne(Vendor, { foreignKey: 'party_id' });
Party.hasOne(Customer, { foreignKey: 'party_id' });

module.exports = {
  Party,
  Merchant,
  Vendor,
  Customer,
};
