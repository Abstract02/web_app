import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Grid } from '@mui/material';

function UpdateVendorProducts() {
  const [mobileNumber, setMobileNumber] = useState('');
  const [vendorData, setVendorData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    try {
      setLoading(true);
      // Make an API call to fetch vendor data based on mobile number
      const response = await axios.get(`https://swrielapp.onrender.com/user/vendor/search?phone=${mobileNumber}`);
      setVendorData(response.data.result);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching vendor data:', error);
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Update Vendor Products</h1>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <TextField
            label="Enter Mobile Number"
            variant="outlined"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
          />
        </Grid>
        <Grid item>
          <Button onClick={handleSearch} disabled={loading} variant="contained">
            {loading ? 'Searching...' : 'Search'}
          </Button>
        </Grid>
      </Grid>
      {vendorData && (
        <div>
          {/* Display vendor data here */}
          <p>Vendor ID: {vendorData._id}</p>
          <p>Owner Name: {vendorData.ownername}</p>
          <p>Store Name: {vendorData.storename}</p>
          {/* Add more vendor details as needed */}
        </div>
      )}
    </div>
  );
}

export default UpdateVendorProducts;
