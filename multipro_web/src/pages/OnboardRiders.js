import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Container, Typography, Card, TextField, Button, Grid } from '@mui/material';

const OnboardRiders = () => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        emergencyContactName: '',
        emergencyContactPhone: '',
        email: '',
        bloodGroup: '',
        fullAddress: '',
        vehicleNumber: '',
        vehicleModel: '',
        riderPhoto: '',
        aadharCard: '',
        dl: '',
        vehiclePhoto: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: files[0], 
        }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission, e.g., send data to backend API
        console.log(formData);
       
        setFormData({
            name: '',
            phone: '',
            emergencyContactName: '',
            emergencyContactPhone: '',
            email: '',
            bloodGroup: '',
            fullAddress: '',
            vehicleNumber: '',
            vehicleModel: '',
            riderPhoto: '',
            aadharCard: '',
            dl: '',
            vehiclePhoto: ''
        });
    };

    return (
        <>
            <Helmet>
                <title>Rider | Minimal UI</title>
            </Helmet>

            <Container>
                <Typography variant="h4" gutterBottom>
                    Onboard Riders
                </Typography>

                <Card sx={{ p: 3 }}>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                            <Grid item xs={6}>
                                <TextField fullWidth label="Name" name="name" value={formData.name} onChange={handleChange} required />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField fullWidth label="Phone" type="number" name="phone" value={formData.phone} onChange={handleChange} required />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField fullWidth label="Emergency Contact Name" name="emergencyContactName" value={formData.emergencyContactName} onChange={handleChange} required />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField fullWidth label="Emergency Contact Phone" type="number" name="emergencyContactPhone" value={formData.emergencyContactPhone} onChange={handleChange} required />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField fullWidth label="Email" type="email" name="email" value={formData.email} onChange={handleChange} required />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField fullWidth label="Blood Group" name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} required />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField fullWidth label="Full Address" name="fullAddress" value={formData.fullAddress} onChange={handleChange} required />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField fullWidth label="Vehicle Number" name="vehicleNumber" value={formData.vehicleNumber} onChange={handleChange} required />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField fullWidth label="Vehicle Model" name="vehicleModel" value={formData.vehicleModel} onChange={handleChange} />
                            </Grid>
                            <Grid item xs={6}>
                                <Typography gutterBottom>
                                    Rider Photo
                                    <span>*</span>
                                </Typography>
                                <input type="file" accept="image/*" name="riderPhoto" onChange={handleFileChange} required />
                            </Grid>
                            <Grid item xs={6}>
                                <Typography gutterBottom>
                                    Aadhar Card
                                    <span>*</span>
                                </Typography>
                                <input type="file" accept="image/*" name="aadharCard" onChange={handleFileChange} required />
                            </Grid>
                            <Grid item xs={6}>
                                <Typography gutterBottom>
                                    Driving License (DL)
                                    <span>*</span>
                                </Typography>
                                <input type="file" accept="image/*" name="dl" onChange={handleFileChange} required />
                            </Grid>
                            <Grid item xs={6}>
                                <Typography gutterBottom>
                                    Vehicle Photo
                                    <span>*</span>
                                </Typography>
                                <input type="file" accept="image/*" name="vehiclePhoto" onChange={handleFileChange} required />
                            </Grid>
                            <Grid item xs={12}>
                                <Button type="submit" variant="contained" color="primary">Submit</Button>
                            </Grid>
                        </Grid>
                    </form>
                </Card>
            </Container>
        </>
    );
};

export default OnboardRiders;
