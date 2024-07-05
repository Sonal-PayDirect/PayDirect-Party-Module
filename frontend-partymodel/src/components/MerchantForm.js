import React, { useState } from 'react';
import axios from 'axios';

const MerchantForm = () => {
  const [merchant, setMerchant] = useState({
    name: '',
    business_name: '',
    tax_id: '',
    website: '',
    contact_person: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMerchant({ ...merchant, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/merchants', merchant)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" placeholder="Name" value={merchant.name} onChange={handleChange} required />
      <input type="text" name="business_name" placeholder="Business Name" value={merchant.business_name} onChange={handleChange} required />
      <input type="text" name="tax_id" placeholder="Tax ID" value={merchant.tax_id} onChange={handleChange} required />
      <input type="text" name="website" placeholder="Website" value={merchant.website} onChange={handleChange} />
      <input type="text" name="contact_person" placeholder="Contact Person" value={merchant.contact_person} onChange={handleChange} required />
      <button type="submit">Add Merchant</button>
    </form>
  );
};

export default MerchantForm;
