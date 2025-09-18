import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleSelect = (eventKey) => {
    navigate(eventKey);
    setIsProfileOpen(false);
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm("Do you want to log out?");
    if (confirmLogout) {
      localStorage.removeItem('token');
      alert("You have been logged out.");
      navigate('/login');
      setIsMenuOpen(false);
    } else {
      alert("Logout canceled.");
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (isProfileOpen) setIsProfileOpen(false);
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link className="nav-brand" to="/">
          <span className="brand-icon">🏠</span>
          FlatRental
        </Link>

        {/* Desktop Navigation */}
        <div className="nav-menu desktop-menu">
          <Link className="nav-link" to="/" onClick={() => setIsMenuOpen(false)}>
            Home
          </Link>
          
          {token ? (
            <>
              <Link className="nav-link" to="/dashboard" onClick={() => setIsMenuOpen(false)}>
                Dashboard
              </Link>
              <Link className="nav-link" to="/profile" onClick={() => setIsMenuOpen(false)}>
                <span className="item-icon">📋</span>
                My Profile
              </Link>
              <Link className="nav-link" to="/my-lists" onClick={() => setIsMenuOpen(false)}>
                <span className="item-icon">📝</span>
                My Lists
              </Link>
              <Link className="nav-link" to="/favourites" onClick={() => setIsMenuOpen(false)}>
                <span className="item-icon">❤️</span>
                My favorites
              </Link>
              
              {/* <div className="dropdown-container">
                <button className="dropdown-toggle" onClick={toggleProfile}>
                  <span className="user-icon">👤</span>
                  My Profile
                  <span className={`dropdown-arrow ${isProfileOpen ? 'open' : ''}`}>▼</span>
                </button>
                {isProfileOpen && (
                  <div className="dropdown-menu">
                    <button onClick={() => handleSelect('/profile')} className="dropdown-item">
                      <span className="item-icon">📋</span>
                      My Profile
                    </button>
                    <button onClick={() => handleSelect('/my-lists')} className="dropdown-item">
                      <span className="item-icon">📝</span>
                      My Lists
                    </button>
                    <button onClick={() => handleSelect('/favourites')} className="dropdown-item">
                      <span className="item-icon">❤️</span>
                      Favourites
                    </button>
                  </div>
                )}
              </div> */}
              
              <button className="logout-btn" onClick={handleLogout}>
                <span className="btn-icon">🚪</span>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="nav-link" to="/login" onClick={() => setIsMenuOpen(false)}>
                Login
              </Link>
              <Link className="nav-link signup-btn" to="/signup" onClick={() => setIsMenuOpen(false)}>
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="mobile-menu-btn" onClick={toggleMenu}>
          <span className={`hamburger ${isMenuOpen ? 'open' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="mobile-menu-overlay">
            <div className="mobile-menu">
              <Link className="mobile-nav-link" to="/" onClick={() => setIsMenuOpen(false)}>
                <span className="mobile-icon">🏠</span>
                Home
              </Link>
              
              {token ? (
                <>
                  <Link className="mobile-nav-link" to="/dashboard" onClick={() => setIsMenuOpen(false)}>
                    <span className="mobile-icon">📊</span>
                    Dashboard
                  </Link>
                  
                  <button className="mobile-nav-link" onClick={() => handleSelect('/profile')}>
                    <span className="mobile-icon">📋</span>
                    My Profile
                  </button>
                  
                  <button className="mobile-nav-link" onClick={() => handleSelect('/my-lists')}>
                    <span className="mobile-icon">📝</span>
                    My Lists
                  </button>
                  
                  <button className="mobile-nav-link" onClick={() => handleSelect('/favourites')}>
                    <span className="mobile-icon">❤️</span>
                    Favourites
                  </button>
                  
                  <button className="mobile-nav-link logout-btn" onClick={handleLogout}>
                    <span className="mobile-icon">🚪</span>
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link className="mobile-nav-link" to="/login" onClick={() => setIsMenuOpen(false)}>
                    <span className="mobile-icon">🔐</span>
                    Login
                  </Link>
                  <Link className="mobile-nav-link signup-btn" to="/signup" onClick={() => setIsMenuOpen(false)}>
                    <span className="mobile-icon">✏️</span>
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .navbar {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 0;
          box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
          position: sticky;
          top: 0;
          z-index: 1000;
        }
        
        .nav-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 70px;
        }
        
        .nav-brand {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 1.5rem;
          font-weight: 700;
          color: white;
          text-decoration: none;
          transition: transform 0.3s ease;
        }
        
        .nav-brand:hover {
          transform: scale(1.05);
        }
        
        .brand-icon {
          font-size: 1.8rem;
        }
        
        /* Desktop Navigation */
        .desktop-menu {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }
        
        @media (max-width: 768px) {
          .desktop-menu {
            display: none;
          }
        }
        
        .nav-link {
          color: white;
          text-decoration: none;
          font-weight: 500;
          padding: 0.5rem 1rem;
          border-radius: 8px;
          transition: all 0.3s ease;
          position: relative;
        }
        
        .nav-link:hover {
          background: rgba(255, 255, 255, 0.1);
          transform: translateY(-2px);
        }
        
        .signup-btn {
          background: rgba(255, 255, 255, 0.2);
          border: 2px solid rgba(255, 255, 255, 0.3);
        }
        
        .signup-btn:hover {
          background: rgba(255, 255, 255, 0.3);
          border-color: rgba(255, 255, 255, 0.5);
        }
        
        /* Dropdown Styles */
        .dropdown-container {
          position: relative;
        }
        
        .dropdown-toggle {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: transparent;
          border: none;
          color: white;
          font-weight: 500;
          padding: 0.5rem 1rem;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 1rem;
          font-family: inherit;
        }
        
        .dropdown-toggle:hover {
          background: rgba(255, 255, 255, 0.1);
        }
        
        .dropdown-arrow {
          font-size: 0.7rem;
          transition: transform 0.3s ease;
        }
        
        .dropdown-arrow.open {
          transform: rotate(180deg);
        }
        
        .dropdown-menu {
          position: absolute;
          top: 100%;
          left: 0;
          background: white;
          border-radius: 12px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
          padding: 0.5rem;
          min-width: 200px;
          z-index: 1000;
          margin-top: 0.5rem;
        }
        
        .dropdown-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          width: 100%;
          padding: 0.75rem 1rem;
          border: none;
          background: transparent;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
          color: #2d3748;
          font-weight: 500;
          font-size: 0.95rem;
          font-family: inherit;
        }
        
        .dropdown-item:hover {
          background: #f7fafc;
          color: #667eea;
        }
        
        .item-icon {
          font-size: 1.1rem;
        }
        
        /* Logout Button */
        .logout-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(255, 255, 255, 0.15);
          border: 2px solid rgba(255, 255, 255, 0.2);
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-weight: 500;
          font-size: 1rem;
          font-family: inherit;
        }
        
        .logout-btn:hover {
          background: rgba(255, 255, 255, 0.25);
          border-color: rgba(255, 255, 255, 0.3);
        }
        
        /* Mobile Menu */
        .mobile-menu-btn {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.5rem;
        }
        
        @media (max-width: 768px) {
          .mobile-menu-btn {
            display: block;
          }
        }
        
        .hamburger {
          display: flex;
          flex-direction: column;
          gap: 4px;
          width: 24px;
          height: 24px;
          position: relative;
        }
        
        .hamburger span {
          display: block;
          height: 2px;
          width: 100%;
          background: white;
          border-radius: 2px;
          transition: all 0.3s ease;
          transform-origin: center;
        }
        
        .hamburger.open span:nth-child(1) {
          transform: rotate(45deg) translate(6px, 6px);
        }
        
        .hamburger.open span:nth-child(2) {
          opacity: 0;
        }
        
        .hamburger.open span:nth-child(3) {
          transform: rotate(-45deg) translate(6px, -6px);
        }
        
        .mobile-menu-overlay {
          position: fixed;
          top: 70px;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          z-index: 999;
        }
        
        .mobile-menu {
          background: white;
          padding: 1rem;
          border-radius: 0 0 16px 16px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }
        
        .mobile-nav-link {
          display: flex;
          align-items: center;
          gap: 1rem;
          width: 100%;
          padding: 1rem;
          border: none;
          background: transparent;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
          color: #2d3748;
          font-weight: 500;
          font-size: 1.1rem;
          text-decoration: none;
          font-family: inherit;
        }
        
        .mobile-nav-link:hover {
          background: #f7fafc;
          color: #667eea;
        }
        
        .mobile-nav-link.signup-btn {
          background: #667eea;
          color: white;
          justify-content: center;
        }
        
        .mobile-nav-link.signup-btn:hover {
          background: #5a67d8;
        }
        
        .mobile-nav-link.logout-btn {
          background: #fed7d7;
          color: #c53030;
          justify-content: center;
        }
        
        .mobile-nav-link.logout-btn:hover {
          background: #feb2b2;
        }
        
        .mobile-icon {
          font-size: 1.3rem;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;

// // src/components/Navbar.js
// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { Dropdown } from 'react-bootstrap'; // Import Bootstrap Dropdown

// const Navbar = () => {
//   const navigate = useNavigate();
//   const token = localStorage.getItem('token');

//   const handleSelect = (eventKey) => {
//     // Navigate to the respective page based on dropdown selection
//     navigate(eventKey);
//   };

//   // Handle Logout with confirmation popup
//   const handleLogout = () => {
//     const confirmLogout = window.confirm("Do you want to log out?");
//     if (confirmLogout) {
//       localStorage.removeItem('token'); // Remove the user's token
//       alert("You have been logged out.");
//       navigate('/login'); // Redirect to the login page
//     } else {
//       alert("Logout canceled.");
//     }
//   };

//   return (
//     <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
//       <div className="container">
//         <Link className="navbar-brand" to="/">
//           Flat Rental
//         </Link>
//         <button
//           className="navbar-toggler"
//           type="button"
//           data-bs-toggle="collapse"
//           data-bs-target="#navbarNav"
//           aria-controls="navbarNav"
//           aria-expanded="false"
//           aria-label="Toggle navigation"
//         >
//           <span className="navbar-toggler-icon"></span>
//         </button>
//         <div className="collapse navbar-collapse" id="navbarNav">
//           <ul className="navbar-nav ms-auto">
//             <li className="nav-item">
//               <Link className="nav-link" to="/">
//                 Home
//               </Link>
//             </li>
//             {/* If user is logged in, show User Profile, Dashboard, and Logout */}
//             {token ? (
//               <>
//                 <li className="nav-item">
//                   <Link className="nav-link" to="/dashboard">
//                     Dashboard
//                   </Link>
//                 </li>
//                 <li className="nav-item">
//                   <Dropdown onSelect={handleSelect}>
//                     <Dropdown.Toggle variant="success" id="dropdown-basic">
//                       User Profile
//                     </Dropdown.Toggle>

//                     <Dropdown.Menu>
//                       <Dropdown.Item eventKey="/profile">My Profile</Dropdown.Item>
//                       <Dropdown.Item eventKey="/my-lists">My Lists</Dropdown.Item>
//                       <Dropdown.Item eventKey="/favourites">Favourites</Dropdown.Item>
//                     </Dropdown.Menu>
//                   </Dropdown>
//                 </li>
//                 <li className="nav-item">
//                   <button className="btn btn-secondary nav-link" onClick={handleLogout}>
//                     Logout
//                   </button>
//                 </li>
//               </>
//             ) : (
//               // If user is not logged in, show Login and Sign Up
//               <>
//                 <li className="nav-item">
//                   <Link className="nav-link" to="/login">
//                     Login
//                   </Link>
//                 </li>
//                 <li className="nav-item">
//                   <Link className="nav-link" to="/signup">
//                     Sign Up
//                   </Link>
//                 </li>
//               </>
//             )}
//           </ul>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;


