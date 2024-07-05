// src/components/PartyList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PartyList = () => {
  const [parties, setParties] = useState([]);

  useEffect(() => {
    fetchParties();
  }, []);

  const fetchParties = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/parties');
      setParties(response.data);
    } catch (error) {
      console.error('Error fetching parties:', error);
    }
  };

  return (
    <div>
      <h2>Party List</h2>
      <ul>
        {parties.map(party => (
          <li key={party.party_id}>
            {party.name} ({party.party_type})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PartyList;
