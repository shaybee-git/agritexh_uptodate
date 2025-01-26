import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Rentals = () => {
  const [rentListings, setRentListings] = useState([]);

  useEffect(() => {
    const fetchRentListings = async () => {
      try {
        // API call for rental products only
        const response = await fetch("/api/listing/get?type=rent&limit=20");
        const data = await response.json();

        // Ensure the fetched data is only for rental listings
        if (Array.isArray(data)) {
          setRentListings(data.filter((item) => item.type === "rent"));
        } else {
          console.error("Unexpected data format for rentals:", data);
        }
      } catch (error) {
        console.error("Error fetching rental listings:", error);
      }
    };

    fetchRentListings();
  }, []);

  const formatPhoneNumber = (number) => {
    return number.startsWith("+") ? number : `+92${number}`;
  };

  return (
    <div className="container mx-auto py-5">
      <h2 className="text-2xl font-bold mb-4">Rent Listings</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {rentListings.map((listing) => (
          <div
            key={listing._id}
            className="bg-white shadow-md rounded-lg overflow-hidden"
          >
            <img
              src={listing.imageUrls[0]}
              alt={listing.name}
              className="h-48 w-full object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{listing.name}</h3>
              <p className="text-gray-600 mt-2 text-sm">
                {listing.description}
              </p>
              <Link to={`/listing/${listing._id}`}>
                <button className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                  View Details
                </button>
              </Link>
              {listing.supplierContact && (
                <button
                  onClick={() => {
                    const formattedNumber = formatPhoneNumber(
                      listing.supplierContact
                    );
                    window.open(`https://wa.me/${formattedNumber}`, "_blank");
                  }}
                  className="mt-2 w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                >
                  Contact Supplier
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Rentals;
