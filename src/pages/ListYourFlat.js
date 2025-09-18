import React, { useState } from 'react';
import axios from 'axios';

const ListYourFlat = () => {
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: Array.from(files) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage('');
    setErrorMessage('');

    const token = localStorage.getItem('token');

    if (!token) {
      setErrorMessage('Please log in to list your flat.');
      setIsSubmitting(false);
      return;
    }

    const form = new FormData();
    Object.keys(formData).forEach((key) => {
      if (Array.isArray(formData[key])) {
        formData[key].forEach((file) => form.append(key, file));
      } else {
        form.append(key, formData[key]);
      }
    });

    try {
      const API = process.env.REACT_APP_API_URL;
      await axios.post(`${API}/listings`, form, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
      });
      setSuccessMessage('Flat listed successfully!');
      // Reset form
      setFormData({
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
    } catch (error) {
      console.error('Error listing flat:', error);
      setErrorMessage('Failed to list flat. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="list-flat-container">
      <div className="list-flat-card">
        <div className="list-flat-header">
          <h1>List Your Flat</h1>
          <p>Fill in the details below to list your property</p>
        </div>

        {successMessage && (
          <div className="success-message">
            <span className="success-icon">✅</span>
            {successMessage}
          </div>
        )}

        {errorMessage && (
          <div className="error-message">
            <span className="error-icon">⚠️</span>
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="list-flat-form">
          <div className="form-grid">
            <div className="input-group">
              <label htmlFor="location">Location *</label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Enter location (e.g., City, Area)"
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="address">Address *</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Full address of the property"
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="pinCode">Pin Code *</label>
              <input
                type="text"
                id="pinCode"
                name="pinCode"
                value={formData.pinCode}
                onChange={handleChange}
                placeholder="Enter 6-digit pin code"
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="rentMoney">Rent Price (₹) *</label>
              <input
                type="number"
                id="rentMoney"
                name="rentMoney"
                value={formData.rentMoney}
                onChange={handleChange}
                placeholder="Monthly rent amount"
                required
              />
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="nearbyInstitutions">Nearby Institutions/Offices</label>
            <input
              type="text"
              id="nearbyInstitutions"
              name="nearbyInstitutions"
              value={formData.nearbyInstitutions}
              onChange={handleChange}
              placeholder="Schools, colleges, offices nearby (comma separated)"
            />
          </div>

          <div className="input-group">
            <label htmlFor="contactDetails">Contact Details *</label>
            <input
              type="text"
              id="contactDetails"
              name="contactDetails"
              value={formData.contactDetails}
              onChange={handleChange}
              placeholder="Phone number or email for inquiries"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="description">Description *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your property, amenities, and features..."
              rows="4"
              required
            ></textarea>
          </div>

          <div className="file-upload-group">
            <div className="input-group">
              <label htmlFor="images">Images (6-10) *</label>
              <div className="file-upload">
                <input
                  type="file"
                  id="images"
                  name="images"
                  multiple
                  onChange={handleFileChange}
                  accept="image/*"
                  required
                />
                <label htmlFor="images" className="file-upload-label">
                  <span className="file-icon">📸</span>
                  Choose Images
                </label>
                {formData.images.length > 0 && (
                  <span className="file-count">{formData.images.length} file(s) selected</span>
                )}
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="videos">Videos (Optional, up to 2)</label>
              <div className="file-upload">
                <input
                  type="file"
                  id="videos"
                  name="videos"
                  multiple
                  onChange={handleFileChange}
                  accept="video/*"
                />
                <label htmlFor="videos" className="file-upload-label">
                  <span className="file-icon">🎥</span>
                  Choose Videos
                </label>
                {formData.videos.length > 0 && (
                  <span className="file-count">{formData.videos.length} file(s) selected</span>
                )}
              </div>
            </div>
          </div>

          <button 
            type="submit" 
            className={`submit-button ${isSubmitting ? 'submitting' : ''}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="button-spinner"></span>
                Listing Your Flat...
              </>
            ) : (
              'List Flat'
            )}
          </button>
        </form>
      </div>

      <style jsx>{`
        .list-flat-container {
          display: flex;
          justify-content: center;
          align-items: flex-start;
          min-height: 100vh;
          padding: 2rem 1rem;
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        
        .list-flat-card {
          background: white;
          border-radius: 16px;
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
          width: 100%;
          max-width: 800px;
          padding: 2.5rem;
          margin: 1rem;
        }
        
        .list-flat-header {
          text-align: center;
          margin-bottom: 2.5rem;
        }
        
        .list-flat-header h1 {
          color: #2d3748;
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }
        
        .list-flat-header p {
          color: #718096;
          font-size: 1.1rem;
        }
        
        .success-message, .error-message {
          padding: 1rem;
          border-radius: 8px;
          margin-bottom: 2rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .success-message {
          background: #f0fff4;
          color: #2f855a;
          border: 1px solid #c6f6d5;
        }
        
        .error-message {
          background: #fff5f5;
          color: #c53030;
          border: 1px solid #fed7d7;
        }
        
        .list-flat-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        
        .form-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
        }
        
        .input-group {
          display: flex;
          flex-direction: column;
        }
        
        .input-group label {
          font-weight: 600;
          color: #4a5568;
          margin-bottom: 0.5rem;
          font-size: 0.95rem;
        }
        
        .input-group input, .input-group textarea {
          padding: 1rem;
          border: 2px solid #e2e8f0;
          border-radius: 8px;
          font-size: 1rem;
          transition: all 0.3s ease;
          font-family: inherit;
        }
        
        .input-group input:focus, .input-group textarea:focus {
          outline: none;
          border-color: #4299e1;
          box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.2);
        }
        
        .input-group textarea {
          resize: vertical;
          min-height: 100px;
        }
        
        .file-upload-group {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
        }
        
        .file-upload {
          position: relative;
        }
        
        .file-upload input[type="file"] {
          position: absolute;
          left: -9999px;
        }
        
        .file-upload-label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 1rem;
          border: 2px dashed #cbd5e0;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
          background: #f7fafc;
        }
        
        .file-upload-label:hover {
          border-color: #4299e1;
          background: #edf2f7;
        }
        
        .file-count {
          margin-top: 0.5rem;
          font-size: 0.85rem;
          color: #718096;
          display: block;
        }
        
        .submit-button {
          background: linear-gradient(135deg, #4299e1 0%, #3182ce 100%);
          color: white;
          border: none;
          padding: 1.2rem 2rem;
          border-radius: 10px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-top: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }
        
        .submit-button:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(66, 153, 225, 0.4);
        }
        
        .submit-button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        
        .button-spinner {
          width: 20px;
          height: 20px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          border-top-color: white;
          animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        
        @media (max-width: 768px) {
          .list-flat-card {
            padding: 1.5rem;
          }
          
          .list-flat-header h1 {
            font-size: 2rem;
          }
          
          .form-grid, .file-upload-group {
            grid-template-columns: 1fr;
          }
        }
        
        @media (max-width: 480px) {
          .list-flat-container {
            padding: 1rem;
          }
          
          .list-flat-card {
            padding: 1.2rem;
            margin: 0.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default ListYourFlat;


// import React, { useState } from 'react';
// import axios from 'axios';

// const ListYourFlat = () => {
//   const [formData, setFormData] = useState({
//     location: '',
//     address: '',
//     pinCode: '',
//     nearbyInstitutions: '',
//     rentMoney: '',
//     images: [],
//     videos: [],
//     description: '',
//     contactDetails: '',
//   });

//   // Function to handle text input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   // Function to handle file input changes
//   const handleFileChange = (e) => {
//     const { name, files } = e.target;
//     setFormData({ ...formData, [name]: Array.from(files) });
//   };

//   // Function to submit the form
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Get the token from localStorage for authentication
//     const token = localStorage.getItem('token');

//     if (!token) {
//       console.log('No token found');
//       alert('No token found. Please log in again.');
//       return;
//     }
  
//     console.log('Token:', token); // Log the token

//     // Create a new FormData object
//     const form = new FormData();

//     // Append all form fields and files to the FormData object
//     Object.keys(formData).forEach((key) => {
//       if (Array.isArray(formData[key])) {
//         // If the form field is an array (like images or videos), append each file
//         formData[key].forEach((file) => form.append(key, file));
//       } else {
//         form.append(key, formData[key]);
//       }
//     });

//     try {
//       // Send the POST request with the form data and token in headers
//       await axios.post('http://localhost:5000/api/listings', form, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//           'Authorization': `Bearer ${token}`, // Add token for authorization
//         },
//       });
//       alert('Flat listed successfully!');
//     } catch (error) {
//       console.error('Error listing flat:', error);
//       alert('Failed to list flat.');
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <h2>List Your Flat</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="mb-3">
//           <label className="form-label">Location</label>
//           <input
//             type="text"
//             className="form-control"
//             name="location"
//             value={formData.location}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="mb-3">
//           <label className="form-label">Address</label>
//           <input
//             type="text"
//             className="form-control"
//             name="address"
//             value={formData.address}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="mb-3">
//           <label className="form-label">Pin Code</label>
//           <input
//             type="text"
//             className="form-control"
//             name="pinCode"
//             value={formData.pinCode}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="mb-3">
//           <label className="form-label">Nearby Institutions/Offices</label>
//           <input
//             type="text"
//             className="form-control"
//             name="nearbyInstitutions"
//             value={formData.nearbyInstitutions}
//             onChange={handleChange}
//           />
//         </div>
//         <div className="mb-3">
//           <label className="form-label">Rent Money</label>
//           <input
//             type="number"
//             className="form-control"
//             name="rentMoney"
//             value={formData.rentMoney}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="mb-3">
//           <label className="form-label">Images (6-10)</label>
//           <input
//             type="file"
//             className="form-control"
//             name="images"
//             multiple
//             onChange={handleFileChange}
//             accept="image/*"
//             required
//           />
//         </div>
//         <div className="mb-3">
//           <label className="form-label">Videos (Optional, up to 2)</label>
//           <input
//             type="file"
//             className="form-control"
//             name="videos"
//             multiple
//             onChange={handleFileChange}
//             accept="video/*"
//           />
//         </div>
//         <div className="mb-3">
//           <label className="form-label">Description</label>
//           <textarea
//             className="form-control"
//             name="description"
//             value={formData.description}
//             onChange={handleChange}
//             required
//           ></textarea>
//         </div>
//         <div className="mb-3">
//           <label className="form-label">Contact Details</label>
//           <input
//             type="text"
//             className="form-control"
//             name="contactDetails"
//             value={formData.contactDetails}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <button type="submit" className="btn btn-primary">List Flat</button>
//       </form>
//     </div>
//   );
// };

// export default ListYourFlat;
