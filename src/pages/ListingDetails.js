import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ListingDetails = () => {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const fetchListingDetails = async () => {
      try {
        setLoading(true);
        setError('');
        const API = process.env.REACT_APP_API_URL;
        const [listingResponse, favoritesResponse] = await Promise.all([
          fetch(`${API}/listings/${id}`),
          axios.get(`${API}/favorites`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          })
        ]);

        const listingData = await listingResponse.json();

        if (listingResponse.ok) {
          setListing(listingData);
          setFavorites(favoritesResponse.data);
        } else {
          setError('Listing not found');
        }
      } catch (err) {
        setError('Error fetching listing details');
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchListingDetails();
  }, [id]);

  const isFavorite = (listingId) => {
    return favorites.some((fav) => fav._id === listingId);
  };

  const toggleFavorite = async (listingId) => {
    const isFav = isFavorite(listingId);
    try {
      if (isFav) {
        const API = process.env.REACT_APP_API_URL;
        await axios.delete(`${API}/favorites/${listingId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setFavorites(favorites.filter((fav) => fav._id !== listingId));
      } else {
        const API = process.env.REACT_APP_API_URL;
        await axios.post(`${API}/favorites/${listingId}`, {}, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setFavorites([...favorites, listing]);
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  const handleSelect = (selectedIndex) => {
    setActiveIndex(selectedIndex);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading property details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-icon">⚠️</div>
        <h3>Oops! Something went wrong</h3>
        <p>{error}</p>
        <button onClick={() => window.history.back()} className="back-button">
          Go Back
        </button>
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="not-found-container">
        <div className="not-found-icon">🏠</div>
        <h3>Listing Not Found</h3>
        <p>The property you're looking for doesn't exist or has been removed.</p>
        <button onClick={() => window.history.back()} className="back-button">
          Browse Other Properties
        </button>
      </div>
    );
  }
  const API = process.env.REACT_APP_API_URL;
  const mediaItems = [
    ...(listing.images || []).map((image, index) => ({
      type: 'image',
      src: `${process.env.REACT_APP_FILES_URL}/${image}`,
      alt: `Property image ${index + 1}`,
    })),
    ...(listing.videos || []).map((video, index) => ({
      type: 'video',
      src: `${process.env.REACT_APP_FILES_URL}/${video}`,
      alt: `Property video ${index + 1}`,
    }))
  ];

  return (
    <div className="listing-details-container">
      <div className="listing-content">
        {/* Media Gallery */}
        <div className="media-gallery">
          {mediaItems.length > 0 ? (
            <>
              <div className="main-media">
                {mediaItems[activeIndex].type === 'image' ? (
                  <img 
                    src={mediaItems[activeIndex].src} 
                    alt={mediaItems[activeIndex].alt}
                    className="gallery-image"
                  />
                ) : (
                  <video controls className="gallery-video">
                    <source src={mediaItems[activeIndex].src} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                )}
              </div>
              
              {mediaItems.length > 1 && (
                <div className="media-thumbnails">
                  {mediaItems.map((item, index) => (
                    <div
                      key={index}
                      className={`thumbnail ${index === activeIndex ? 'active' : ''}`}
                      onClick={() => setActiveIndex(index)}
                    >
                      {item.type === 'image' ? (
                        <img src={item.src} alt={`Thumbnail ${index + 1}`} />
                      ) : (
                        <div className="video-thumbnail">
                          <span className="play-icon">▶</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="no-media-placeholder">
              <span className="placeholder-icon">🏠</span>
              <p>No images available</p>
            </div>
          )}
        </div>

        {/* Property Details */}
        <div className="property-details">
          <div className="property-header">
            <h1>{listing.location}</h1>
            <div className="price-tag">₹{listing.rentMoney}/month</div>
          </div>

          <div className="property-address">
            <span className="address-icon">📍</span>
            {listing.address}, {listing.pinCode}
          </div>

          <div className="property-description">
            <h3>Description</h3>
            <p>{listing.description}</p>
          </div>

          <div className="property-features">
            <h3>Property Details</h3>
            <div className="features-grid">
              <div className="feature-item">
                <span className="feature-icon">🏢</span>
                <div className="feature-content">
                  <span className="feature-label">Location</span>
                  <span className="feature-value">{listing.location}</span>
                </div>
              </div>
              
              {listing.nearbyInstitutions && (
                <div className="feature-item">
                  <span className="feature-icon">🎓</span>
                  <div className="feature-content">
                    <span className="feature-label">Nearby Institutions</span>
                    <span className="feature-value">{listing.nearbyInstitutions}</span>
                  </div>
                </div>
              )}

              <div className="feature-item">
                <span className="feature-icon">📞</span>
                <div className="feature-content">
                  <span className="feature-label">Contact</span>
                  <span className="feature-value">{listing.contactDetails}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="action-buttons">
            <button
              className={`favorite-button ${isFavorite(listing._id) ? 'favorited' : ''}`}
              onClick={() => toggleFavorite(listing._id)}
            >
              <span className="button-icon">
                {isFavorite(listing._id) ? '❤️' : '🤍'}
              </span>
              {isFavorite(listing._id) ? 'Remove from Favorites' : 'Add to Favorites'}
            </button>
            
            <a 
              href={`tel:${listing.contactDetails}`} 
              className="contact-button"
            >
              <span className="button-icon">📞</span>
              Call Now
            </a>
          </div>
        </div>
      </div>

      <style jsx>{`
        .listing-details-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem 1rem;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        
        .listing-content {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
        }
        
        @media (min-width: 1024px) {
          .listing-content {
            grid-template-columns: 1fr 1fr;
            gap: 3rem;
          }
        }
        
        /* Media Gallery */
        .media-gallery {
          border-radius: 16px;
          overflow: hidden;
          background: #f8f9fa;
        }
        
        .main-media {
          height: 400px;
          overflow: hidden;
        }
        
        .gallery-image, .gallery-video {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .gallery-video {
          background: #000;
        }
        
        .media-thumbnails {
          display: flex;
          gap: 0.5rem;
          padding: 1rem;
          overflow-x: auto;
        }
        
        .thumbnail {
          width: 80px;
          height: 60px;
          border-radius: 8px;
          overflow: hidden;
          cursor: pointer;
          border: 3px solid transparent;
          transition: all 0.3s ease;
        }
        
        .thumbnail.active {
          border-color: #4299e1;
        }
        
        .thumbnail img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .video-thumbnail {
          width: 100%;
          height: 100%;
          background: #e2e8f0;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .play-icon {
          color: #4299e1;
          font-size: 1.2rem;
        }
        
        .no-media-placeholder {
          height: 300px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: #718096;
        }
        
        .placeholder-icon {
          font-size: 4rem;
          margin-bottom: 1rem;
        }
        
        /* Property Details */
        .property-details {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        
        .property-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 1rem;
        }
        
        .property-header h1 {
          color: #2d3748;
          font-size: 2rem;
          font-weight: 700;
          margin: 0;
          flex: 1;
        }
        
        .price-tag {
          background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-weight: 700;
          font-size: 1.2rem;
          white-space: nowrap;
        }
        
        .property-address {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #718096;
          font-size: 1.1rem;
        }
        
        .property-description h3,
        .property-features h3 {
          color: #2d3748;
          margin-bottom: 1rem;
          font-size: 1.3rem;
        }
        
        .property-description p {
          color: #4a5568;
          line-height: 1.6;
          font-size: 1.1rem;
        }
        
        .features-grid {
          display: grid;
          gap: 1rem;
        }
        
        .feature-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          background: #f7fafc;
          border-radius: 12px;
        }
        
        .feature-icon {
          font-size: 1.5rem;
          flex-shrink: 0;
        }
        
        .feature-content {
          display: flex;
          flex-direction: column;
        }
        
        .feature-label {
          font-size: 0.9rem;
          color: #718096;
          font-weight: 600;
        }
        
        .feature-value {
          color: #2d3748;
          font-weight: 500;
        }
        
        .action-buttons {
          display: flex;
          gap: 1rem;
          margin-top: 2rem;
        }
        
        .favorite-button, .contact-button {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 1rem 1.5rem;
          border: none;
          border-radius: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 1rem;
        }
        
        .favorite-button {
          background: #fff;
          color: #718096;
          border: 2px solid #e2e8f0;
        }
        
        .favorite-button:hover {
          background: #f7fafc;
          border-color: #cbd5e0;
        }
        
        .favorite-button.favorited {
          background: #fff5f5;
          color: #e53e3e;
          border-color: #fed7d7;
        }
        
        .contact-button {
          background: linear-gradient(135deg, #4299e1 0%, #3182ce 100%);
          color: white;
          text-decoration: none;
          text-align: center;
        }
        
        .contact-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(66, 153, 225, 0.4);
        }
        
        /* Loading and Error States */
        .loading-container, .error-container, .not-found-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 50vh;
          text-align: center;
          padding: 2rem;
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
        
        .error-icon, .not-found-icon {
          font-size: 4rem;
          margin-bottom: 1.5rem;
        }
        
        .back-button {
          background: #4299e1;
          color: white;
          border: none;
          padding: 1rem 2rem;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          margin-top: 1.5rem;
          transition: background-color 0.3s ease;
        }
        
        .back-button:hover {
          background: #3182ce;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @media (max-width: 768px) {
          .property-header {
            flex-direction: column;
          }
          
          .action-buttons {
            flex-direction: column;
          }
          
          .main-media {
            height: 300px;
          }
        }
      `}</style>
    </div>
  );
};

export default ListingDetails;

// // // src/pages/ListingDetails.js

// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { Card, Button, Container, Row, Col } from 'react-bootstrap';
// import axios from 'axios';
// import { Carousel } from 'react-bootstrap';
// import './ListingDetails.css'; // Custom styles for additional centering

// const ListingDetails = () => {
//   const { id } = useParams(); // Get listing id from URL params
//   const [listing, setListing] = useState(null);
//   const [favorites, setFavorites] = useState([]); // To store user's favorites
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchListingDetails = async () => {
//       try {
//         const response = await fetch(`http://localhost:5000/api/listings/${id}`);
//         const data = await response.json();

//         const favoritesResponse = await axios.get(`http://localhost:5000/api/favorites`, {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('token')}`,
//           },
//         });

//         if (response.ok) {
//           setListing(data);
//           setFavorites(favoritesResponse.data); // Set user's current favorites
//         } else {
//           setError('Listing not found');
//         }
//       } catch (err) {
//         setError('Error fetching listing details');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchListingDetails();
//   }, [id]);

//   // Function to check if the listing is a favorite
//   const isFavorite = (listingId) => {
//     return favorites.some((fav) => fav._id === listingId);
//   };

//   // Toggle favorite status of the listing
//   const toggleFavorite = async (listingId) => {
//     const isFav = isFavorite(listingId);
//     try {
//       if (isFav) {
//         // Remove from favorites
//         await axios.delete(`http://localhost:5000/api/favorites/${listingId}`, {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('token')}`,
//           },
//         });
//         setFavorites(favorites.filter((fav) => fav._id !== listingId));
//       } else {
//         // Add to favorites
//         await axios.post(`http://localhost:5000/api/favorites/${listingId}`, {}, {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('token')}`,
//           },
//         });
//         setFavorites([...favorites, listing]);
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
//     // <div classname="hello">
//     //   <div> hello </div>
//     // </div>
    
//     <div className="listing-details-container justify-content-center align-items-center">
//       <Container className="justify-content-center align-items-center">
//         {listing ? (
//           <Row className="justify-content-center align-items-center">
//             <Col md={8}>
//               <Card className="shadow-lg p-3">
//                 {/* Carousel to display images/videos */}
//                 <Carousel>
//                   {listing.images.map((image, index) => (
//                     <Carousel.Item key={index}>
//                       <img
//                         className="d-block w-100"
//                         src={`http://localhost:5000/${image}`}
//                         alt={`Image ${index + 1}`}
//                       />
//                     </Carousel.Item>
//                   ))}
//                   {listing.videos.map((video, index) => (
//                     <Carousel.Item key={index}>
//                       <video className="d-block w-100" controls>
//                         <source src={`http://localhost:5000/${video}`} type="video/mp4" />
//                         Your browser does not support the video tag.
//                       </video>
//                     </Carousel.Item>
//                   ))}
//                 </Carousel>
//                 <Card.Body>
//                   <Card.Title className="text-center">{listing.location}</Card.Title>
//                   <Card.Text>
//                     <strong>Address:</strong> {listing.address}
//                     <br />
//                     <strong>Pin Code:</strong> {listing.pinCode}
//                     <br />
//                     <strong>Nearby Institutions:</strong> {listing.nearbyInstitutions}
//                     <br />
//                     <strong>Rent:</strong> ₹{listing.rentMoney}
//                     <br />
//                     <strong>Contact:</strong> {listing.contactDetails}
//                     <br />
//                     <strong>Description:</strong> {listing.description}
//                   </Card.Text>
//                   <div className="text-center">
//                     <Button
//                       variant={isFavorite(listing._id) ? 'danger' : 'outline-danger'}
//                       className="ml-2"
//                       onClick={() => toggleFavorite(listing._id)}
//                     >
//                       {isFavorite(listing._id) ? 'Unfavorite' : 'Favorite'}
//                     </Button>
//                   </div>
//                 </Card.Body>
//               </Card>
//             </Col>
//           </Row>
//         ) : (
//           <p>Listing not found</p>
//         )}
//       </Container>
//     </div>
//   );
// };

// export default ListingDetails;


