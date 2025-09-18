import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);
    
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', formData);
      localStorage.setItem('token', response.data.token);
      navigate('/');
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setErrorMessage('Invalid email or password. Please check your credentials.');
      } else if (error.response && error.response.status === 404) {
        setErrorMessage('User not found. Please sign up to create an account.');
      } else {
        setErrorMessage('An error occurred while logging in. Please try again later.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h2>Welcome Back</h2>
          <p>Sign in to continue to your account</p>
        </div>
        
        <form onSubmit={handleSubmit} className="login-form">
          {errorMessage && (
            <div className="error-message">
              <span className="error-icon">⚠️</span>
              {errorMessage}
            </div>
          )}
          
          <div className="input-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <span className="input-icon">✉️</span>
          </div>
          
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <span className="input-icon">🔒</span>
          </div>
          
          <button 
            type="submit" 
            className={`login-button ${isLoading ? 'loading' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="button-loader"></span>
            ) : (
              'Log In'
            )}
          </button>
        </form>
        
        <div className="login-footer">
          <p>
            Don't have an account?{' '}
            <Link to="/signup" className="auth-link">Sign up</Link>
          </p>
        </div>
      </div>
      
      <style jsx>{`
        /* Login Container */
        .login-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 20px;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        
        /* Login Card */
        .login-card {
          background: white;
          border-radius: 16px;
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
          width: 100%;
          max-width: 450px;
          padding: 2.5rem;
          transition: transform 0.3s ease;
        }
        
        .login-card:hover {
          transform: translateY(-5px);
        }
        
        /* Login Header */
        .login-header {
          text-align: center;
          margin-bottom: 2rem;
        }
        
        .login-header h2 {
          color: #333;
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }
        
        .login-header p {
          color: #666;
          font-size: 1rem;
        }
        
        /* Login Form */
        .login-form {
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
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.2);
        }
        
        .input-icon {
          position: absolute;
          left: 1rem;
          bottom: 1rem;
          font-size: 1.2rem;
        }
        
        /* Login Button */
        .login-button {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
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
        }
        
        .login-button:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
        }
        
        .login-button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        
        .login-button.loading {
          background: linear-gradient(135deg, #8898ee 0%, #8a69b0 100%);
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
        
        /* Login Footer */
        .login-footer {
          text-align: center;
          margin-top: 1.5rem;
          color: #666;
        }
        
        .auth-link {
          color: #667eea;
          text-decoration: none;
          font-weight: 600;
          transition: color 0.3s ease;
        }
        
        .auth-link:hover {
          color: #764ba2;
          text-decoration: underline;
        }
        
        /* Responsive Design */
        @media (max-width: 480px) {
          .login-card {
            padding: 1.5rem;
          }
          
          .login-header h2 {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
}

export default Login;

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import './Login.css';
// import { Link } from 'react-router-dom';

// function Login() {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//   });
//   const [errorMessage, setErrorMessage] = useState(''); // State to store error messages
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setErrorMessage(''); // Clear previous error message
//     try {
//       const response = await axios.post('http://localhost:5000/api/auth/login', formData);
//       localStorage.setItem('token', response.data.token);
//       navigate('/'); // Redirect to home page on successful login
//     } catch (error) {
//       // Handle specific error responses
//       if (error.response && error.response.status === 401) {
//         setErrorMessage('Invalid email or password. Please check your credentials.');
//       } else if (error.response && error.response.status === 404) {
//         setErrorMessage('User not found. Please sign up to create an account.');
//       } else {
//         setErrorMessage('An error occurred while logging in. Please try again later.');
//       }
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <form onSubmit={handleSubmit}>
//         <h2 className="text-center">Login</h2>
//         {errorMessage && (
//           <div className="alert alert-danger mt-3" role="alert">
//             {errorMessage}
//           </div>
//         )}
//         <div className="form-group mt-3">
//           <label htmlFor="email">Email address</label>
//           <input
//             type="email"
//             className="form-control"
//             id="exampleInputEmail1"
//             aria-describedby="emailHelp"
//             placeholder="Enter email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="form-group mt-3">
//           <label htmlFor="password">Password</label>
//           <input
//             type="password"
//             className="form-control"
//             id="exampleInputPassword1"
//             placeholder="Password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="text-center mt-3">
//           <p>
//             Don't have an account?{' '}
//             <Link to="/signup">Sign up</Link>
//           </p>
//         </div>
//         <div className="text-center p-3">
//           <button type="submit" className="btn btn-primary">Log In</button>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default Login;


