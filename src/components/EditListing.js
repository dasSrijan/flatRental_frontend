import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditListing = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [listing, setListing] = useState({
    title: "",
    description: "",
    rent: 0,
    location: "",
    address: "",
    pinCode: "",
    nearbyInstitutions: "",
    contactDetails: ""
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const API = process.env.React_APP_API_URL;
  useEffect(() => {
    const fetchListingDetails = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await axios.get(`${API}/listings/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });
        setListing(response.data);
      } catch (error) {
        console.error("Error fetching listing details:", error);
        setError("Failed to load listing details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchListingDetails();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    
    try {
      await axios.put(`${API}/listings/${id}`, listing, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      alert("Listing updated successfully!");
      navigate(`/listing/${id}`);
    } catch (error) {
      console.error("Error updating listing:", error);
      setError("Error updating listing. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setListing(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (loading) {
    return (
      <div className="edit-listing-container">
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Loading listing details...</p>
        </div>
      </div>
    );
  }

  if (error && !listing.title) {
    return (
      <div className="edit-listing-container">
        <div className="error-state">
          <div className="error-icon">⚠️</div>
          <h3>Oops! Something went wrong</h3>
          <p>{error}</p>
          <button onClick={() => window.location.reload()} className="retry-btn">
            Try Again
          </button>
          <button onClick={() => navigate(-1)} className="back-btn">
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="edit-listing-container">
      <div className="edit-listing-card">
        <div className="form-header">
          <h1>Edit Listing</h1>
          <p>Update your property details below</p>
        </div>

        {error && (
          <div className="error-message">
            <span className="error-icon">⚠️</span>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="edit-form">
          <div className="form-grid">
            <div className="input-group">
              <label htmlFor="title">Property Title *</label>
              <input
                type="text"
                id="title"
                name="title"
                value={listing.title}
                onChange={handleChange}
                placeholder="Enter property title"
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="location">Location *</label>
              <input
                type="text"
                id="location"
                name="location"
                value={listing.location}
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
                value={listing.address}
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
                value={listing.pinCode}
                onChange={handleChange}
                placeholder="Enter 6-digit pin code"
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="rent">Monthly Rent (₹) *</label>
              <input
                type="number"
                id="rent"
                name="rent"
                value={listing.rent}
                onChange={handleChange}
                placeholder="Enter monthly rent amount"
                required
                min="0"
              />
            </div>

            <div className="input-group">
              <label htmlFor="contactDetails">Contact Details *</label>
              <input
                type="text"
                id="contactDetails"
                name="contactDetails"
                value={listing.contactDetails}
                onChange={handleChange}
                placeholder="Phone number or email for inquiries"
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
              value={listing.nearbyInstitutions}
              onChange={handleChange}
              placeholder="Schools, colleges, offices nearby (comma separated)"
            />
          </div>

          <div className="input-group">
            <label htmlFor="description">Description *</label>
            <textarea
              id="description"
              name="description"
              value={listing.description}
              onChange={handleChange}
              placeholder="Describe your property, amenities, and features..."
              rows="5"
              required
            />
          </div>

          <div className="form-actions">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="cancel-btn"
              disabled={saving}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`save-btn ${saving ? 'saving' : ''}`}
              disabled={saving}
            >
              {saving ? (
                <>
                  <span className="button-spinner"></span>
                  Updating...
                </>
              ) : (
                <>
                  <span className="btn-icon">💾</span>
                  Update Listing
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      <style jsx>{`
        .edit-listing-container {
          display: flex;
          justify-content: center;
          align-items: flex-start;
          min-height: 100vh;
          padding: 2rem 1rem;
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        
        .edit-listing-card {
          background: white;
          border-radius: 16px;
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
          width: 100%;
          max-width: 800px;
          padding: 2.5rem;
          margin: 1rem;
        }
        
        .form-header {
          text-align: center;
          margin-bottom: 2.5rem;
        }
        
        .form-header h1 {
          color: #2d3748;
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }
        
        .form-header p {
          color: #718096;
          font-size: 1.1rem;
        }
        
        .error-message {
          background: #fff5f5;
          color: #c53030;
          padding: 1rem;
          border-radius: 8px;
          border: 1px solid #fed7d7;
          margin-bottom: 2rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .edit-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        
        .form-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
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
          min-height: 120px;
        }
        
        .form-actions {
          display: flex;
          gap: 1rem;
          justify-content: flex-end;
          margin-top: 2rem;
          padding-top: 2rem;
          border-top: 1px solid #e2e8f0;
        }
        
        .cancel-btn, .save-btn {
          padding: 1rem 2rem;
          border: none;
          border-radius: 10px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 1rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .cancel-btn {
          background: #e2e8f0;
          color: #4a5568;
        }
        
        .cancel-btn:hover:not(:disabled) {
          background: #cbd5e0;
        }
        
        .save-btn {
          background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
          color: white;
        }
        
        .save-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(72, 187, 120, 0.4);
        }
        
        .save-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        
        .save-btn.saving {
          background: linear-gradient(135deg, #68d391 0%, #48bb78 100%);
        }
        
        .button-spinner {
          width: 18px;
          height: 18px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          border-top-color: white;
          animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        
        /* Loading State */
        .loading-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 4rem 2rem;
        }
        
        .loading-spinner {
          width: 50px;
          height: 50px;
          border: 4px solid #e2e8f0;
          border-top: 4px solid #4299e1;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 1.5rem;
        }
        
        .loading-state p {
          color: #718096;
          font-size: 1.1rem;
        }
        
        /* Error State */
        .error-state {
          text-align: center;
          padding: 3rem 2rem;
          background: white;
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          max-width: 500px;
          margin: 2rem auto;
        }
        
        .error-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
        }
        
        .error-state h3 {
          color: #c53030;
          margin-bottom: 0.5rem;
        }
        
        .error-state p {
          color: #718096;
          margin-bottom: 2rem;
        }
        
        .retry-btn, .back-btn {
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          margin: 0 0.5rem;
        }
        
        .retry-btn {
          background: #4299e1;
          color: white;
        }
        
        .retry-btn:hover {
          background: #3182ce;
        }
        
        .back-btn {
          background: #e2e8f0;
          color: #4a5568;
        }
        
        .back-btn:hover {
          background: #cbd5e0;
        }
        
        /* Responsive Design */
        @media (max-width: 768px) {
          .edit-listing-card {
            padding: 1.5rem;
          }
          
          .form-header h1 {
            font-size: 2rem;
          }
          
          .form-grid {
            grid-template-columns: 1fr;
          }
          
          .form-actions {
            flex-direction: column;
          }
          
          .cancel-btn, .save-btn {
            width: 100%;
            justify-content: center;
          }
        }
        
        @media (max-width: 480px) {
          .edit-listing-container {
            padding: 1rem;
          }
          
          .edit-listing-card {
            padding: 1.2rem;
            margin: 0.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default EditListing;

// // components/EditListing.js
// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";

// const EditListing = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [listing, setListing] = useState({ title: "", description: "", rent: 0 });

//   useEffect(() => {
//     // Fetch the listing details to pre-fill the form
//     const fetchListingDetails = async () => {
//       try {
//         const response = await axios.get(`/api/listings/${id}`);
//         setListing(response.data);
//       } catch (error) {
//         console.error("Error fetching listing details:", error);
//       }
//     };

//     fetchListingDetails();
//   }, [id]);

//   // Handle form submission for updating listing
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.put(`/api/listings/${id}`, listing);
//       alert("Listing updated successfully.");
//       navigate(`/listing/${id}`); // Redirect to the details page after updating
//     } catch (error) {
//       console.error("Error updating listing:", error);
//       alert("Error updating listing.");
//     }
//   };

//   return (
//     <div className="container mt-4">
//       <h3>Edit Listing</h3>
//       <form onSubmit={handleSubmit}>
//         <div className="mb-3">
//           <label className="form-label">Title</label>
//           <input
//             type="text"
//             className="form-control"
//             value={listing.title}
//             onChange={(e) => setListing({ ...listing, title: e.target.value })}
//             required
//           />
//         </div>
//         <div className="mb-3">
//           <label className="form-label">Description</label>
//           <textarea
//             className="form-control"
//             value={listing.description}
//             onChange={(e) => setListing({ ...listing, description: e.target.value })}
//             required
//           />
//         </div>
//         <div className="mb-3">
//           <label className="form-label">Rent</label>
//           <input
//             type="number"
//             className="form-control"
//             value={listing.rent}
//             onChange={(e) => setListing({ ...listing, rent: e.target.value })}
//             required
//           />
//         </div>
//         <button type="submit" className="btn btn-success">
//           Update Listing
//         </button>
//       </form>
//     </div>
//   );
// };

// export default EditListing;
