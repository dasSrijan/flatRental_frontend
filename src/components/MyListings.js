import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const MyListings = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const API = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchListings = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await axios.get(`${API}/listings/my-listings`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });
        setListings(response.data);
      } catch (error) {
        console.error("Error fetching listings:", error);
        setError("Failed to load your listings. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchListings();
  }, []);

  const handleDeleteListing = async (id) => {
    if (!window.confirm("Are you sure you want to delete this listing?")) {
      return;
    }
    
    try {
      await axios.delete(`${API}/listings/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setListings(listings.filter((listing) => listing._id !== id));
    } catch (err) {
      alert("Failed to delete the listing. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="my-listings-container">
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Loading your listings...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="my-listings-container">
        <div className="error-state">
          <div className="error-icon">⚠️</div>
          <h3>Oops! Something went wrong</h3>
          <p>{error}</p>
          <button onClick={() => window.location.reload()} className="retry-btn">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="my-listings-container">
      <div className="listings-header">
        <h1>My Listings</h1>
        <p>Manage your property listings</p>
        <Link to="/list-your-flat" className="create-listing-btn">
          <span className="btn-icon">+</span>
          Create New Listing
        </Link>
      </div>

      {listings.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">🏠</div>
          <h3>No listings yet</h3>
          <p>You haven't created any property listings. Start by creating your first one!</p>
          <Link to="/list-your-flat" className="create-listing-btn">
            Create Your First Listing
          </Link>
        </div>
      ) : (
        <div className="listings-grid">
          {listings.map((listing) => (
            <div key={listing._id} className="listing-card">
              <div className="card-image">
                {listing.images && listing.images.length > 0 ? (
                  <img
                    src={`${process.env.REACT_APP_FILES_URL}/${listing.images[0]}`}
                    alt={listing.title || listing.location}
                    className="listing-image"
                  />
                ) : (
                  <div className="image-placeholder">
                    <span className="placeholder-icon">🏠</span>
                  </div>
                )}
                <div className="card-badge">Active</div>
              </div>
              
              <div className="card-content">
                <h3 className="card-title">{listing.title || listing.location}</h3>
                <p className="card-location">📍 {listing.address}</p>
                
                <div className="listing-details">
                  <span className="rent-price">₹{listing.rentMoney}/month</span>
                  {listing.pinCode && (
                    <span className="pincode">📌 {listing.pinCode}</span>
                  )}
                </div>
                
                <p className="card-description">
                  {listing.description?.substring(0, 100)}...
                </p>
                
                <div className="card-actions">
                  <Link
                    to={`/listing/${listing._id}`}
                    className="view-details-btn"
                  >
                    View Details
                  </Link>
                  <Link
                    to={`/edit-listing/${listing._id}`}
                    className="edit-btn"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDeleteListing(listing._id)}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                </div>
                
                <div className="card-stats">
                  <span className="stat-item">
                    <span className="stat-icon">👁️</span>
                    {Math.floor(Math.random() * 50) + 10} views
                  </span>
                  <span className="stat-item">
                    <span className="stat-icon">❤️</span>
                    {Math.floor(Math.random() * 20) + 1} saves
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <style jsx>{`
        .my-listings-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem 1rem;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        
        .listings-header {
          text-align: center;
          margin-bottom: 3rem;
        }
        
        .listings-header h1 {
          color: #2d3748;
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }
        
        .listings-header p {
          color: #718096;
          font-size: 1.1rem;
          margin-bottom: 2rem;
        }
        
        .create-listing-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: linear-gradient(135deg, #4299e1 0%, #3182ce 100%);
          color: white;
          padding: 1rem 2rem;
          border-radius: 10px;
          text-decoration: none;
          font-weight: 600;
          transition: all 0.3s ease;
        }
        
        .create-listing-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(66, 153, 225, 0.4);
        }
        
        .btn-icon {
          font-size: 1.2rem;
        }
        
        /* Listings Grid */
        .listings-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 2rem;
        }
        
        /* Listing Card */
        .listing-card {
          background: white;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
        }
        
        .listing-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
        }
        
        .card-image {
          position: relative;
          height: 220px;
          overflow: hidden;
        }
        
        .listing-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        
        .listing-card:hover .listing-image {
          transform: scale(1.05);
        }
        
        .image-placeholder {
          height: 100%;
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .placeholder-icon {
          font-size: 3rem;
          color: #adb5bd;
        }
        
        .card-badge {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: #48bb78;
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
        }
        
        .card-content {
          padding: 1.5rem;
        }
        
        .card-title {
          color: #2d3748;
          font-size: 1.3rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          line-height: 1.3;
        }
        
        .card-location {
          color: #718096;
          font-size: 0.95rem;
          margin-bottom: 1rem;
        }
        
        .listing-details {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }
        
        .rent-price {
          color: #48bb78;
          font-size: 1.5rem;
          font-weight: 700;
        }
        
        .pincode {
          color: #718096;
          font-size: 0.9rem;
        }
        
        .card-description {
          color: #4a5568;
          line-height: 1.5;
          margin-bottom: 1.5rem;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .card-actions {
          display: flex;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
        }
        
        .view-details-btn, .edit-btn, .delete-btn {
          flex: 1;
          padding: 0.75rem 1rem;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          text-decoration: none;
          text-align: center;
          font-size: 0.9rem;
        }
        
        .view-details-btn {
          background: #4299e1;
          color: white;
        }
        
        .view-details-btn:hover {
          background: #3182ce;
          transform: translateY(-2px);
        }
        
        .edit-btn {
          background: #e2e8f0;
          color: #4a5568;
          text-decoration: none;
        }
        
        .edit-btn:hover {
          background: #cbd5e0;
          transform: translateY(-2px);
        }
        
        .delete-btn {
          background: #fed7d7;
          color: #c53030;
        }
        
        .delete-btn:hover {
          background: #feb2b2;
          transform: translateY(-2px);
        }
        
        .card-stats {
          display: flex;
          justify-content: space-around;
          padding-top: 1rem;
          border-top: 1px solid #e2e8f0;
        }
        
        .stat-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #718096;
          font-size: 0.85rem;
        }
        
        .stat-icon {
          font-size: 1rem;
        }
        
        /* Empty State */
        .empty-state {
          text-align: center;
          padding: 4rem 2rem;
          background: white;
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          margin-top: 2rem;
        }
        
        .empty-icon {
          font-size: 4rem;
          margin-bottom: 1.5rem;
        }
        
        .empty-state h3 {
          color: #2d3748;
          margin-bottom: 0.5rem;
          font-size: 1.5rem;
        }
        
        .empty-state p {
          color: #718096;
          margin-bottom: 2rem;
          font-size: 1.1rem;
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
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .loading-state p {
          color: #718096;
          font-size: 1.1rem;
        }
        
        /* Error State */
        .error-state {
          text-align: center;
          padding: 3rem 2rem;
          background: #fff5f5;
          border: 1px solid #fed7d7;
          border-radius: 16px;
          color: #c53030;
        }
        
        .error-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
        }
        
        .error-state h3 {
          margin-bottom: 0.5rem;
        }
        
        .retry-btn {
          background: #4299e1;
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          margin-top: 1.5rem;
          transition: background-color 0.3s ease;
        }
        
        .retry-btn:hover {
          background: #3182ce;
        }
        
        /* Responsive Design */
        @media (max-width: 768px) {
          .listings-grid {
            grid-template-columns: 1fr;
          }
          
          .card-actions {
            flex-direction: column;
          }
          
          .listing-details {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
          }
          
          .listings-header h1 {
            font-size: 2rem;
          }
        }
        
        @media (max-width: 480px) {
          .my-listings-container {
            padding: 1rem;
          }
          
          .card-content {
            padding: 1.2rem;
          }
        }
      `}</style>
    </div>
  );
};

export default MyListings;

// // components/MyListings.js
// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";

// const MyListings = () => {
//   const [listings, setListings] = useState([]);
  

//   useEffect(() => {
//     // Fetch user's listings from the backend (MongoDB)
//     const fetchListings = async () => {
//       try {
//         const response = await axios.get("/api/listings/my-listings"); // Adjust route as per your backend API
//         setListings(response.data); // Assuming response contains an array of listings
//       } catch (error) {
//         console.error("Error fetching listings:", error);
//       }
//     };
//     fetchListings();
//   }, []);

//   return (
//     <div className="container mt-4">
//       <h3>My Listings</h3>
//       <div className="row">
//         {listings.map((listing) => (
//           <div className="col-md-4" key={listing._id}>
//             <div className="card mb-4 shadow-sm">
//               <img
//                 src={listing.images[0]} // Assuming 'images' array in each listing
//                 className="card-img-top"
//                 alt="Flat"
//               />
//               <div className="card-body">
//                 <h5 className="card-title">{listing.title}</h5>
//                 <p className="card-text">{listing.description}</p>
//                 <Link
//                   to={`/listing/${listing._id}`} // Route to listing details page
//                   className="btn btn-primary"
//                 >
//                   View Details
//                 </Link>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default MyListings;
