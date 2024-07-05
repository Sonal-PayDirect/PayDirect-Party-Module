const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Party = require('./Party');

const Customer = sequelize.define('Customer', {
  customer_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  party_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Party,
      key: 'party_id',
    },
  },
  customer_code: {
    type: DataTypes.STRING,
  },
});

Customer.belongsTo(Party, { foreignKey: 'party_id' });

module.exports = Customer;
