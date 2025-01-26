import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Display = () => {
  const [rentListings, setRentListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        // Fetch all rental listings
        const rentRes = await fetch("/api/listing/get?type=rent&limit=all");
        const rentData = await rentRes.json();

        // Fetch all sale listings
        const saleRes = await fetch("/api/listing/get?type=sale&limit=all");
        const saleData = await saleRes.json();

        // Update states with fetched data
        setRentListings(rentData);
        setSaleListings(saleData);
      } catch (error) {
        console.error("Error fetching listings:", error);
      }
    };

    fetchListings();
  }, []);

  // Helper function to format the phone number
  const formatPhoneNumber = (number) => {
    // Ensure the number starts with a plus sign and is followed by the country code
    if (number.startsWith("+")) {
      return number; // already formatted correctly
    } else {
      // Assuming the default country code is +92 (Pakistan)
      return `+92${number}`;
    }
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
                    // Format the phone number and open WhatsApp chat
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

      <h2 className="text-2xl font-bold mt-10 mb-4">Sale Listings</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {saleListings.map((listing) => (
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
                    // Format the phone number and open WhatsApp chat
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

export default Display;
