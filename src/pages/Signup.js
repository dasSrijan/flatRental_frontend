import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");
    
    try {
      await axios.post("http://localhost:5000/api/auth/signup", user);
      navigate("/login");
    } catch (error) {
      console.error("Signup Error:", error);
      setErrorMessage(error.response?.data?.message || "An error occurred during signup. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <div className="signup-header">
          <h2>Create Your Account</h2>
          <p>Join us to find your perfect flat</p>
        </div>
        
        <form onSubmit={handleSubmit} className="signup-form">
          {errorMessage && (
            <div className="error-message">
              <span className="error-icon">⚠️</span>
              {errorMessage}
            </div>
          )}
          
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              name="username"
              value={user.username}
              onChange={handleChange}
              required
            />
            <span className="input-icon">👤</span>
          </div>
          
          <div className="input-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              name="email"
              value={user.email}
              onChange={handleChange}
              required
            />
            <span className="input-icon">✉️</span>
            <small className="input-help">
              We'll never share your email with anyone else.
            </small>
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Create a password"
              name="password"
              value={user.password}
              onChange={handleChange}
              required
            />
            <span className="input-icon">🔒</span>
          </div>

          <div className="checkbox-group">
            <input 
              type="checkbox" 
              id="terms" 
              required 
            />
            <label htmlFor="terms">
              I agree to the <a href="/terms">Terms of Service</a> and <a href="/privacy">Privacy Policy</a>
            </label>
          </div>
          
          <button 
            type="submit" 
            className={`signup-button ${isLoading ? 'loading' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="button-loader"></span>
            ) : (
              'Create Account'
            )}
          </button>
        </form>
        
        <div className="signup-footer">
          <p>
            Already have an account?{' '}
            <Link to="/login" className="auth-link">Log in</Link>
          </p>
        </div>
      </div>

      <style jsx>{`
        /* Signup Container */
        .signup-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
          padding: 20px;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        
        /* Signup Card */
        .signup-card {
          background: white;
          border-radius: 16px;
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
          width: 100%;
          max-width: 450px;
          padding: 2.5rem;
          transition: transform 0.3s ease;
        }
        
        .signup-card:hover {
          transform: translateY(-5px);
        }
        
        /* Signup Header */
        .signup-header {
          text-align: center;
          margin-bottom: 2rem;
        }
        
        .signup-header h2 {
          color: #333;
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }
        
        .signup-header p {
          color: #666;
          font-size: 1rem;
        }
        
        /* Signup Form */
        .signup-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        
        /* Error Message */
        .error-message {
          background: #ffebee;
          color: #c62828;
          padding: 0.8rem 1rem;
          border-radius: 8px;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.9rem;
        }
        
        /* Input Groups */
        .input-group {
          position: relative;
        }
        
        .input-group label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 600;
          color: #444;
          font-size: 0.9rem;
        }
        
        .input-group input {
          width: 100%;
          padding: 1rem 1rem 1rem 3rem;
          border: 1px solid #ddd;
          border-radius: 8px;
          font-size: 1rem;
          transition: all 0.3s ease;
          box-sizing: border-box;
        }
        
        .input-group input:focus {
          outline: none;
          border-color: #6a11cb;
          box-shadow: 0 0 0 3px rgba(106, 17, 203, 0.2);
        }
        
        .input-icon {
          position: absolute;
          left: 1rem;
          bottom: 1rem;
          font-size: 1.2rem;
        }
        
        .input-help {
          display: block;
          margin-top: 0.5rem;
          color: #666;
          font-size: 0.8rem;
        }
        
        /* Checkbox Group */
        .checkbox-group {
          display: flex;
          align-items: flex-start;
          gap: 0.5rem;
          margin: 1rem 0;
        }
        
        .checkbox-group input {
          margin-top: 0.2rem;
          accent-color: #6a11cb;
        }
        
        .checkbox-group label {
          font-size: 0.9rem;
          color: #555;
          line-height: 1.4;
        }
        
        .checkbox-group a {
          color: #6a11cb;
          text-decoration: none;
          font-weight: 600;
        }
        
        .checkbox-group a:hover {
          text-decoration: underline;
        }
        
        /* Signup Button */
        .signup-button {
          background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
          color: white;
          border: none;
          padding: 1rem;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          height: 50px;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 1rem;
        }
        
        .signup-button:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(106, 17, 203, 0.4);
        }
        
        .signup-button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        
        .signup-button.loading {
          background: linear-gradient(135deg, #8b46e3 0%, #4a88f3 100%);
        }
        
        .button-loader {
          width: 20px;
          height: 20px;
          border: 3px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          border-top-color: white;
          animation: spin 1s ease-in-out infinite;
        }
        
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        
        /* Signup Footer */
        .signup-footer {
          text-align: center;
          margin-top: 1.5rem;
          color: #666;
        }
        
        .auth-link {
          color: #6a11cb;
          text-decoration: none;
          font-weight: 600;
          transition: color 0.3s ease;
        }
        
        .auth-link:hover {
          color: #2575fc;
          text-decoration: underline;
        }
        
        /* Responsive Design */
        @media (max-width: 480px) {
          .signup-card {
            padding: 1.5rem;
          }
          
          .signup-header h2 {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Signup;

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { Link } from 'react-router-dom';

// const Signup = () => {
//   const navigate = useNavigate();
//   const [user, setUser] = useState({
//     username: "",
//     email: "",
//     password: "",
//   });

//   const handleChange = (e) => {
//     setUser({ ...user, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post("http://localhost:5000/api/auth/signup", user);
//       navigate("/login");
//     } catch (error) {
//       console.error("Signup Error:", error);
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label htmlFor="username">Username</label>
//           <input
//             type="text"
//             className="form-control"
//             id="exampleInputUsername"
//             placeholder="Enter Username"
//             name="username"
//             value={user.username}
//             onChange={handleChange}
//             required
//           />
//         </div>
        
//         <div className="form-group">
//           <label htmlFor="email">Email address</label>
//           <input
//             type="email"
//             className="form-control"
//             id="exampleInputEmail1"
//             aria-describedby="emailHelp"
//             placeholder="Enter email"
//             name="email"
//             value={user.email}
//             onChange={handleChange}
//             required
//           />
//           <small id="emailHelp" className="form-text text-muted">
//             We'll never share your email with anyone else.
//           </small>
//         </div>

//         <div className="form-group">
//           <label htmlFor="password">Password</label>
//           <input
//             type="password"
//             className="form-control"
//             id="exampleInputPassword1"
//             placeholder="Password"
//             name="password"
//             value={user.password}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <div className="form-group form-check">
//           <input type="checkbox" className="form-check-input" id="exampleCheck1" />
//           <label className="form-check-label" htmlFor="exampleCheck1">
//             Check me out
//           </label>
//         </div>
//         <div className="text-center mt-3">
//           <p>
//             Already have an account?{' '}
//             <Link to="/login">Log in</Link>
//           </p>
//         </div>

//         <div className="text-center">
//           <button type="submit" className="btn btn-primary">
//             Sign Up
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default Signup;


  