// models/Vendor.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Party = require('./Party');

const Vendor = sequelize.define('Vendor', {
  vendor_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  party_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Party,
      key: 'party_id'
    },
    allowNull: false
  },
  business_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  website: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  timestamps: true
});

Vendor.belongsTo(Party, { foreignKey: 'party_id' });

module.exports = Vendor;
