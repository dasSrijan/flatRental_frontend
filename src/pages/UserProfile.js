// // src/components/UserProfile.js
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams, useNavigate } from 'react-router-dom';

// const UserProfile = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [user, setUser] = useState({ username: '', email: '' });
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(true);

//   const fetchUserProfile = async () => {
//     try {
//       const response = await axios.get(`http://localhost:5000/api/users/${id}`);
//       setUser(response.data);
//     } catch (error) {
//       setError('Failed to fetch user profile');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchUserProfile();
//   }, [id]);

//   const handleChange = (e) => {
//     setUser({ ...user, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.put(`http://localhost:5000/api/users/${id}`, user);
//       alert('Profile updated successfully');
//       navigate(`/profile/${id}`); // Redirect to profile page
//     } catch (error) {
//       setError('Failed to update profile');
//     }
//   };

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div className="alert alert-danger">{error}</div>;

//   return (
//     <div className="container mt-5">
//       <h2>User Profile</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label>Username</label>
//           <input
//             type="text"
//             name="username"
//             className="form-control"
//             value={user.username}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label>Email</label>
//           <input
//             type="email"
//             name="email"
//             className="form-control"
//             value={user.email}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <button type="submit" className="btn btn-primary">Update Profile</button>
//       </form>
//     </div>
//   );
// };

// export default UserProfile;


// // src/pages/UserProfile.js
import React from 'react';

const UserProfile = () => {
  return (
    <div>
      <h1>User Profile</h1>
      <p>Welcome to your profile page!</p>
      {/* Display more user details here if needed */}
    </div>
  );
};

export default UserProfile;
