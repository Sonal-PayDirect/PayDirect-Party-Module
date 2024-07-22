import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ConfirmationDialog from './ConfirmationDialog';

const PartyForm = () => {
  const [partyId, setPartyId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [partyType, setPartyType] = useState('merchant');
  const [businessName, setBusinessName] = useState('');
  const [website, setWebsite] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);
  const [parties, setParties] = useState([]);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [deletePartyId, setDeletePartyId] = useState(null);

  useEffect(() => {
    const fetchParties = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/parties`);
        setParties(response.data);
      } catch (error) {
        console.error('Error fetching parties', error);
      }
    };

    fetchParties();
  }, []);

  const handleSelectParty = async (id) => {
    try {
      console.log(`Fetching party with ID: ${id}`); // Log the id
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/parties/${id}`);
      const party = response.data;
      console.log(`Party fetched: ${JSON.stringify(party)}`); // Log the response
      setPartyId(party.party_id);
      setName(party.name);
      setEmail(party.email);
      setPhone(party.phone);
      setAddress(party.address);
      setPartyType(party.party_type);
      setBusinessName(party.business_name || '');
      setWebsite(party.website || '');
      setIsEditMode(true);
    } catch (error) {
      console.error('Error fetching party', error);
    }
  };
  const handleDeleteParty = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/api/parties/${id}`);
      console.log('Party deleted successfully');
      setParties(parties.filter(party => party.party_id !== id));
      setShowConfirmDialog(false);
      setDeletePartyId(null);
    } catch (error) {
      console.error('Error deleting party', error);
    }
  };

  const handleConfirmDelete = (id) => {
    setShowConfirmDialog(true);
    setDeletePartyId(id);
  };

  const handleCancelDelete = () => {
    setShowConfirmDialog(false);
    setDeletePartyId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const partyData = {
      name,
      email,
      phone,
      address,
      party_type: partyType,
      business_name: businessName,
      website
    };

    try {
      if (isEditMode) {
        await axios.put(`${process.env.REACT_APP_API_BASE_URL}/api/parties/${partyId}`, partyData);
        console.log('Party updated successfully');
      } else {
        await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/parties`, partyData);
        console.log('Party created successfully');
      }

      // Reset form and state
      setPartyId('');
      setName('');
      setEmail('');
      setPhone('');
      setAddress('');
      setPartyType('merchant');
      setBusinessName('');
      setWebsite('');
      setIsEditMode(false);

      // Refetch parties to update the list
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/parties`);
      setParties(response.data);
    } catch (error) {
      console.error('Error submitting party', error);
    }
  };

  return (
    <div>
      <h1>{isEditMode ? 'Edit Party' : 'Create Party'}</h1>
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
              />
            </div>
            <div>
              <label>Website:</label>
              <input
                type="text"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
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
              />
            </div>
            <div>
              <label>Website:</label>
              <input
                type="text"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              />
            </div>
          </>
        )}
        <button type="submit">{isEditMode ? 'Update Party' : 'Create Party'}</button>
      </form>

      <h2>Edit or Delete an Existing Party</h2>
      <ul>
        {parties.map((party) => (
          <li key={party.party_id}>
            {party.name} ({party.party_type})
            <button onClick={() => handleSelectParty(party.party_id)}>Edit</button>
            <button onClick={() => handleConfirmDelete(party.party_id)}>Delete</button>
          </li>
        ))}
      </ul>

      {showConfirmDialog && (
        <ConfirmationDialog
          message="Are you sure you want to delete this party?"
          onConfirm={() => handleDeleteParty(deletePartyId)}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  );
};

export default PartyForm;
