import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ListingCard from '../components/ListingCard';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const API = process.env.REACT_APP_API_URL;  
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        setLoading(true);
        setError('');
        const response = await axios.get(`${API}/users/favorites`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setFavorites(response.data);
      } catch (err) {
        console.error('Error fetching favorites:', err);
        setError('Failed to load your favorites. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  const handleRemoveFromFavorites = async (listingId) => {
    try {
      await axios.delete(`${API}/users/favorites/${listingId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setFavorites(favorites.filter(listing => listing._id !== listingId));
    } catch (err) {
      console.error('Error removing favorite:', err);
      setError('Failed to remove from favorites. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="favorites-container">
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Loading your favorites...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="favorites-container">
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
    <div className="favorites-container">
      <div className="favorites-header">
        <div className="header-content">
          <h1>My Favorites</h1>
          <p>Your saved properties that caught your eye</p>
          <div className="favorites-count">
            <span className="count-number">{favorites.length}</span>
            <span className="count-label">saved properties</span>
          </div>
        </div>
        <div className="header-illustration">
          <div className="heart-icon">❤️</div>
        </div>
      </div>

      {favorites.length === 0 ? (
        <div className="empty-state">
          <div className="empty-heart">💔</div>
          <h2>No favorites yet</h2>
          <p>Start exploring listings and click the heart icon to save properties you love!</p>
          <div className="empty-actions">
            <button 
              onClick={() => window.location.href = '/'}
              className="explore-btn"
            >
              Explore Properties
            </button>
          </div>
        </div>
      ) : (
        <div className="favorites-content">
          <div className="filters-section">
            <div className="filter-group">
              <span className="filter-label">Sort by:</span>
              <select className="filter-select">
                <option>Recently added</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Location</option>
              </select>
            </div>
            <button className="clear-all-btn" onClick={() => {
              if (window.confirm('Are you sure you want to clear all favorites?')) {
                setFavorites([]);
              }
            }}>
              Clear All
            </button>
          </div>

          <div className="favorites-grid">
            {favorites.map((listing) => (
              <div key={listing._id} className="favorite-card-wrapper">
                <ListingCard 
                  key={listing._id} 
                  listing={listing} 
                  isFavorite={true}
                  onRemoveFavorite={handleRemoveFromFavorites}
                />
                <button 
                  className="remove-favorite-btn"
                  onClick={() => handleRemoveFromFavorites(listing._id)}
                  title="Remove from favorites"
                >
                  ❌
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <style jsx>{`
        .favorites-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem 1rem;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        
        /* Header Styles */
        .favorites-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%);
          color: white;
          padding: 2.5rem;
          border-radius: 20px;
          margin-bottom: 3rem;
          box-shadow: 0 10px 30px rgba(255, 107, 107, 0.3);
        }
        
        .header-content h1 {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }
        
        .header-content p {
          font-size: 1.1rem;
          opacity: 0.9;
          margin-bottom: 1.5rem;
        }
        
        .favorites-count {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .count-number {
          font-size: 2rem;
          font-weight: 700;
        }
        
        .count-label {
          font-size: 1rem;
          opacity: 0.8;
        }
        
        .header-illustration {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .heart-icon {
          font-size: 4rem;
          animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
        
        /* Empty State */
        .empty-state {
          text-align: center;
          padding: 4rem 2rem;
          background: white;
          border-radius: 20px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }
        
        .empty-heart {
          font-size: 4rem;
          margin-bottom: 1.5rem;
          opacity: 0.7;
        }
        
        .empty-state h2 {
          color: #2d3748;
          font-size: 1.8rem;
          margin-bottom: 1rem;
        }
        
        .empty-state p {
          color: #718096;
          font-size: 1.1rem;
          margin-bottom: 2rem;
          max-width: 400px;
          margin-left: auto;
          margin-right: auto;
        }
        
        .explore-btn {
          background: linear-gradient(135deg, #4299e1 0%, #3182ce 100%);
          color: white;
          border: none;
          padding: 1rem 2rem;
          border-radius: 10px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .explore-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(66, 153, 225, 0.4);
        }
        
        /* Favorites Content */
        .favorites-content {
          background: white;
          border-radius: 20px;
          padding: 2rem;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }
        
        .filters-section {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
          padding-bottom: 1.5rem;
          border-bottom: 1px solid #e2e8f0;
        }
        
        .filter-group {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        
        .filter-label {
          color: #4a5568;
          font-weight: 600;
        }
        
        .filter-select {
          padding: 0.5rem 1rem;
          border: 2px solid #e2e8f0;
          border-radius: 8px;
          background: white;
          cursor: pointer;
        }
        
        .clear-all-btn {
          background: #fed7d7;
          color: #c53030;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.3s ease;
        }
        
        .clear-all-btn:hover {
          background: #feb2b2;
        }
        
        /* Favorites Grid */
        .favorites-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 2rem;
        }
        
        .favorite-card-wrapper {
          position: relative;
          transition: transform 0.3s ease;
        }
        
        .favorite-card-wrapper:hover {
          transform: translateY(-5px);
        }
        
        .remove-favorite-btn {
          position: absolute;
          top: 10px;
          right: 10px;
          background: rgba(255, 255, 255, 0.9);
          border: none;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 1.2rem;
          transition: all 0.3s ease;
          z-index: 10;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        
        .remove-favorite-btn:hover {
          background: white;
          transform: scale(1.1);
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
          border-top: 4px solid #ff6b6b;
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
        }
        
        .retry-btn:hover {
          background: #3182ce;
        }
        
        /* Responsive Design */
        @media (max-width: 768px) {
          .favorites-header {
            flex-direction: column;
            text-align: center;
            gap: 1.5rem;
            padding: 2rem;
          }
          
          .filters-section {
            flex-direction: column;
            gap: 1rem;
            align-items: stretch;
          }
          
          .filter-group {
            justify-content: center;
          }
          
          .favorites-grid {
            grid-template-columns: 1fr;
          }
          
          .header-content h1 {
            font-size: 2rem;
          }
        }
        
        @media (max-width: 480px) {
          .favorites-container {
            padding: 1rem;
          }
          
          .favorites-header {
            padding: 1.5rem;
          }
          
          .favorites-content {
            padding: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Favorites;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import ListingCard from '../components/ListingCard';
// // import './Dashboard.css'; // Reusing the same CSS as the Dashboard for consistent styling

// const Favorites = () => {
//   const [favorites, setFavorites] = useState([]);

//   useEffect(() => {
//     const fetchFavorites = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/users/favorites', {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('token')}`,
//           },
//         });
//         setFavorites(response.data);
//       } catch (err) {
//         console.error('Error fetching favorites:', err);
//       }
//     };

//     fetchFavorites();
//   }, []);

//   return (
//     <div className="dashboard"> {/* Reusing Dashboard container class */}
//       <h2 className="dashboard-title">My Favorites</h2> {/* Consistent title styling */}
//       {favorites.length === 0 ? (
//         <p>No favorites yet. Start exploring listings to add them to your favorites!</p>
//       ) : (
//         <div className="card-container"> {/* Consistent card container styling */}
//           {favorites.map((listing) => (
//             <ListingCard key={listing._id} listing={listing} isFavorite={true} />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Favorites;



