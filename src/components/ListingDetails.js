// components/ListingDetails.js
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ListingDetails = () => {
  const { id } = useParams(); // Get the listing ID from the URL
  const navigate = useNavigate();
  const [listing, setListing] = useState(null);

  useEffect(() => {
    // Fetch the listing details based on the ID
    const fetchListingDetails = async () => {
      try {
        const response = await axios.get(`/api/listings/${id}`);
        setListing(response.data);
      } catch (error) {
        console.error("Error fetching listing details:", error);
      }
    };

    fetchListingDetails();
  }, [id]);

  // Delete listing function
  const deleteListing = async () => {
    try {
      await axios.delete(`/api/listings/${id}`);
      alert("Listing deleted successfully.");
      navigate("/my-lists"); // Redirect back to My Listings after deletion
    } catch (error) {
      console.error("Error deleting listing:", error);
      alert("Error deleting listing.");
    }
  };

  if (!listing) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mt-4">
      <h3>{listing.title}</h3>
      <img src={listing.images[0]} alt="Flat" className="img-fluid mb-4" />
      <p>{listing.description}</p>
      <p>Rent: {listing.rent}</p>

      <div className="d-flex justify-content-start">
        <button className="btn btn-warning me-3" onClick={() => navigate(`/edit-listing/${id}`)}>
          Edit Listing
        </button>
        <button className="btn btn-danger" onClick={deleteListing}>
          Delete Listing
        </button>
      </div>
    </div>
  );
};

export default ListingDetails;
