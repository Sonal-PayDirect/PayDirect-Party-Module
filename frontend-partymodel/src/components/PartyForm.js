import React, { useState } from 'react';
import axios from 'axios';

const PartyForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [partyType, setPartyType] = useState('merchant');
  const [businessName, setBusinessName] = useState('');
  const [website, setWebsite] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const partyData = {
        name,
        email,
        phone,
        address,
        party_type: partyType,
        business_name: businessName,
        website
      };
      console.log('Party data:', partyData); // Log the party data being sent
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/${partyType}s`, partyData);
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error creating party', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Phone:</label>
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Address:</label>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Party Type:</label>
        <select value={partyType} onChange={(e) => setPartyType(e.target.value)}>
          <option value="merchant">Merchant</option>
          <option value="vendor">Vendor</option>
          <option value="customer">Customer</option>
        </select>
      </div>
      {partyType === 'merchant' && (
        <>
          <div>
            <label>Business Name:</label>
            <input
              type="text"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Website:</label>
            <input
              type="text"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              required
            />
          </div>
        </>
      )}
      {partyType === 'vendor' && (
        <>
          <div>
            <label>Business Name:</label>
            <input
              type="text"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Website:</label>
            <input
              type="text"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              required
            />
          </div>
        </>
      )}
      <button type="submit">Create Party</button>
    </form>
  );
};

export default PartyForm;
