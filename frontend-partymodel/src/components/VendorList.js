// src/components/VendorList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const VendorList = () => {
  const [vendors, setVendors] = useState([]);

  useEffect(() => {
    fetchVendors();
  }, []);

  const fetchVendors = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/vendors`);
      setVendors(response.data);
    } catch (error) {
      console.error('Error fetching vendors:', error);
    }
  };

  return (
    <div>
      <h2>Vendor List</h2>
      <ul>
        {vendors.map(vendor => (
          <li key={vendor.vendor_id}>
            {vendor.Party.name} (website: {vendor.website})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VendorList;
