import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const UserProfile = ({ section }) => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const API = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchListings = async () => {
      if (section === "my-lists") {
        setLoading(true);
        setError("");
        try {
          const response = await axios.get("/api/listings/my-lists", {
            headers: {
              "x-auth-token": localStorage.getItem("token"),
            },
          });
          setListings(response.data);
        } catch (err) {
          setError("Failed to load your listings. Please try again.");
          console.error("Fetch error:", err);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchListings();
  }, [section]);

  const handleDeleteListing = async (id) => {
    if (!window.confirm("Are you sure you want to delete this listing?")) {
      return;
    }

    try {
      await axios.delete(`/api/listings/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setListings(listings.filter((listing) => listing._id !== id));
    } catch (err) {
      alert("Failed to delete the listing. Please try again.");
    }
  };

  const renderContent = () => {
    switch (section) {
      case "profile":
        return (
          <div className="profile-content">
            <div className="profile-header">
              <div className="profile-avatar">
                <span className="avatar-icon">👤</span>
              </div>
              <div className="profile-info">
                <h2>My Profile</h2>
                <p>Manage your account details and preferences</p>
              </div>
            </div>

            <div className="profile-details">
              <div className="detail-card">
                <h3>Personal Information</h3>
                <div className="detail-item">
                  <span className="detail-label">Name:</span>
                  <span className="detail-value">John Doe</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Email:</span>
                  <span className="detail-value">john.doe@example.com</span>
                </div>
              </div>

              <div className="detail-card">
                <h3>Account Settings</h3>
                <button className="settings-btn">⚙️ Edit Profile</button>
                <button className="settings-btn">🔒 Change Password</button>
              </div>
            </div>
          </div>
        );

      case "my-lists":
        return (
          <div className="my-lists-content">
            <div className="section-header">
              <h2>My Listings</h2>
              <p>Manage your property listings</p>
            </div>

            {loading ? (
              <p>Loading your listings...</p>
            ) : error ? (
              <p className="text-danger">{error}</p>
            ) : listings.length > 0 ? (
              <div className="listings-grid">
                {listings.map((listing) => (
                  <div key={listing._id} className="listing-card">
                    <div className="card-image">
                      {listing.images?.[0] ? (
                        <img
                          src={`{API}/${listing.images[0]}`}
                          alt={listing.title}
                        />
                      ) : (
                        <div className="image-placeholder">🏠</div>
                      )}
                    </div>
                    <div className="card-content">
                      <h3>{listing.title}</h3>
                      <p>{listing.description?.substring(0, 100)}...</p>
                      <p className="card-price">₹{listing.rentMoney}/month</p>
                      <div className="card-actions">
                        <Link to={`/listing/${listing._id}`} className="view-btn">
                          View
                        </Link>
                        <button
                          className="edit-btn"
                          onClick={() => navigate(`/edit-listing/${listing._id}`)}
                        >
                          Edit
                        </button>
                        <button
                          className="delete-btn"
                          onClick={() => handleDeleteListing(listing._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>No listings found.</p>
            )}
          </div>
        );

      case "favourite":
        return (
          <div className="favourites-content">
            <div className="section-header">
              <h2>Favourite Properties</h2>
              <p>Your saved properties will appear here</p>
            </div>
          </div>
        );

      default:
        return <p>Select a valid section.</p>;
    }
  };

  return (
    <div className="user-profile-container">
      {/* Sidebar */}
      <div className="profile-sidebar">
        <div className="sidebar-header">
          <div className="user-avatar">👤</div>
          <h2>User Profile</h2>
        </div>

        <nav className="sidebar-nav">
          <Link
            to="/profile"
            className={`nav-item ${section === "profile" ? "active" : ""}`}
          >
            📋 My Profile
          </Link>
          <Link
            to="/my-lists"
            className={`nav-item ${section === "my-lists" ? "active" : ""}`}
          >
            📝 My Listings
          </Link>
          <Link
            to="/favourite"
            className={`nav-item ${section === "favourite" ? "active" : ""}`}
          >
            ❤️ Favourites
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="profile-content-area">{renderContent()}</div>
    </div>
  );
};

export default UserProfile;


// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";

// const UserProfile = ({ section }) => {
//   const [listings, setListings] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [activeTab, setActiveTab] = useState(section || "profile");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchListings = async () => {
//       if (activeTab === "my-lists") {
//         setLoading(true);
//         setError("");
//         try {
//           const response = await axios.get("/api/listings/my-lists", {
//             headers: {
//               'x-auth-token': localStorage.getItem("token")
//             },
//           });
//           setListings(response.data);
//         } catch (err) {
//           setError("Failed to load your listings. Please try again.");
//           console.error("Fetch error:", err);
//         } finally {
//           setLoading(false);
//         }
//       }
//     };
//     fetchListings();
//   }, [activeTab]);

//   const handleDeleteListing = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this listing?")) {
//       return;
//     }
    
//     try {
//       await axios.delete(`/api/listings/${id}`, {
//         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//       });
//       setListings(listings.filter((listing) => listing._id !== id));
//     } catch (err) {
//       alert("Failed to delete the listing. Please try again.");
//     }
//   };

//   const renderContent = () => {
//     switch (activeTab) {
//       case "profile":
//         return (
//           <div className="profile-content">
//             <div className="profile-header">
//               <div className="profile-avatar">
//                 <span className="avatar-icon">👤</span>
//               </div>
//               <div className="profile-info">
//                 <h2>My Profile</h2>
//                 <p>Manage your account details and preferences</p>
//               </div>
//             </div>
            
//             <div className="profile-details">
//               <div className="detail-card">
//                 <h3>Personal Information</h3>
//                 <div className="detail-item">
//                   <span className="detail-label">Name:</span>
//                   <span className="detail-value">John Doe</span>
//                 </div>
//                 <div className="detail-item">
//                   <span className="detail-label">Email:</span>
//                   <span className="detail-value">john.doe@example.com</span>
//                 </div>
//                 <div className="detail-item">
//                   <span className="detail-label">Phone:</span>
//                   <span className="detail-value">+1 (555) 123-4567</span>
//                 </div>
//               </div>
              
//               <div className="detail-card">
//                 <h3>Account Settings</h3>
//                 <button className="settings-btn">
//                   <span className="btn-icon">⚙️</span>
//                   Edit Profile
//                 </button>
//                 <button className="settings-btn">
//                   <span className="btn-icon">🔒</span>
//                   Change Password
//                 </button>
//                 <button className="settings-btn">
//                   <span className="btn-icon">🔔</span>
//                   Notification Settings
//                 </button>
//               </div>
//             </div>
//           </div>
//         );
      
//       case "my-lists":
//         return (
//           <div className="my-lists-content">
//             <div className="section-header">
//               <h2>My Listings</h2>
//               <p>Manage your property listings</p>
//             </div>
            
//             {loading ? (
//               <div className="loading-state">
//                 <div className="loading-spinner"></div>
//                 <p>Loading your listings...</p>
//               </div>
//             ) : error ? (
//               <div className="error-state">
//                 <span className="error-icon">⚠️</span>
//                 <p>{error}</p>
//                 <button onClick={() => window.location.reload()} className="retry-btn">
//                   Try Again
//                 </button>
//               </div>
//             ) : listings.length > 0 ? (
//               <div className="listings-grid">
//                 {listings.map((listing) => (
//                   <div key={listing._id} className="listing-card">
//                     <div className="card-image">
//                       {listing.images && listing.images.length > 0 ? (
//                         <img 
//                           src={`http://localhost:5000/${listing.images[0]}`} 
//                           alt={listing.title} 
//                         />
//                       ) : (
//                         <div className="image-placeholder">
//                           <span className="placeholder-icon">🏠</span>
//                         </div>
//                       )}
//                     </div>
//                     <div className="card-content">
//                       <h3 className="card-title">{listing.title || listing.location}</h3>
//                       <p className="card-description">
//                         {listing.description?.substring(0, 100)}...
//                       </p>
//                       <p className="card-price">₹{listing.rentMoney}/month</p>
//                       <div className="card-actions">
//                         <Link to={`/listing/${listing._id}`} className="view-btn">
//                           View Details
//                         </Link>
//                         <button
//                           className="edit-btn"
//                           onClick={() => navigate(`/edit-listing/${listing._id}`)}
//                         >
//                           Edit
//                         </button>
//                         <button
//                           className="delete-btn"
//                           onClick={() => handleDeleteListing(listing._id)}
//                         >
//                           Delete
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <div className="empty-state">
//                 <div className="empty-icon">📝</div>
//                 <h3>No listings found</h3>
//                 <p>You haven't created any property listings yet.</p>
//                 <Link to="/list-your-flat" className="create-listing-btn">
//                   Create Your First Listing
//                 </Link>
//               </div>
//             )}
//           </div>
//         );
      
//       case "favourite":
//         return (
//           <div className="favourites-content">
//             <div className="section-header">
//               <h2>Favourite Properties</h2>
//               <p>Your saved properties will appear here</p>
//             </div>
            
//             <div className="empty-state">
//               <div className="empty-icon">❤️</div>
//               <h3>No favourites yet</h3>
//               <p>Start saving properties you're interested in by clicking the heart icon.</p>
//               <Link to="/" className="browse-btn">
//                 Browse Properties
//               </Link>
//             </div>
//           </div>
//         );
      
//       default:
//         return (
//           <div className="error-state">
//             <p>Select a valid section.</p>
//           </div>
//         );
//     }
//   };

//   return (
//     <div className="user-profile-container">
//       <div className="profile-sidebar">
//         <div className="sidebar-header">
//           <div className="user-avatar">
//             <span className="avatar-icon">👤</span>
//           </div>
//           <h2>User Profile</h2>
//         </div>
        
//         <nav className="sidebar-nav">
//           <button 
//             className={`nav-item ${activeTab === "profile" ? "active" : ""}`}
//             onClick={() => setActiveTab("profile")}
//           >
//             <span className="nav-icon">📋</span>
//             My Profile
//           </button>
          
//           <button 
//             className={`nav-item ${activeTab === "my-lists" ? "active" : ""}`}
//             onClick={() => setActiveTab("my-lists")}
//           >
//             <span className="nav-icon">📝</span>
//             My Listings
//           </button>
          
//           <button 
//             className={`nav-item ${activeTab === "favourite" ? "active" : ""}`}
//             onClick={() => setActiveTab("favourite")}
//           >
//             <span className="nav-icon">❤️</span>
//             Favourites
//           </button>
//         </nav>
//       </div>

//       <div className="profile-content-area">
//         {renderContent()}
//       </div>

//       <style jsx>{`
//         .user-profile-container {
//           display: flex;
//           min-height: 100vh;
//           background: #f8fafc;
//           font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
//         }
        
//         /* Sidebar Styles */
//         .profile-sidebar {
//           width: 280px;
//           background: white;
//           box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
//           padding: 2rem 0;
//         }
        
//         .sidebar-header {
//           text-align: center;
//           padding: 0 1.5rem 2rem;
//           border-bottom: 1px solid #e2e8f0;
//           margin-bottom: 1rem;
//         }
        
//         .user-avatar {
//           width: 80px;
//           height: 80px;
//           border-radius: 50%;
//           background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           margin: 0 auto 1rem;
//         }
        
//         .avatar-icon {
//           font-size: 2.5rem;
//         }
        
//         .sidebar-header h2 {
//           color: #2d3748;
//           font-size: 1.5rem;
//           font-weight: 600;
//         }
        
//         .sidebar-nav {
//           padding: 0 1rem;
//         }
        
//         .nav-item {
//           display: flex;
//           align-items: center;
//           gap: 0.75rem;
//           width: 100%;
//           padding: 1rem 1.25rem;
//           border: none;
//           background: transparent;
//           border-radius: 8px;
//           cursor: pointer;
//           transition: all 0.3s ease;
//           color: #718096;
//           font-weight: 500;
//           font-size: 1rem;
//           margin-bottom: 0.5rem;
//         }
        
//         .nav-item:hover {
//           background: #f7fafc;
//           color: #4299e1;
//         }
        
//         .nav-item.active {
//           background: #4299e1;
//           color: white;
//         }
        
//         .nav-icon {
//           font-size: 1.2rem;
//         }
        
//         /* Content Area Styles */
//         .profile-content-area {
//           flex: 1;
//           padding: 2rem;
//           overflow-y: auto;
//         }
        
//         /* Common Styles */
//         .section-header {
//           margin-bottom: 2rem;
//         }
        
//         .section-header h2 {
//           color: #2d3748;
//           font-size: 2rem;
//           font-weight: 700;
//           margin-bottom: 0.5rem;
//         }
        
//         .section-header p {
//           color: #718096;
//           font-size: 1.1rem;
//         }
        
//         /* Profile Content */
//         .profile-header {
//           display: flex;
//           align-items: center;
//           gap: 1.5rem;
//           margin-bottom: 2rem;
//         }
        
//         .profile-avatar {
//           width: 100px;
//           height: 100px;
//           border-radius: 50%;
//           background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
//           display: flex;
//           align-items: center;
//           justify-content: center;
//         }
        
//         .profile-info h2 {
//           color: #2d3748;
//           margin-bottom: 0.5rem;
//         }
        
//         .profile-info p {
//           color: #718096;
//         }
        
//         .profile-details {
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
//           gap: 1.5rem;
//         }
        
//         .detail-card {
//           background: white;
//           padding: 1.5rem;
//           border-radius: 12px;
//           box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
//         }
        
//         .detail-card h3 {
//           color: #2d3748;
//           margin-bottom: 1rem;
//           font-size: 1.25rem;
//         }
        
//         .detail-item {
//           display: flex;
//           justify-content: space-between;
//           padding: 0.75rem 0;
//           border-bottom: 1px solid #e2e8f0;
//         }
        
//         .detail-item:last-child {
//           border-bottom: none;
//         }
        
//         .detail-label {
//           color: #718096;
//           font-weight: 500;
//         }
        
//         .detail-value {
//           color: #2d3748;
//           font-weight: 600;
//         }
        
//         .settings-btn {
//           display: flex;
//           align-items: center;
//           gap: 0.5rem;
//           width: 100%;
//           padding: 0.75rem;
//           border: 1px solid #e2e8f0;
//           background: white;
//           border-radius: 8px;
//           cursor: pointer;
//           transition: all 0.3s ease;
//           margin-bottom: 0.5rem;
//           color: #4a5568;
//           font-weight: 500;
//         }
        
//         .settings-btn:hover {
//           border-color: #4299e1;
//           background: #f7fafc;
//         }
        
//         /* Listings Grid */
//         .listings-grid {
//           display: grid;
//           grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
//           gap: 1.5rem;
//         }
        
//         .listing-card {
//           background: white;
//           border-radius: 12px;
//           overflow: hidden;
//           box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
//           transition: transform 0.3s ease;
//         }
        
//         .listing-card:hover {
//           transform: translateY(-5px);
//         }
        
//         .card-image {
//           height: 200px;
//           overflow: hidden;
//         }
        
//         .card-image img {
//           width: 100%;
//           height: 100%;
//           object-fit: cover;
//         }
        
//         .image-placeholder {
//           height: 100%;
//           background: #f1f5f9;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//         }
        
//         .placeholder-icon {
//           font-size: 3rem;
//           color: #94a3b8;
//         }
        
//         .card-content {
//           padding: 1.5rem;
//         }
        
//         .card-title {
//           color: #2d3748;
//           font-size: 1.25rem;
//           font-weight: 600;
//           margin-bottom: 0.5rem;
//         }
        
//         .card-description {
//           color: #718096;
//           margin-bottom: 1rem;
//           line-height: 1.5;
//         }
        
//         .card-price {
//           color: #48bb78;
//           font-size: 1.5rem;
//           font-weight: 700;
//           margin-bottom: 1.5rem;
//         }
        
//         .card-actions {
//           display: flex;
//           gap: 0.5rem;
//         }
        
//         .view-btn, .edit-btn, .delete-btn {
//           padding: 0.5rem 1rem;
//           border: none;
//           border-radius: 6px;
//           cursor: pointer;
//           font-weight: 500;
//           transition: all 0.3s ease;
//           text-decoration: none;
//           font-size: 0.9rem;
//         }
        
//         .view-btn {
//           background: #4299e1;
//           color: white;
//         }
        
//         .view-btn:hover {
//           background: #3182ce;
//         }
        
//         .edit-btn {
//           background: #e2e8f0;
//           color: #4a5568;
//         }
        
//         .edit-btn:hover {
//           background: #cbd5e0;
//         }
        
//         .delete-btn {
//           background: #fed7d7;
//           color: #c53030;
//         }
        
//         .delete-btn:hover {
//           background: #feb2b2;
//         }
        
//         /* Empty States */
//         .empty-state {
//           text-align: center;
//           padding: 3rem 2rem;
//           background: white;
//           border-radius: 12px;
//           box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
//         }
        
//         .empty-icon {
//           font-size: 4rem;
//           margin-bottom: 1rem;
//         }
        
//         .empty-state h3 {
//           color: #2d3748;
//           margin-bottom: 0.5rem;
//         }
        
//         .empty-state p {
//           color: #718096;
//           margin-bottom: 1.5rem;
//         }
        
//         .create-listing-btn, .browse-btn {
//           display: inline-block;
//           padding: 0.75rem 1.5rem;
//           background: #4299e1;
//           color: white;
//           text-decoration: none;
//           border-radius: 8px;
//           font-weight: 600;
//           transition: all 0.3s ease;
//         }
        
//         .create-listing-btn:hover, .browse-btn:hover {
//           background: #3182ce;
//           transform: translateY(-2px);
//         }
        
//         /* Loading State */
//         .loading-state {
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           justify-content: center;
//           padding: 3rem;
//           background: white;
//           border-radius: 12px;
//         }
        
//         .loading-spinner {
//           width: 40px;
//           height: 40px;
//           border: 3px solid #e2e8f0;
//           border-top: 3px solid #4299e1;
//           border-radius: 50%;
//           animation: spin 1s linear infinite;
//           margin-bottom: 1rem;
//         }
        
//         @keyframes spin {
//           0% { transform: rotate(0deg); }
//           100% { transform: rotate(360deg); }
//         }
        
//         /* Error State */
//         .error-state {
//           text-align: center;
//           padding: 2rem;
//           background: #fff5f5;
//           border: 1px solid #fed7d7;
//           border-radius: 12px;
//           color: #c53030;
//         }
        
//         .error-icon {
//           font-size: 2rem;
//           margin-bottom: 1rem;
//         }
        
//         .retry-btn {
//           padding: 0.5rem 1rem;
//           background: #4299e1;
//           color: white;
//           border: none;
//           border-radius: 6px;
//           cursor: pointer;
//           margin-top: 1rem;
//         }
        
//         /* Responsive Design */
//         @media (max-width: 768px) {
//           .user-profile-container {
//             flex-direction: column;
//           }
          
//           .profile-sidebar {
//             width: 100%;
//             padding: 1rem;
//           }
          
//           .sidebar-nav {
//             display: flex;
//             overflow-x: auto;
//             gap: 0.5rem;
//             padding: 0;
//           }
          
//           .nav-item {
//             white-space: nowrap;
//             margin-bottom: 0;
//           }
          
//           .profile-content-area {
//             padding: 1rem;
//           }
          
//           .listings-grid {
//             grid-template-columns: 1fr;
//           }
          
//           .profile-header {
//             flex-direction: column;
//             text-align: center;
//           }
          
//           .profile-details {
//             grid-template-columns: 1fr;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default UserProfile;

// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";

// const UserProfile = ({ section }) => {
//   const [listings, setListings] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   // Fetch user listings when the "my-lists" section is active
//   useEffect(() => {
//     const fetchListings = async () => {
//       if (section === "my-lists") {
//         setLoading(true);
//         try {
//           const response = await axios.get("/api/listings/my-lists", {
//             headers: {
//               'x-auth-token': localStorage.getItem("token") // Use the same header key as in middleware
//             },
//           });
//           setListings(response.data);
//         } catch (err) {
//           setError("Failed to load your listings. Please try again.");
//         } finally {
//           setLoading(false);
//         }
//       }
//     };
//     fetchListings();
//   }, [section]);

//   // Handle content rendering based on the section
//   const renderContent = () => {
//     switch (section) {
//       case "profile":
//         return (
//           <div>
//             <h3 className="mt-4">My Profile</h3>
//             <p>Details about the user go here.</p>
//           </div>
//         );
//       case "my-lists":
//         return (
//           <div>
//             <h3 className="mt-4">My Lists</h3>
//             {loading ? (
//               <p>Loading your listings...</p>
//             ) : error ? (
//               <p className="text-danger">{error}</p>
//             ) : listings.length > 0 ? (
//               listings.map((listing) => (
//                 <div key={listing._id} className="card mb-2">
//                   <div className="card-body">
//                     <h5 className="card-title">{listing.title}</h5>
//                     <p className="card-text">{listing.description}</p>
//                     <Link to={`/listing/${listing._id}`} className="btn btn-primary">
//                       View Details
//                     </Link>
//                     <button
//                       className="btn btn-secondary ms-2"
//                       onClick={() => navigate(`/edit-listing/${listing._id}`)}
//                     >
//                       Edit Listing
//                     </button>
//                     <button
//                       className="btn btn-danger ms-2"
//                       onClick={() => handleDeleteListing(listing._id)}
//                     >
//                       Delete Listing
//                     </button>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <p>No listings found.</p>
//             )}
//           </div>
//         );
//       case "favourite":
//         return (
//           <div>
//             <h3 className="mt-4">Favourite</h3>
//             <p>Your favourite flats will be displayed here.</p>
//           </div>
//         );
//       default:
//         return <p>Select a valid section.</p>;
//     }
//   };

//   // Handle listing deletion
//   const handleDeleteListing = async (id) => {
//     try {
//       await axios.delete(`/api/listings/${id}`, {
//         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//       });
//       setListings(listings.filter((listing) => listing._id !== id));
//     } catch (err) {
//       alert("Failed to delete the listing. Please try again.");
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <ul className="nav nav-tabs">
//         <li className="nav-item">
//           <Link className={`nav-link ${section === "profile" ? "active" : ""}`} to="/profile">
//             My Profile
//           </Link>
//         </li>
//         <li className="nav-item">
//           <Link className={`nav-link ${section === "my-lists" ? "active" : ""}`} to="/my-lists">
//             My Lists
//           </Link>
//         </li>
//         <li className="nav-item">
//           <Link className={`nav-link ${section === "favourite" ? "active" : ""}`} to="/favourite">
//             Favourite
//           </Link>
//         </li>
//       </ul>

//       {/* Render the section content */}
//       <div className="tab-content mt-4">{renderContent()}</div>
//     </div>
//   );
// };

// export default UserProfile;


