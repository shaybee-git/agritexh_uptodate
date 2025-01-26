import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { useSelector } from "react-redux";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import { FaMapMarkerAlt } from "react-icons/fa";
import Checkout from "../components/Checkout";

export default function Listing() {
  SwiperCore.use([Navigation]);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [contact, setContact] = useState(false);
  const params = useParams();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/get/${params.listingId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);

  // Check if the current user is the owner of the listing
  const isOwner = listing?.userRef === currentUser?._id;

  return (
    <main className="max-w-screen-lg mx-auto px-4 py-8">
      {loading && <p className="text-center my-7 text-2xl text-gray-600">Loading...</p>}
      {error && (
        <p className="text-center my-7 text-2xl text-red-600">Something went wrong!</p>
      )}
      {listing && !loading && !error && (
        <div>
          {/* Swiper Gallery */}
          <Swiper navigation spaceBetween={30} loop={true}>
            {listing.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className="h-[400px] sm:h-[550px] rounded-lg shadow-lg"
                  style={{
                    background: `url(${url})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Listing Details */}
          <div className="mt-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <div className="text-3xl font-extrabold text-gray-800">{listing.name}</div>
              <div className="flex items-center space-x-4 mt-4 sm:mt-0">
                <div className="text-lg text-gray-500 flex items-center space-x-2">
                  <FaMapMarkerAlt />
                  <span>{listing.address}</span>
                </div>

                {/* Only show the "Order Now" button if the user is not the owner */}
                {!isOwner ? (
                  <button
                    className="bg-blue-600 text-white py-2 px-6 rounded-full text-lg hover:bg-blue-700 transition duration-300"
                    onClick={() => setContact(true)}
                  >
                    Order Now
                  </button>
                ) : (
                  <button
                    className="bg-gray-400 text-white py-2 px-6 rounded-full text-lg cursor-not-allowed"
                    disabled
                  >
                    You cannot order your own listing
                  </button>
                )}
              </div>
            </div>

            <div className="mt-4 text-lg text-gray-700">
              <p>{listing.description}</p>
            </div>

            <div className="mt-6 flex justify-between items-center">
              <div className="text-2xl font-semibold text-gray-900">
                {listing.type === "rent"
                  ? `Rent Price: $${listing.regularPrice}/day`
                  : `Sale Price: $${listing.regularPrice}`}
              </div>
            </div>
          </div>
        </div>
      )}

      {contact && <Checkout listing={listing} closeCheckout={() => setContact(false)} />}
    </main>
  );
}
