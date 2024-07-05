const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('PayDirect', null, null, {
  host: 'dTech-dev-1',
  dialect: 'mssql',
  dialectOptions: {
    authentication: {
      type: 'ntlm',
      options: {
        domain: 'dTech-dev-1',  // Your domain name
        userName: 'sonal',  // Your Windows username
        password: 'tech-dev-2@2024',  // Your Windows password
      },
    },
    options: {
      encrypt: true,  // Depending on your server configuration
      trustServerCertificate: true,  // Use this if you're dealing with self-signed certificates
    },
  },
});

module.exports = sequelize;
