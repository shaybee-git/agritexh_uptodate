import React, { useState } from "react";

// Function to format date to a readable string (MM/DD/YYYY, HH:MM AM/PM)
const formatDate = (date) => {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };
  return new Date(date).toLocaleString("en-US", options);
};

const NotificationItem = ({ notification, handleConfirm, handleCancel, isSender }) => {
  const [showDialog, setShowDialog] = useState(false);
  const [cancelReason, setCancelReason] = useState("");

  // Handle reason input change
  const handleReasonChange = (e) => {
    setCancelReason(e.target.value);
  };

  // Handle submit of the cancellation reason
  const handleSubmitReason = () => {
    // Handle the update with cancel reason (call API or parent handler to update the notification)
    handleCancel(notification._id, cancelReason);
    setShowDialog(false);  // Close the dialog
    setCancelReason("");  // Clear the reason input
  };

  return (
    <div className="border p-6 rounded-lg shadow-md mb-6 bg-white">
      <div className="flex gap-6">
        {/* Product Image */}
        <div className="w-32 h-32 flex-shrink-0">
          <img
            src={notification.listingDetails.imageUrls[0]} // Assuming an array of image URLs
            alt={notification.listingDetails.name}
            className="w-full h-full object-cover rounded-md"
          />
        </div>

        {/* Product Details */}
        <div className="flex-grow">
          <h3 className="text-xl font-semibold text-gray-800">{notification.listingDetails.name}</h3>
          <p className="text-sm text-gray-600 mt-2">{notification.listingDetails.description}</p>
          <p className="font-bold text-lg text-gray-900 mt-2">{notification.listingDetails.price} PKR-/</p>
          <p className="text-sm text-gray-500">Type: {notification.listingDetails.type}</p>
        </div>
      </div>

      {/* Order Status */}
      <div className="mt-4">
        <span
          className={`font-bold text-white px-2 py-1 rounded-md ${ 
            notification.status === "canceled" ? "bg-red-500" :
            notification.status === "confirmed" ? "bg-green-500" : "bg-gray-500"
          }`}
        >
          {notification.status}
        </span>
      </div>

      {/* Rent Start and End Dates */}
      {notification.listingDetails.type === "rent" && (
        <div className="mt-4 text-sm text-gray-600">
          <p><strong>Start Date:</strong> {formatDate(notification.startDate)}</p>
          <p><strong>End Date:</strong> {formatDate(notification.endDate)}</p>
        </div>
      )}

      <div className="mt-4 text-sm text-gray-600">
        <p><strong>To:</strong> {notification.firstName} {notification.lastName}</p>
        <p><strong>Email:</strong> {notification.emailAddress}</p>
        <p><strong>Phone:</strong> {notification.phone}</p>
        <p><strong>Address:</strong> {notification.address}, {notification.city}, {notification.zipCode}</p>
      </div>

      {/* Action Buttons (For Receiver Only) */}
      {notification.status === "pending" && !isSender && (
        <div className="mt-6 flex gap-4">
          <button
            onClick={() => handleConfirm(notification._id)}
            className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600"
          >
            Confirm
          </button>
          <button
            onClick={() => setShowDialog(true)} // Show dialog on cancel
            className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600"
          >
            Cancel
          </button>
        </div>
      )}

      {/* Message for Sender Side */}
      {isSender && (
        <p className="mt-4 text-gray-500">Waiting for recipient to confirm or cancel the order.</p>
      )}

      {/* Cancellation Reason Dialog */}
      {showDialog && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-lg font-semibold mb-4">Reason for Cancellation</h3>
            <textarea
              value={cancelReason}
              onChange={handleReasonChange}
              rows={4}
              placeholder="Please provide a reason for canceling."
              className="w-full px-4 py-2 border-2 rounded-md mb-4"
            ></textarea>
            <div className="flex gap-4">
              <button
                onClick={handleSubmitReason}
                className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600"
              >
                Submit
              </button>
              <button
                onClick={() => setShowDialog(false)} // Close dialog
                className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationItem;
