import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ListingCard from '../components/ListingCard';
import axios from 'axios';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  const [listings, setListings] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        setLoading(true);
        setError('');
        const API = process.env.REACT_APP_API_URL;
        const [searchResponse, favoritesResponse] = await Promise.all([
          fetch(`${API}/listings/search?q=${query}`),
          axios.get(`${API}/users/favorites`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          })
        ]);

        const searchData = await searchResponse.json();

        if (searchResponse.ok) {
          setListings(searchData);
          setFavorites(favoritesResponse.data);
        } else {
          setError(searchData.message || 'No results found for your search');
        }
      } catch (err) {
        setError('Error fetching search results. Please try again.');
        console.error('Search error:', err);
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchSearchResults();
    }
  }, [query]);

  const isFavorite = (listingId) => {
    return favorites.some(fav => fav._id === listingId);
  };

  const toggleFavorite = async (listingId) => {
    const isFav = isFavorite(listingId);
    try {
      if (isFav) {
        const API = process.env.REACT_APP_API_URL;
        await axios.delete(`${API}/users/favorites/${listingId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setFavorites(favorites.filter(fav => fav._id !== listingId));
      } else {
        const API = process.env.REACT_APP_API_URL;
        await axios.post(`${API}/users/favorites/${listingId}`, {}, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setFavorites([...favorites, listings.find(listing => listing._id === listingId)]);
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  return (
    <div className="search-results-container">
      <div className="search-results-header">
        <div className="search-info">
          <h1>Search Results</h1>
          <p className="search-query">"{query}"</p>
          {listings.length > 0 && (
            <p className="results-count">{listings.length} {listings.length === 1 ? 'property' : 'properties'} found</p>
          )}
        </div>
        
        <div className="search-illustration">
          <div className="illustration-icon">🔍</div>
        </div>
      </div>

      {loading ? (
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Searching properties...</p>
        </div>
      ) : error ? (
        <div className="error-state">
          <div className="error-icon">⚠️</div>
          <h3>No results found</h3>
          <p>{error}</p>
          <div className="suggestions">
            <p>Try adjusting your search:</p>
            <ul>
              <li>Check your spelling</li>
              <li>Try more general keywords</li>
              <li>Search by city, neighborhood, or zip code</li>
            </ul>
          </div>
        </div>
      ) : listings.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">🏠</div>
          <h3>No properties match your search</h3>
          <p>Try different keywords or browse all available properties</p>
        </div>
      ) : (
        <div className="search-results-content">
          <div className="results-grid">
            {listings.map((listing) => (
              <ListingCard 
                key={listing._id} 
                listing={listing} 
                isFavorite={isFavorite(listing._id)}
                toggleFavorite={toggleFavorite}
              />
            ))}
          </div>
        </div>
      )}

      <style jsx>{`
        /* Search Results Container */
        .search-results-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem 1.5rem;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        
        /* Search Header */
        .search-results-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 3rem;
          padding: 2rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 16px;
          color: white;
        }
        
        .search-info h1 {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }
        
        .search-query {
          font-size: 1.2rem;
          opacity: 0.9;
          margin-bottom: 0.5rem;
        }
        
        .results-count {
          font-size: 1rem;
          opacity: 0.8;
        }
        
        .search-illustration {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .illustration-icon {
          font-size: 4rem;
          opacity: 0.8;
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
          border-top: 4px solid #667eea;
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
          border-radius: 12px;
          border: 1px solid #fed7d7;
        }
        
        .error-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
        }
        
        .error-state h3 {
          color: #c53030;
          margin-bottom: 1rem;
        }
        
        .error-state p {
          color: #718096;
          margin-bottom: 2rem;
        }
        
        .suggestions {
          text-align: left;
          max-width: 400px;
          margin: 0 auto;
        }
        
        .suggestions p {
          font-weight: 600;
          color: #4a5568;
          margin-bottom: 0.5rem;
        }
        
        .suggestions ul {
          color: #718096;
          padding-left: 1.5rem;
        }
        
        .suggestions li {
          margin-bottom: 0.5rem;
        }
        
        /* Empty State */
        .empty-state {
          text-align: center;
          padding: 4rem 2rem;
        }
        
        .empty-icon {
          font-size: 4rem;
          margin-bottom: 1.5rem;
        }
        
        .empty-state h3 {
          color: #2d3748;
          margin-bottom: 1rem;
          font-size: 1.5rem;
        }
        
        .empty-state p {
          color: #718096;
          font-size: 1.1rem;
        }
        
        /* Results Grid */
        .results-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 2rem;
          margin-top: 2rem;
        }
        
        /* Responsive Design */
        @media (max-width: 768px) {
          .search-results-header {
            flex-direction: column;
            text-align: center;
            gap: 1.5rem;
            padding: 1.5rem;
          }
          
          .search-info h1 {
            font-size: 2rem;
          }
          
          .illustration-icon {
            font-size: 3rem;
          }
          
          .results-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
        }
        
        @media (max-width: 480px) {
          .search-results-container {
            padding: 1rem;
          }
          
          .search-results-header {
            padding: 1.2rem;
          }
          
          .search-info h1 {
            font-size: 1.7rem;
          }
        }
      `}</style>
    </div>
  );
};

export default SearchResults;

// // // src/pages/SearchResults.js

// import React, { useState, useEffect } from 'react';
// import { useSearchParams } from 'react-router-dom';
// import { Container, Row, Col } from 'react-bootstrap';
// import ListingCard from '../components/ListingCard';
// import axios from 'axios';

// const SearchResults = () => {
//   const [searchParams] = useSearchParams();
//   const query = searchParams.get('q');
//   const [listings, setListings] = useState([]);
//   const [favorites, setFavorites] = useState([]);  // To store user's favorites
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchSearchResults = async () => {
//       try {
//         const response = await fetch(`http://localhost:5000/api/listings/search?q=${query}`);
//         const data = await response.json();

//         const favoritesResponse = await axios.get('http://localhost:5000/api/users/favorites', {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('token')}`
//           }
//         });

//         if (response.ok) {
//           setListings(data);
//           setFavorites(favoritesResponse.data);  // Set user's current favorites
//         } else {
//           setError(data.message || 'No results found for your search');
//         }
//       } catch (err) {
//         setError('Error fetching search results');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchSearchResults();
//   }, [query]);

//   // Function to check if a listing is a favorite
//   const isFavorite = (listingId) => {
//     return favorites.some(fav => fav._id === listingId);
//   };

//   // Toggle favorite status of a listing
//   const toggleFavorite = async (listingId) => {
//     const isFav = isFavorite(listingId);
//     try {
//       if (isFav) {
//         // Remove from favorites
//         await axios.delete(`http://localhost:5000/api/users/favorites/${listingId}`, {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('token')}`
//           }
//         });
//         setFavorites(favorites.filter(fav => fav._id !== listingId));
//       } else {
//         // Add to favorites
//         await axios.post(`http://localhost:5000/api/users/favorites/${listingId}`, {}, {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('token')}`
//           }
//         });
//         setFavorites([...favorites, listings.find(listing => listing._id === listingId)]);
//       }
//     } catch (error) {
//       console.error('Error toggling favorite:', error);
//     }
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>{error}</div>;
//   }

//   return (
//     <Container>
//       <h2>Search Results for "{query}"</h2>
//       {listings.length === 0 ? (
//         <p>No listings found for your search</p>
//       ) : (
//         <Row>
//           {listings.map((listing) => (
//             <Col key={listing._id} md={4} className="mb-4">
//               <ListingCard 
//                 listing={listing} 
//                 isFavorite={isFavorite(listing._id)}
//                 toggleFavorite={toggleFavorite}
//               />
//             </Col>
//           ))}
//         </Row>
//       )}
//     </Container>
//   );
// };

// export default SearchResults;

