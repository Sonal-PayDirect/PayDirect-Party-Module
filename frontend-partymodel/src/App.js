// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import PartyList from './components/PartyList';
import PartyForm from './components/PartyForm';
import MerchantList from './components/MerchantList';
import VendorList from './components/VendorList';
import CustomerList from './components/CustomerList';

const App = () => {
  return (
    <Router>
      <nav>
        <ul>
          <li><Link to="/">Party List</Link></li>
          <li><Link to="/create">Create Party</Link></li>
          <li><Link to="/merchants">Merchant List</Link></li>
          <li><Link to="/vendors">Vendor List</Link></li>
          <li><Link to="/customers">Customer List</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<PartyList />} />
        <Route path="/create" element={<PartyForm />} />
        <Route path="/merchants" element={<MerchantList />} />
        <Route path="/vendors" element={<VendorList />} />
        <Route path="/customers" element={<CustomerList />} />
      </Routes>
    </Router>
  );
};

export default App;
