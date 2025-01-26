import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const MyOrders = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [sentNotifications, setSentNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSentNotifications = async () => {
      if (!currentUser) {
        navigate("/signin");
        return;
      }

      try {
        const res = await fetch(`/api/notifications/sent/${currentUser._id}`);
        if (!res.ok) {
          throw new Error("Failed to fetch sent notifications");
        }
        const data = await res.json();

        // Debug: Check if reason exists in the fetched data
        console.log("Fetched notifications:", data);

        // Sort notifications by createdAt field in descending order
        const sortedNotifications = data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        setSentNotifications(sortedNotifications);
      } catch (err) {
        console.error("Error fetching sent notifications:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSentNotifications();
  }, [currentUser, navigate]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="max-w-2xl mx-auto mt-8 p-4">
      <h1 className="text-3xl font-semibold text-center mb-6">My Orders</h1>
      {sentNotifications.length === 0 ? (
        <p className="text-center text-gray-500">No orders yet.</p>
      ) : (
        <ul className="space-y-6">
          {sentNotifications.map((notification) => (
            <li
              key={notification._id}
              className="bg-white border p-6 rounded-lg shadow-md"
            >
              <div className="flex gap-4">
                <img
                  src={
                    notification.listingDetails?.imageUrls[0] ||
                    "/path/to/default-image.jpg"
                  } // Use default image if no image available
                  alt={notification.listingDetails?.name || "Product Image"}
                  className="w-24 h-24 object-cover rounded-md"
                />
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-gray-800">
                    {notification.listingDetails?.name ||
                      "Product Name Unavailable"}
                  </h2>
                  <p className="text-gray-600 mt-1">
                    {notification.listingDetails?.description ||
                      "No description available."}
                  </p>
                  <p className="mt-2 text-lg font-semibold text-green-600">
                    {notification.listingDetails?.price?.toFixed(2) || "N/A"}{" "}
                    PKR/-
                  </p>
                  <p className="mt-1 text-gray-500">
                    Status:{" "}
                    <span
                      className={`font-bold text-white px-2 py-1 rounded-md ${
                        notification.status === "canceled"
                          ? "bg-red-500"
                          : notification.status === "confirmed"
                          ? "bg-green-500"
                          : "bg-gray-500"
                      }`}
                    >
                      {notification.status}
                    </span>
                  </p>
                  {/* Display cancellation reason if the status is "canceled" */}
                  {notification.status === "canceled" && notification.reason && (
                    <p className="mt-2 text-sm text-red-600">
                      <strong>Reason:</strong> {notification.reason}
                    </p>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyOrders;
