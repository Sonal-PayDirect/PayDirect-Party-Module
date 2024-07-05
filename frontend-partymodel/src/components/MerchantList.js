// src/components/MerchantList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MerchantList = () => {
  const [merchants, setMerchants] = useState([]);

  useEffect(() => {
    fetchMerchants();
  }, []);

  const fetchMerchants = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/merchants');
      setMerchants(response.data);
    } catch (error) {
      console.error('Error fetching merchants:', error);
    }
  };

  return (
    <div>
      <h2>Merchant List</h2>
      <ul>
        {merchants.map(merchant => (
          <li key={merchant.merchant_id}>
            {merchant.business_name} (Party ID: {merchant.party_id})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MerchantList;
