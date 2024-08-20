const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./config/database');
const Party = require('./models/Party');
const Merchant = require('./models/Merchant');
const Vendor = require('./models/Vendor');
const Customer = require('./models/Customer');
const partyRoutes = require('./routes/parties');
const merchantRoutes = require('./routes/merchants');
const vendorRoutes = require('./routes/vendors');
const customerRoutes = require('./routes/customers');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/parties', partyRoutes);
app.use('/api/merchants', merchantRoutes);
app.use('/api/vendors', vendorRoutes);
app.use('/api/customers', customerRoutes);

sequelize.sync({ force: false }).then(() => {
  app.listen(3001, () => {
    console.log('Server is running on port 3001');
  });
});
