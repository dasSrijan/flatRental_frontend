import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePageSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="home-search-container">
      <div className="search-content">
        <h2 className="search-title">Find Your Perfect Flat</h2>
        <p className="search-subtitle">Discover amazing rental properties near you</p>
        
        <div className={`search-box ${isFocused ? 'focused' : ''}`}>
          <div className="search-input-container">
            <span className="search-icon">🔍</span>
            <input 
              type="text" 
              className="search-input"
              placeholder="Enter location, pin code, address, or nearby institution..." 
              value={searchQuery} 
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onKeyPress={handleKeyPress}
            />
            {searchQuery && (
              <button 
                className="clear-button"
                onClick={() => setSearchQuery('')}
              >
                ✕
              </button>
            )}
          </div>
          <button 
            className="search-button"
            onClick={handleSearch}
            disabled={!searchQuery.trim()}
          >
            Search
          </button>
        </div>

        <div className="search-suggestions">
          <span className="suggestions-title">Popular searches:</span>
          <div className="suggestion-tags">
            {['Bangalore', 'Mumbai', 'Delhi', 'Near College', 'IT Park', 'Metro Station'].map((tag) => (
              <button
                key={tag}
                className="suggestion-tag"
                onClick={() => setSearchQuery(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .home-search-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 400px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 2rem 1rem;
          color: white;
          text-align: center;
        }
        
        .search-content {
          max-width: 600px;
          width: 100%;
        }
        
        .search-title {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        
        .search-subtitle {
          font-size: 1.1rem;
          opacity: 0.9;
          margin-bottom: 2.5rem;
          font-weight: 300;
        }
        
        .search-box {
          display: flex;
          background: white;
          border-radius: 50px;
          padding: 0.5rem;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
          transition: all 0.3s ease;
          margin-bottom: 2rem;
        }
        
        .search-box.focused {
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.25);
          transform: translateY(-2px);
        }
        
        .search-input-container {
          display: flex;
          align-items: center;
          flex: 1;
          position: relative;
        }
        
        .search-icon {
          padding: 0 1rem;
          color: #718096;
          font-size: 1.2rem;
        }
        
        .search-input {
          flex: 1;
          border: none;
          outline: none;
          padding: 1rem 0;
          font-size: 1.1rem;
          color: #2d3748;
          background: transparent;
        }
        
        .search-input::placeholder {
          color: #a0aec0;
        }
        
        .clear-button {
          background: none;
          border: none;
          color: #718096;
          font-size: 1.2rem;
          cursor: pointer;
          padding: 0 1rem;
          transition: color 0.3s ease;
        }
        
        .clear-button:hover {
          color: #e53e3e;
        }
        
        .search-button {
          background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
          color: white;
          border: none;
          padding: 1rem 2rem;
          border-radius: 50px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          white-space: nowrap;
        }
        
        .search-button:hover:not(:disabled) {
          background: linear-gradient(135deg, #38a169 0%, #2f855a 100%);
          transform: translateY(-1px);
          box-shadow: 0 5px 15px rgba(72, 187, 120, 0.4);
        }
        
        .search-button:disabled {
          background: #cbd5e0;
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }
        
        .search-suggestions {
          margin-top: 1.5rem;
        }
        
        .suggestions-title {
          display: block;
          margin-bottom: 1rem;
          font-size: 0.9rem;
          opacity: 0.8;
          font-weight: 300;
        }
        
        .suggestion-tags {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        
        .suggestion-tag {
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }
        
        .suggestion-tag:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: translateY(-1px);
        }
        
        /* Responsive Design */
        @media (max-width: 768px) {
          .home-search-container {
            min-height: 350px;
            padding: 1.5rem 1rem;
          }
          
          .search-title {
            font-size: 2rem;
          }
          
          .search-subtitle {
            font-size: 1rem;
            margin-bottom: 2rem;
          }
          
          .search-box {
            flex-direction: column;
            border-radius: 16px;
            padding: 1rem;
            gap: 1rem;
          }
          
          .search-input-container {
            width: 100%;
          }
          
          .search-button {
            width: 100%;
            border-radius: 12px;
          }
          
          .suggestion-tags {
            justify-content: center;
          }
          
          .suggestion-tag {
            font-size: 0.8rem;
            padding: 0.4rem 0.8rem;
          }
        }
        
        @media (max-width: 480px) {
          .search-title {
            font-size: 1.8rem;
          }
          
          .search-input {
            font-size: 1rem;
          }
          
          .search-button {
            padding: 0.8rem 1.5rem;
            font-size: 1rem;
          }
        }
        
        /* Animation for focus state */
        @keyframes pulse {
          0% { box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2); }
          50% { box-shadow: 0 15px 40px rgba(0, 0, 0, 0.25); }
          100% { box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2); }
        }
        
        .search-box.focused {
          animation: pulse 2s infinite;
        }
      `}</style>
    </div>
  );
};

export default HomePageSearch;

// // src/components/HomePageSearch.js
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const HomePageSearch = () => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const navigate = useNavigate();

//   const handleSearch = () => {
//     if (searchQuery.trim()) {
//       // Redirect to /search?q=<searchQuery>
//       navigate(`/search?q=${searchQuery}`);
//     }
//   };

//   return (
//     <div>
//       <h2>Search for Flats</h2>
//       <input 
//         type="text" 
//         placeholder="Enter location, pin code, address, or nearby institution" 
//         value={searchQuery} 
//         onChange={(e) => setSearchQuery(e.target.value)} 
//       />
//       <button onClick={handleSearch}>Search</button>
//     </div>
//   );
// };

// export default HomePageSearch;
