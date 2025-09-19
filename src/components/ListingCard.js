import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ListingCard = ({ listing, isFavorite }) => {
  const [favorite, setFavorite] = useState(isFavorite);
  const [isLoading, setIsLoading] = useState(false);

  const toggleFavorite = async () => {
    setIsLoading(true);
    try {
      if (favorite) {
        // Remove from favorites
        await axios.delete(`${process.env.REACT_APP_API_URL}/favorites/${listing._id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setFavorite(false);
      } else {
        // Add to favorites
        await axios.post(`${process.env.REACT_APP_API_URL}/favorites/${listing._id}`, {}, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setFavorite(true);
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fallback image if none provided
  const imageUrl = listing.images && listing.images.length > 0 
    ? `${process.env.REACT_APP_FILES_URL}/${listing.images[0]}`
    : 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80';

  return (
    <div className="listing-card">
      <div className="card-image">
        <img src={imageUrl} alt={listing.location} />
        <button 
          className={`favorite-button ${favorite ? 'favorited' : ''} ${isLoading ? 'loading' : ''}`}
          onClick={toggleFavorite}
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="favorite-spinner"></div>
          ) : (
            <span className="favorite-icon">{favorite ? '❤️' : '🤍'}</span>
          )}
        </button>
        <div className="card-price">${listing.rentMoney}/month</div>
      </div>
      
      <div className="card-content">
        <h3 className="card-title">{listing.location}</h3>
        <p className="card-address">{listing.address}</p>
        
        <div className="card-features">
          {listing.bedrooms && <span>🛏️ {listing.bedrooms} bed</span>}
          {listing.bathrooms && <span>🚿 {listing.bathrooms} bath</span>}
          {listing.area && <span>📏 {listing.area} sq ft</span>}
        </div>
        
        <div className="card-actions">
          <Link to={`/listing/${listing._id}`} className="view-details-btn">
            View Details
          </Link>
          <button 
            className={`favorite-text-btn ${favorite ? 'favorited' : ''}`}
            onClick={toggleFavorite}
            disabled={isLoading}
          >
            {favorite ? 'Remove from Favorites' : 'Add to Favorites'}
          </button>
        </div>
      </div>

      <style jsx>{`
        .listing-card {
          background: white;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
          position: relative;
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
        
        .card-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        
        .listing-card:hover .card-image img {
          transform: scale(1.05);
        }
        
        .favorite-button {
          position: absolute;
          top: 12px;
          right: 12px;
          background: rgba(255, 255, 255, 0.95);
          border: none;
          border-radius: 50%;
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 1.3rem;
          transition: all 0.3s ease;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        
        .favorite-button:hover:not(:disabled) {
          background: white;
          transform: scale(1.1);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
        }
        
        .favorite-button.favorited {
          background: rgba(255, 228, 228, 0.95);
        }
        
        .favorite-button.loading {
          cursor: not-allowed;
          opacity: 0.8;
        }
        
        .favorite-spinner {
          width: 20px;
          height: 20px;
          border: 2px solid #f1f1f1;
          border-top: 2px solid #e53e3e;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .card-price {
          position: absolute;
          bottom: 12px;
          left: 12px;
          background: rgba(0, 0, 0, 0.8);
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-weight: 700;
          font-size: 1.1rem;
        }
        
        .card-content {
          padding: 1.5rem;
        }
        
        .card-title {
          font-size: 1.3rem;
          font-weight: 700;
          color: #2d3748;
          margin-bottom: 0.5rem;
          line-height: 1.3;
        }
        
        .card-address {
          color: #718096;
          margin-bottom: 1rem;
          font-size: 0.95rem;
          line-height: 1.4;
        }
        
        .card-features {
          display: flex;
          gap: 1rem;
          margin-bottom: 1.5rem;
          flex-wrap: wrap;
        }
        
        .card-features span {
          background: #f7fafc;
          padding: 0.4rem 0.8rem;
          border-radius: 12px;
          font-size: 0.85rem;
          color: #4a5568;
        }
        
        .card-actions {
          display: flex;
          gap: 0.8rem;
        }
        
        .view-details-btn {
          flex: 2;
          text-align: center;
          background: #4299e1;
          color: white;
          padding: 0.8rem;
          border-radius: 10px;
          text-decoration: none;
          font-weight: 600;
          transition: all 0.3s ease;
          border: none;
          cursor: pointer;
          font-size: 0.95rem;
        }
        
        .view-details-btn:hover {
          background: #3182ce;
          transform: translateY(-2px);
        }
        
        .favorite-text-btn {
          flex: 1;
          background: transparent;
          color: #718096;
          border: 1px solid #e2e8f0;
          padding: 0.8rem;
          border-radius: 10px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 0.85rem;
          white-space: nowrap;
        }
        
        .favorite-text-btn:hover:not(:disabled) {
          background: #f7fafc;
          border-color: #cbd5e0;
        }
        
        .favorite-text-btn.favorited {
          color: #e53e3e;
          border-color: #fed7d7;
          background: #fff5f5;
        }
        
        .favorite-text-btn.favorited:hover:not(:disabled) {
          background: #fed7d7;
        }
        
        .favorite-text-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        
        @media (max-width: 768px) {
          .card-actions {
            flex-direction: column;
          }
          
          .card-features {
            gap: 0.5rem;
          }
          
          .card-features span {
            font-size: 0.8rem;
          }
        }
        
        @media (max-width: 480px) {
          .card-image {
            height: 180px;
          }
          
          .card-content {
            padding: 1.2rem;
          }
        }
      `}</style>
    </div>
  );
};

export default ListingCard;

// import React, { useState } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import { Card, Button } from 'react-bootstrap'; // Using Bootstrap for styling

// const ListingCard = ({ listing, isFavorite }) => {
//   const [favorite, setFavorite] = useState(isFavorite);

//   const toggleFavorite = async () => {
//     try {
//       if (favorite) {
//         // Remove from favorites
//         await axios.delete(`http://localhost:5000/api/favorites/${listing._id}`, {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('token')}`,
//           },
//         });
//         setFavorite(false);
//       } else {
//         // Add to favorites
//         await axios.post(`http://localhost:5000/api/favorites/${listing._id}`, {}, {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('token')}`,
//           },
//         });
//         setFavorite(true);
//       }
//     } catch (error) {
//       console.error('Error toggling favorite:', error);
//     }
//   };

//   return (
//     <Card className="listing-card">
//       <Card.Img variant="top" src={`http://localhost:5000/${listing.images[0]}`} alt={listing.location} />
//       <Card.Body>
//         <Card.Title>{listing.location}</Card.Title>
//         <Card.Text>Rent: {listing.rentMoney}</Card.Text>
//         <Card.Text>{listing.address}</Card.Text>
//         {/* View Details Button */}
//         <div className="d-flex justify-content-evenly">
//         <Link to={`/listing/${listing._id}`} className="btn btn-primary">
//           View Details
//         </Link>
//         {/* Favorite Button */}
//         <Button variant={favorite ? 'danger' : 'outline-danger'} onClick={toggleFavorite} className="ml-2">
//           {favorite ? 'Unfavorite' : 'Favorite'}
//         </Button>
//         </div>
//       </Card.Body>
//     </Card>
//   );
// };

// export default ListingCard;


