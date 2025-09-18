import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditFlatForm = ({ listingId, closeForm, listingData }) => {
  const [formData, setFormData] = useState({
    location: '',
    address: '',
    pinCode: '',
    nearbyInstitutions: '',
    rentMoney: '',
    images: [],
    videos: [],
    description: '',
    contactDetails: '',
  });

  // Prepopulate form with existing listing data
  useEffect(() => {
    if (listingData) {
      setFormData({
        location: listingData.location || '',
        address: listingData.address || '',
        pinCode: listingData.pinCode || '',
        nearbyInstitutions: listingData.nearbyInstitutions || '',
        rentMoney: listingData.rentMoney || '',
        images: listingData.images || [],
        videos: listingData.videos || [],
        description: listingData.description || '',
        contactDetails: listingData.contactDetails || '',
      });
    }
  }, [listingData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({
      ...formData,
      [name]: files,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const token = localStorage.getItem('token');
        const formDataToSend = new FormData();
        
        Object.keys(formData).forEach((key) => {
            if (key === 'images' || key === 'videos') {
                // Log the file input for debugging
                console.log(`Uploading files for ${key}:`, formData[key]);
                Array.from(formData[key]).forEach((file) => formDataToSend.append(key, file));
            } else {
                // Log the rest of the fields for debugging
                console.log(`Form field ${key}:`, formData[key]);
                formDataToSend.append(key, formData[key]);
            }
        });

        // API call to update the flat listing
        const response = await axios.put(
            `http://localhost:5000/api/listings/${listingId}`, 
            formDataToSend, 
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            }
        );

        console.log('Server response:', response.data);

        closeForm(); // Close the form after successful update
    } catch (err) {
        console.error('Failed to update the listing', err);
    }
};

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const token = localStorage.getItem('token');
  //     const formDataToSend = new FormData();
  //     Object.keys(formData).forEach((key) => {
  //       if (key === 'images' || key === 'videos') {
  //         Array.from(formData[key]).forEach((file) => formDataToSend.append(key, file));
  //       } else {
  //         formDataToSend.append(key, formData[key]);
  //       }
  //     });
  //     // Log the data being sent
  //     console.log('Form data to send:', formDataToSend);

  //     // API call to update the flat listing
  //     const response = await axios.put(`http://localhost:5000/api/flats/${listingId}`, formDataToSend, {
  //       headers: {
  //           Authorization: `Bearer ${token}`,
  //           'Content-Type': 'multipart/form-data',
  //       },
  //   });

  //   // Log the response from the server
  //   console.log('Response from update:', response.data);

  //     // API call to update the flat listing
  //     // await axios.put(`http://localhost:5000/api/listings/${listingId}`, formDataToSend, {
  //     //   headers: {
  //     //     Authorization: `Bearer ${token}`,
  //     //     'Content-Type': 'multipart/form-data',
  //     //   },
  //     // });

  //     closeForm(); // Close the form after successful update
  //   } catch (err) {
  //     console.error('Failed to update the listing', err);
  //   }
  // };

  return (
    <div className="container mt-3">
      <h3>Edit Flat Listing</h3>
      <form onSubmit={handleSubmit}>
        {/* Prepopulate form fields */}
        <div className="mb-3">
          <label className="form-label">Location</label>
          <input
            type="text"
            className="form-control"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Address</label>
          <input
            type="text"
            className="form-control"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Pin Code</label>
          <input
            type="text"
            className="form-control"
            name="pinCode"
            value={formData.pinCode}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Nearby Institutions/Offices</label>
          <input
            type="text"
            className="form-control"
            name="nearbyInstitutions"
            value={formData.nearbyInstitutions}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Rent Money</label>
          <input
            type="number"
            className="form-control"
            name="rentMoney"
            value={formData.rentMoney}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Images (6-10)</label>
          <input
            type="file"
            className="form-control"
            name="images"
            multiple
            onChange={handleFileChange}
            accept="image/*"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Videos (Optional, up to 2)</label>
          <input
            type="file"
            className="form-control"
            name="videos"
            multiple
            onChange={handleFileChange}
            accept="video/*"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="mb-3">
          <label className="form-label">Contact Details</label>
          <input
            type="text"
            className="form-control"
            name="contactDetails"
            value={formData.contactDetails}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Update Listing</button>
        <button type="button" className="btn btn-secondary ms-3" onClick={closeForm}>Cancel</button>
      </form>
    </div>
  );
};

export default EditFlatForm;
