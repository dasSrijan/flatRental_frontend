// // src/App.js
// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import HomePageSearch from './components/HomePageSearch'; // Update to correct path
// import Login from './pages/Login';
// import Signup from './pages/Signup';
// import Dashboard from './pages/Dashboard';
// import Navbar from './components/Navbar';
// import SearchResults from './pages/SearchResults'; // Update to correct path
// import ListYourFlat from './pages/ListYourFlat';
// import ProtectedRoute from './components/ProtectedRoute';
// import UserProfile from './pages/UserProfile';

// function App() {
//   return (
//     <Router>
//       <div>
//         <Navbar />
//         <Routes>
//           <Route path="/" element={<HomePageSearch />} /> {/* Update to HomePageSearch */}
//           <Route path="/search" element={<SearchResults />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/signup" element={<Signup />} />
//           <Route path="/list-your-flat" element={
//             <ProtectedRoute>
//               <ListYourFlat />
//             </ProtectedRoute>
//           } />
//           <Route path="/dashboard" element={
//             <ProtectedRoute>
//               <Dashboard />
//             </ProtectedRoute>
//           } />
//           <Route path="/profile" element={<UserProfile />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;

// // src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';
import SearchResults from './pages/SearchResults';
import ListYourFlat from './pages/ListYourFlat';
import ProtectedRoute from './components/ProtectedRoute';
// import UserProfile from './pages/UserProfile';
import UserProfile from './components/UserProfile';
import MyListings from './components/MyListings';
import EditListing from './components/EditListing';
import HomePageSearch from './components/HomePageSearch'; // Update to correct path
import ListingDetails from './pages/ListingDetails';
import MyLists from './components/MyLists';
import MyProfile from './components/MyProfile';
import Favourites from './components/Favourites';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/" element={<HomePageSearch />} /> {/* Update to HomePageSearch */}
          <Route path="/search" element={<SearchResults />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/list-your-flat" element={
            <ProtectedRoute>
              <ListYourFlat />
            </ProtectedRoute>
          } />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          {/* <Route path="/profile" element={<UserProfile />} /> */}
          <Route path="/listing/:id" element={<ListingDetails />} />
          {/* <Route path="/profile" element={<UserProfile section="profile" />} /> */}
          {/* <Route path="/my-lists" element={<UserProfile section="my-lists" />} /> */}
          {/* <Route path="/favourite" element={<UserProfile section="favourite" />} />  */}
          {/* <Route path="/my-lists" element={<MyListings />} /> */}
          <Route path="/listing/:id" element={<ListingDetails />} />
          <Route path="/edit-listing/:id" element={<EditListing />} />
          <Route path="/my-lists" element={<MyLists />} />
          <Route path="/profile" element={<MyProfile />} />
          {/* <Route path="/my-profile" element={<MyProfile />} /> */}
          {/* <Route path="/my-lists" element={<MyLists />} /> */}
          <Route path="/favourites" element={<Favourites />} />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
