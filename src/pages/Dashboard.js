import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ListingCard from '../components/ListingCard';
import './Dashboard.css';

function Dashboard() {
  const [listings, setListings] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [listingsResponse, favoritesResponse] = await Promise.all([
          axios.get('http://localhost:5000/api/listings'),
          axios.get('http://localhost:5000/api/users/favorites', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          })
        ]);
        
        console.log('Listings:', listingsResponse.data);
        setListings(listingsResponse.data);
        setFavorites(favoritesResponse.data);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load listings. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const isFavorite = (listingId) => {
    return favorites.some((fav) => fav._id === listingId);
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Available Listings</h1>
        <p>Discover your perfect flat from our curated collection</p>
      </div>

      {isLoading ? (
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Loading listings...</p>
        </div>
      ) : error ? (
        <div className="error-state">
          <div className="error-icon">⚠️</div>
          <p>{error}</p>
          <button 
            className="retry-button"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      ) : (
        <>
          {listings.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">🏠</div>
              <h3>No listings available</h3>
              <p>Check back later for new property listings</p>
            </div>
          ) : (
            <div className="listings-grid">
              {listings.map((listing) => (
                <ListingCard
                  key={listing._id}
                  listing={listing}
                  isFavorite={isFavorite(listing._id)}
                />
              ))}
            </div>
          )}
        </>
      )}
      
      <style jsx>{`
        /* Dashboard Container */
        .dashboard-container {
          padding: 2rem;
          max-width: 1200px;
          margin: 0 auto;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        
        /* Dashboard Header */
        .dashboard-header {
          text-align: center;
          margin-bottom: 3rem;
        }
        
        .dashboard-header h1 {
          font-size: 2.5rem;
          font-weight: 700;
          color: #2d3748;
          margin-bottom: 0.5rem;
        }
        
        .dashboard-header p {
          font-size: 1.1rem;
          color: #718096;
        }
        
        /* Listings Grid */
        .listings-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 2rem;
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
          margin-bottom: 1rem;
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
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 4rem 2rem;
          text-align: center;
        }
        
        .error-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
        }
        
        .error-state p {
          color: #e53e3e;
          font-size: 1.1rem;
          margin-bottom: 1.5rem;
        }
        
        .retry-button {
          background: #4299e1;
          color: white;
          border: none;
          padding: 0.8rem 1.5rem;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }
        
        .retry-button:hover {
          background: #3182ce;
        }
        
        /* Empty State */
        .empty-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 4rem 2rem;
          text-align: center;
        }
        
        .empty-icon {
          font-size: 4rem;
          margin-bottom: 1rem;
        }
        
        .empty-state h3 {
          font-size: 1.5rem;
          color: #2d3748;
          margin-bottom: 0.5rem;
        }
        
        .empty-state p {
          color: #718096;
          font-size: 1.1rem;
        }
        
        /* Responsive Design */
        @media (max-width: 768px) {
          .dashboard-container {
            padding: 1rem;
          }
          
          .dashboard-header h1 {
            font-size: 2rem;
          }
          
          .listings-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
}

export default Dashboard;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import ListingCard from '../components/ListingCard';
// import './Dashboard.css'; // Custom CSS for styling

// function Dashboard() {
//   const [listings, setListings] = useState([]);
//   const [favorites, setFavorites] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const listingsResponse = await axios.get('http://localhost:5000/api/listings');
//         console.log('Listings:', listingsResponse.data); // Add this line to log the listings data
//         const favoritesResponse = await axios.get('http://localhost:5000/api/users/favorites', {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('token')}`,
//           },
//         });
//         setListings(listingsResponse.data);
//         setFavorites(favoritesResponse.data);
//       } catch (err) {
//         console.error('Error fetching data:', err);
//       }
//     };
//     fetchData();
//   }, []);
 

//   const isFavorite = (listingId) => {
//     return favorites.some((fav) => fav._id === listingId);
//   };


//   return (
//     <div className="dashboard">
//       <h2 className="dashboard-title">Available Listings</h2>
//       {listings.length === 0 ? <p>No listings available</p> : null} {/* Add this line */}
//       <div className="card-container">
//         {listings.map((listing) => (
//           <ListingCard
//             key={listing._id}
//             listing={listing}
//             isFavorite={isFavorite(listing._id)}
//           />
//         ))}
//       </div>
//     </div>
//   );
  
  
// }

// export default Dashboard;

