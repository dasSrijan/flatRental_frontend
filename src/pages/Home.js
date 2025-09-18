import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Home.css'; // We'll create this CSS file

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  // Function to check if the user is authenticated
  const isAuthenticated = () => {
    return localStorage.getItem('token');
  };

  const handleSearch = () => {
    if (isAuthenticated()) {
      if (searchQuery) {
        navigate(`/search?q=${searchQuery}`);
      }
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Find Your Perfect Flat Near You!</h1>
          <p>Renting made easy for students and professionals</p>
          
          {isAuthenticated() ? (
            <div className="auth-actions">
              <div className="search-container">
                <input
                  type="text"
                  className="search-input"
                  placeholder="Enter location or pin code"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
                <button className="search-btn" onClick={handleSearch}>
                  <span>Start Searching</span>
                  <i className="search-icon">→</i>
                </button>
              </div>
              <Link to="/list-your-flat" className="list-flat-btn">
                List Your Flat
              </Link>
            </div>
          ) : (
            <div className="guest-message">
              <p>Please <Link to="/login" className="auth-link">log in</Link> or <Link to="/signup" className="auth-link">sign up</Link> to start searching or list your flat.</p>
            </div>
          )}
        </div>
        <div className="hero-image"></div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <h2>Why Choose Us?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🔍</div>
              <h3>Easy Search</h3>
              <p>Find flats near your location or desired pin code with just a few clicks.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📋</div>
              <h3>Responsive Listings</h3>
              <p>View detailed flat listings with images, videos, descriptions, and contact details.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📍</div>
              <h3>Distance Calculation</h3>
              <p>Know exactly how far a flat is from your current location.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works-section">
        <div className="container">
          <h2>How It Works</h2>
          <div className="process-container">
            <div className="process-column">
              <h3>For Renters</h3>
              <div className="step">
                <div className="step-number">1</div>
                <div className="step-content">
                  <h4>Sign up or log in</h4>
                  <p>Create your account to get started</p>
                </div>
              </div>
              <div className="step">
                <div className="step-number">2</div>
                <div className="step-content">
                  <h4>Search for flats</h4>
                  <p>Find properties near your location</p>
                </div>
              </div>
              <div className="step">
                <div className="step-number">3</div>
                <div className="step-content">
                  <h4>Contact the seller</h4>
                  <p>View details and get in touch directly</p>
                </div>
              </div>
            </div>
            
            <div className="process-column">
              <h3>For Sellers</h3>
              <div className="step">
                <div className="step-number">1</div>
                <div className="step-content">
                  <h4>Sign up and list your flat</h4>
                  <p>Create your account as a property owner</p>
                </div>
              </div>
              <div className="step">
                <div className="step-number">2</div>
                <div className="step-content">
                  <h4>Add flat details</h4>
                  <p>Include images, videos, and descriptions</p>
                </div>
              </div>
              <div className="step">
                <div className="step-number">3</div>
                <div className="step-content">
                  <h4>Manage your listings</h4>
                  <p>Handle inquiries and bookings easily</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      {!isAuthenticated() && (
        <section className="cta-section">
          <div className="container">
            <h2>Ready to find your new home?</h2>
            <p>Join thousands of satisfied users today</p>
            <Link to="/signup" className="cta-button">Sign Up Now</Link>
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;

// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';

// const Home = () => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const navigate = useNavigate();

//   // Function to check if the user is authenticated
//   const isAuthenticated = () => {
//     return localStorage.getItem('token'); // Check if the auth token exists in localStorage
//   };

//   const handleSearch = () => {
//     if (isAuthenticated()) {
//       if (searchQuery) {
//         navigate(`/search?q=${searchQuery}`);
//       }
//     } else {
//       navigate('/login');
//     }
//   };

//   return (
//     <div className="container mt-5">
//       {/* Hero Section */}
//       <div className="hero-section text-center py-5">
//         <h1>Find Your Perfect Flat Near You!</h1>
//         <p>Renting made easy for students and professionals.</p>

//         {/* Conditionally render the search and list your flat options based on authentication */}
//         {isAuthenticated() ? (
//           <>
//             {/* Search Input Field */}
//             <div className="input-group mb-3">
//               <input
//                 type="text"
//                 className="form-control"
//                 placeholder="Enter location or pin code"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//               />
//               <button className="btn btn-primary" onClick={handleSearch}>
//                 Start Searching
//               </button>
//             </div>

//             {/* List Your Flat button */}
//             <Link to="/list-your-flat" className="btn btn-outline-secondary ms-3">
//               List Your Flat
//             </Link>
//           </>
//         ) : (
//           <>
//             {/* Message for non-authenticated users */}
//             <p>Please <Link to="/login">log in</Link> or <Link to="/signup">sign up</Link> to start searching or list your flat.</p>
//           </>
//         )}
//       </div>

//       {/* Features Section */}
//       <div className="features-section py-5">
//         <h2 className="text-center">Why Choose Us?</h2>
//         <div className="row text-center">
//           <div className="col-md-4">
//             <h3>Easy Search</h3>
//             <p>Find flats near your location or desired pin code with just a few clicks.</p>
//           </div>
//           <div className="col-md-4">
//             <h3>Responsive Listings</h3>
//             <p>View detailed flat listings with images, videos, descriptions, and contact details.</p>
//           </div>
//           <div className="col-md-4">
//             <h3>Distance Calculation</h3>
//             <p>Know exactly how far a flat is from your current location.</p>
//           </div>
//         </div>
//       </div>

//       {/* How It Works Section */}
//       <div className="how-it-works-section py-5">
//         <h2 className="text-center">How It Works</h2>
//         <div className="row">
//           <div className="col-md-6">
//             <h4>For Buyers</h4>
//             <ol>
//               <li>Sign up or log in.</li>
//               <li>Search for flats near your location.</li>
//               <li>View flat details and contact the seller.</li>
//             </ol>
//           </div>
//           <div className="col-md-6">
//             <h4>For Sellers</h4>
//             <ol>
//               <li>Sign up and list your flat.</li>
//               <li>Add flat images, videos, and details.</li>
//               <li>Manage your listings and bookings.</li>
//             </ol>
//           </div>
//         </div>
//       </div>

//       {/* Call to Action */}
//       {/* <div className="call-to-action text-center py-5">
//         <h2>Ready to find your new home?</h2>
//         <Link to="/signup" className="btn btn-success">Sign Up Now</Link>
//       </div> */}
//       {isAuthenticated() ? (
//         <>
//           {/* Search Input Field */}
//           {/* <h2>Ready to find your new home?</h2> */}
//         </>
//       ) : (
//         <>
//           {/* Message for non-authenticated users */}
//           <h2>Ready to find your new home?</h2>
//           <Link to="/signup" className="btn btn-success">Sign Up Now</Link>
//         </>
//       )}
//     </div>
//   );
// };

// export default Home;
