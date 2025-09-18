import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MyProfile = () => {
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('profile');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError('');
        const response = await axios.get('http://localhost:5000/api/listings/profile', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setProfile(response.data);
      } catch (err) {
        setError('Error fetching profile. Please try again.');
        console.error('Profile fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="profile-container">
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="profile-container">
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
    <div className="profile-container">
      <div className="profile-content">
        {/* Profile Header */}
        <div className="profile-header">
          <div className="profile-avatar">
            <span className="avatar-icon">{profile.username?.charAt(0).toUpperCase() || 'U'}</span>
          </div>
          <div className="profile-info">
            <h1>{profile.username}</h1>
            <p className="profile-email">{profile.email}</p>
            <p className="profile-member">Member since {new Date().getFullYear()}</p>
          </div>
        </div>

        {/* Profile Navigation */}
        <div className="profile-nav">
          <button 
            className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            <span className="nav-icon">👤</span>
            Profile
          </button>
          <button 
            className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            <span className="nav-icon">⚙️</span>
            Settings
          </button>
          <button 
            className={`nav-item ${activeTab === 'activity' ? 'active' : ''}`}
            onClick={() => setActiveTab('activity')}
          >
            <span className="nav-icon">📊</span>
            Activity
          </button>
        </div>

        {/* Profile Content */}
        <div className="profile-details">
          {activeTab === 'profile' && (
            <div className="tab-content">
              <h2>Personal Information</h2>
              <div className="info-grid">
                <div className="info-card">
                  <div className="info-icon">👤</div>
                  <div className="info-content">
                    <h3>Username</h3>
                    <p>{profile.username}</p>
                  </div>
                </div>
                
                <div className="info-card">
                  <div className="info-icon">📧</div>
                  <div className="info-content">
                    <h3>Email Address</h3>
                    <p>{profile.email}</p>
                  </div>
                </div>
                
                <div className="info-card">
                  <div className="info-icon">📅</div>
                  <div className="info-content">
                    <h3>Member Since</h3>
                    <p>{new Date().toLocaleDateString()}</p>
                  </div>
                </div>
                
                <div className="info-card">
                  <div className="info-icon">🔒</div>
                  <div className="info-content">
                    <h3>Account Status</h3>
                    <p className="status-active">Active</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="tab-content">
              <h2>Account Settings</h2>
              <div className="settings-grid">
                <button className="settings-btn">
                  <span className="btn-icon">✏️</span>
                  Edit Profile
                </button>
                <button className="settings-btn">
                  <span className="btn-icon">🔒</span>
                  Change Password
                </button>
                <button className="settings-btn">
                  <span className="btn-icon">🔔</span>
                  Notification Preferences
                </button>
                <button className="settings-btn">
                  <span className="btn-icon">👁️</span>
                  Privacy Settings
                </button>
              </div>
            </div>
          )}

          {activeTab === 'activity' && (
            <div className="tab-content">
              <h2>Recent Activity</h2>
              <div className="activity-empty">
                <div className="empty-icon">📊</div>
                <h3>No recent activity</h3>
                <p>Your activity will appear here as you use the platform</p>
              </div>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="quick-actions">
          <h2>Quick Actions</h2>
          <div className="actions-grid">
            <button className="action-btn primary">
              <span className="action-icon">🏠</span>
              View My Listings
            </button>
            <button className="action-btn secondary">
              <span className="action-icon">❤️</span>
              My Favorites
            </button>
            <button className="action-btn tertiary">
              <span className="action-icon">⚡</span>
              Upgrade Account
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .profile-container {
          max-width: 1000px;
          margin: 0 auto;
          padding: 2rem 1rem;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        
        .profile-content {
          background: white;
          border-radius: 20px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          overflow: hidden;
        }
        
        /* Profile Header */
        .profile-header {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 3rem 2rem;
          text-align: center;
          position: relative;
        }
        
        .profile-avatar {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1.5rem;
          backdrop-filter: blur(10px);
          border: 3px solid rgba(255, 255, 255, 0.3);
        }
        
        .avatar-icon {
          font-size: 2.5rem;
          font-weight: 700;
        }
        
        .profile-info h1 {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }
        
        .profile-email {
          font-size: 1.1rem;
          opacity: 0.9;
          margin-bottom: 0.5rem;
        }
        
        .profile-member {
          font-size: 0.9rem;
          opacity: 0.8;
        }
        
        /* Profile Navigation */
        .profile-nav {
          display: flex;
          background: #f8fafc;
          border-bottom: 1px solid #e2e8f0;
        }
        
        .nav-item {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 1.5rem;
          border: none;
          background: transparent;
          cursor: pointer;
          transition: all 0.3s ease;
          color: #718096;
          font-weight: 600;
          font-size: 1rem;
        }
        
        .nav-item:hover {
          color: #4299e1;
          background: rgba(66, 153, 225, 0.1);
        }
        
        .nav-item.active {
          color: #4299e1;
          background: white;
          border-bottom: 3px solid #4299e1;
        }
        
        .nav-icon {
          font-size: 1.2rem;
        }
        
        /* Profile Details */
        .profile-details {
          padding: 2rem;
        }
        
        .tab-content h2 {
          color: #2d3748;
          font-size: 1.8rem;
          margin-bottom: 1.5rem;
          font-weight: 600;
        }
        
        .info-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
        }
        
        .info-card {
          background: #f7fafc;
          padding: 1.5rem;
          border-radius: 12px;
          display: flex;
          align-items: center;
          gap: 1rem;
          transition: transform 0.3s ease;
        }
        
        .info-card:hover {
          transform: translateY(-2px);
        }
        
        .info-icon {
          font-size: 2rem;
          width: 60px;
          height: 60px;
          background: white;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        
        .info-content h3 {
          color: #718096;
          font-size: 0.9rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }
        
        .info-content p {
          color: #2d3748;
          font-size: 1.1rem;
          font-weight: 500;
        }
        
        .status-active {
          color: #48bb78 !important;
          font-weight: 600;
        }
        
        /* Settings Grid */
        .settings-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
        }
        
        .settings-btn {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1.5rem;
          border: 2px solid #e2e8f0;
          background: white;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          color: #4a5568;
          font-weight: 600;
          font-size: 1rem;
        }
        
        .settings-btn:hover {
          border-color: #4299e1;
          background: #f7fafc;
          transform: translateY(-2px);
        }
        
        .btn-icon {
          font-size: 1.3rem;
        }
        
        /* Activity */
        .activity-empty {
          text-align: center;
          padding: 3rem 2rem;
          color: #718096;
        }
        
        .empty-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
          opacity: 0.5;
        }
        
        .activity-empty h3 {
          margin-bottom: 0.5rem;
          color: #4a5568;
        }
        
        /* Quick Actions */
        .quick-actions {
          padding: 2rem;
          background: #f8fafc;
          border-top: 1px solid #e2e8f0;
        }
        
        .quick-actions h2 {
          color: #2d3748;
          margin-bottom: 1.5rem;
          font-size: 1.5rem;
        }
        
        .actions-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
        }
        
        .action-btn {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1.5rem;
          border: none;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-weight: 600;
          font-size: 1rem;
        }
        
        .action-btn.primary {
          background: linear-gradient(135deg, #4299e1 0%, #3182ce 100%);
          color: white;
        }
        
        .action-btn.secondary {
          background: #e2e8f0;
          color: #4a5568;
        }
        
        .action-btn.tertiary {
          background: linear-gradient(135deg, #ed8936 0%, #dd6b20 100%);
          color: white;
        }
        
        .action-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }
        
        .action-icon {
          font-size: 1.3rem;
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
        }
        
        .retry-btn:hover {
          background: #3182ce;
        }
        
        /* Responsive Design */
        @media (max-width: 768px) {
          .profile-nav {
            flex-direction: column;
          }
          
          .info-grid, .settings-grid, .actions-grid {
            grid-template-columns: 1fr;
          }
          
          .profile-header {
            padding: 2rem 1rem;
          }
          
          .profile-info h1 {
            font-size: 2rem;
          }
          
          .profile-details, .quick-actions {
            padding: 1.5rem;
          }
        }
        
        @media (max-width: 480px) {
          .profile-container {
            padding: 1rem;
          }
          
          .info-card {
            flex-direction: column;
            text-align: center;
          }
          
          .profile-info h1 {
            font-size: 1.8rem;
          }
        }
      `}</style>
    </div>
  );
};

export default MyProfile;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Container, Card, Button } from 'react-bootstrap'; // Import Bootstrap components

// const MyProfile = () => {
//   const [profile, setProfile] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/listings/profile', {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('token')}`, // Assuming you use token for auth
//           },
//         });
//         setProfile(response.data);
//       } catch (err) {
//         setError('Error fetching profile');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfile();
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>{error}</div>;
//   }

//   return (
//     <Container className="my-4">
//       <h2 className="mb-4">My Profile</h2>
//       <Card style={{ width: '18rem' }} className="mx-auto">
//         <Card.Body>
//           <Card.Title>{profile.username}</Card.Title>
//           <Card.Text>
//             <strong>Email:</strong> {profile.email}
//           </Card.Text>
//           <Card.Text>
//             <strong>Username:</strong> {profile.username}
//           </Card.Text>
//           {/* Add more user details here if needed */}
//           {/* <Button variant="primary">Edit Profile</Button> */}
//         </Card.Body>
//       </Card>
//     </Container>
//   );
// };

// export default MyProfile;