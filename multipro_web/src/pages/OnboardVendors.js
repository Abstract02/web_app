import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Container, Typography, Card, TextField, Button, Grid, FormControl, InputLabel, Select, MenuItem, InputAdornment } from '@mui/material';
import axios from 'axios';
import instance from '../utils/axiosInstance';

const OnboardVendors = () => {
    const [formData, setFormData] = useState({
        shopName: '',
        contact: '', 
        shopPhone: '',
        name: '',
        shopType: '',
        shopAddress: '',
        shopCoordinates: { lat: '', lng: '' },
        shopSize: '',
        deliveryBoyAvailable: '',
        shopClosingTime: '',
        shopOpeningTime: '',
        shopBreakStartTime: '',
        shopBreakStopTime: '',
        GSTIN: '', 
        email: '', 
        documents: {
            shopPhoto: '',
            shopOwnerAadharCard: '',
            shopOwnerPhoto: ''
        }
    });

    const [uploadButtonVisibility, setUploadButtonVisibility] = useState({
        shopPhoto: false,
        shopOwnerAadharCard: false,
        shopOwnerPhoto: false
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (files) {
            setFormData((prevData) => ({
                ...prevData,
                [name]: files[0],
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const handleCoordinatesChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            shopCoordinates: {
                ...prevData.shopCoordinates,
                [name]: value
            }
        }));
    };

    const handleFileUpload = async (fieldName, fileTypeParam) => {
        try {
            const formDataToSend = new FormData();
            formDataToSend.append('file', formData[fieldName]);
            console.log(formData)
    
            const response = await instance.post(`/file/fileUpload?fileType=${fileTypeParam}`, formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            
    
            const { bucketName, fileName, fileType } = response.data.data;
    
            console.log('File uploaded successfully:');
            console.log('Bucket Name:', bucketName);
            console.log('File Name:', fileName);
            console.log('File Type:', fileType);
    
            // Update formData with file details
            setFormData((prevData) => ({
                ...prevData,
                documents: {
                    ...prevData.documents,
                    [fieldName]: {
                        bucketName,
                        fileName,
                        fileType,
                    }
                }
            }));
            toggleUploadButton(fieldName, false);
            
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formDataWithPrefix = {
                ...formData,
                contact: `+91${formData.contact}`,
            };

        console.log(formDataWithPrefix)
        // if (!formData.name) {
        //     console.error('Error: "name" is required');
        //     return;
        // }

        // Send formData to backend API
        const response = await instance.post('/admin/vendorOnboard', formDataWithPrefix, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        console.log('Form data sent successfully:', response.data);
    } catch (error) {
        console.error('Error submitting form data:', error);
    }
    
        // Reset the form data after submission
        setFormData({
            shopName: '',
            contact: '', 
            shopPhone: '',
            name: '',
            shopType: '',
            shopAddress: '',
            shopCoordinates: { lat: '', lng: '' },
            shopSize: '',
            deliveryBoyAvailable: '',
            shopClosingTime: '',
            shopOpeningTime: '',
            shopBreakStartTime: '',
            shopBreakStopTime: '',
            GSTIN: '', 
            email: '', 
            documents: {
                shopPhoto: '',
                shopOwnerAadharCard: '',
                shopOwnerPhoto: ''
            }
        });
    };
    

  const toggleUploadButton = (fieldName, isVisible) => {
        setUploadButtonVisibility((prevVisibility) => ({
            ...prevVisibility,
            [fieldName]: isVisible
        }));
    };
    

    return (
        <>
            <Helmet>
                <title>User | Minimal UI</title>
            </Helmet>

            <Container>
                <Typography variant="h4" gutterBottom>
                    Onboard Vendors
                </Typography>

                <Card sx={{ p: 3 }}>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                            <Grid item xs={6}>
                                <TextField fullWidth label="Shop Name"  name="shopName" value={formData.shopName} onChange={handleChange} 
                                required />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField fullWidth label="Contact" type="tel" name="contact" value={formData.contact} onChange={handleChange} InputProps={{startAdornment:<InputAdornment position='start'>+91</InputAdornment>}}  required /> {/* Changed from shopOwnerPhone to contact */}
                            </Grid>
                            <Grid item xs={6}>
                                <TextField fullWidth label="Shop Phone" type="tel" name="shopPhone" value={formData.shopPhone} onChange={handleChange} required />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField fullWidth label="Name"  name="name" value={formData.name} onChange={handleChange} required />
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl fullWidth>
                                    <InputLabel>Shop Type <span>*</span></InputLabel>
                                    <Select
                                        value={formData.shopType}
                                        onChange={handleChange}
                                        name="shopType"
                                        required
                                    >
                                        <MenuItem value="Electrical">Electrical</MenuItem>
                                        <MenuItem value="Plumbing">Plumbing</MenuItem>
                                        {/* Add more options as needed */}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField fullWidth label="Shop Address" name="shopAddress" value={formData.shopAddress} onChange={handleChange} required />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField fullWidth label="Shop Opening Time" type="time" name="shopOpeningTime" value={formData.shopOpeningTime} onChange={handleChange} required />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField fullWidth label="Shop Closing Time" type="time" name="shopClosingTime" value={formData.shopClosingTime} onChange={handleChange} required />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField fullWidth label="Shop Break Start Time" type="time" name="shopBreakStartTime" value={formData.shopBreakStartTime} onChange={handleChange} required />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField fullWidth label="Shop Break Stop Time" type="time" name="shopBreakStopTime" value={formData.shopBreakStopTime} onChange={handleChange} required />
                            </Grid>
                            <Grid item xs={3}>
                                <TextField fullWidth label="Latitude" name="lat" value={formData.shopCoordinates.lat} onChange={handleCoordinatesChange} />
                            </Grid>
                            <Grid item xs={3}>
                                <TextField fullWidth label="Longitude" name="lng" value={formData.shopCoordinates.lng} onChange={handleCoordinatesChange} />
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl fullWidth>
                                    <InputLabel>Shop Size <span>*</span></InputLabel>
                                    <Select
                                        value={formData.shopSize}
                                        onChange={handleChange}
                                        name="shopSize"
                                        required
                                    >
                                        <MenuItem value="S">Small</MenuItem>
                                        <MenuItem value="M">Medium</MenuItem>
                                        <MenuItem value="L">Large</MenuItem>
                                    </Select> 
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl fullWidth>
                                    <InputLabel>Delivery Boy Available <span>*</span></InputLabel>
                                    <Select
                                        value={formData.deliveryBoyAvailable}
                                        onChange={handleChange}
                                        name="deliveryBoyAvailable"
                                        required
                                    >
                                        <MenuItem value="YES">Yes</MenuItem>
                                        <MenuItem value="NO">No</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                           
                            <Grid item xs={6}>
                                <TextField fullWidth label="GSTIN Number" name="GSTIN" value={formData.GSTIN} onChange={handleChange}  />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField fullWidth label="Email" name="email" value={formData.email} onChange={handleChange}  />
                            </Grid>
                            
                            <Grid item xs={6}>
                                <Typography gutterBottom>
                                    Shop Photo <span>*</span>
                                </Typography>
                                <input
                                    type="file"
                                    accept="image/*"
                                    name="shopPhoto"
                                    onChange={(e) => {
                                        handleChange(e);
                                        toggleUploadButton('shopPhoto', !!e.target.value);
                                    }}
                                />
                                {uploadButtonVisibility.shopPhoto && (
                                    <Button
                                        onClick={() => handleFileUpload('shopPhoto', 'SHOP_PHOTO')}
                                        variant="contained"
                                        color="primary"
                                    >
                                        Upload
                                    </Button>
                                )}
                            </Grid>
                            <Grid item xs={6}>
                                <Typography gutterBottom>
                                    Shop Owner Aadhar Card <span>*</span>
                                </Typography>
                                <input
                                    type="file"
                                    accept="image/*"
                                    name="shopOwnerAadharCard"
                                    onChange={(e) => {
                                        handleChange(e);
                                        toggleUploadButton('shopOwnerAadharCard', !!e.target.value);
                                    }}
                                />
                                {uploadButtonVisibility.shopOwnerAadharCard && (
                                    <Button
                                        onClick={() => handleFileUpload('shopOwnerAadharCard', 'ADHAR_CARD')}
                                        variant="contained"
                                        color="primary"
                                    >
                                        Upload
                                    </Button>
                                )}
                            </Grid>
                            <Grid item xs={6}>
                                <Typography gutterBottom>
                                    Shop Owner Photo <span>*</span>
                                </Typography>
                                <input
                                    type="file"
                                    accept="image/*"
                                    name="shopOwnerPhoto"
                                    onChange={(e) => {
                                        handleChange(e);
                                        toggleUploadButton('shopOwnerPhoto', !!e.target.value);
                                    }}
                                />
                                {uploadButtonVisibility.shopOwnerPhoto && (
                                    <Button
                                        onClick={() => handleFileUpload('shopOwnerPhoto', 'PROFILE_PHOTO')}
                                        variant="contained"
                                        color="primary"
                                    >
                                        Upload
                                    </Button>
                                )}
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

export default OnboardVendors;
