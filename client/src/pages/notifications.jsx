import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import NotificationItem from "../components/NotificationItem";

export default function Notifications() {
  const { currentUser } = useSelector((state) => state.user);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotifications = async () => {
      if (!currentUser) {
        navigate("/signin");
        return;
      }

      try {
        const res = await fetch(`/api/notifications/${currentUser._id}`);
        if (!res.ok) {
          throw new Error("Failed to fetch notifications");
        }
        const data = await res.json();
        
        // Reverse the array so that the latest notification appears first
        setNotifications(data.reverse());
      } catch (err) {
        console.error("Error fetching notifications:", err);
        setError("Unable to load notifications. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [currentUser, navigate]);

  const handleConfirm = async (notificationId) => {
    try {
      const res = await fetch(`/api/notifications/update/${notificationId}`, {
        method: "PATCH",
        body: JSON.stringify({
          userId: currentUser._id,
          status: "confirmed",
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error("Failed to update status");
      }

      const updatedNotification = await res.json();
      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) =>
          notification._id === notificationId
            ? { ...notification, status: updatedNotification.notification.status }
            : notification
        )
      );
    } catch (err) {
      console.error("Error updating notification status:", err);
      setError("There was an error confirming the notification.");
    }
  };

  const handleCancel = async (notificationId) => {
    try {
      const res = await fetch(`/api/notifications/update/${notificationId}`, {
        method: "PATCH",
        body: JSON.stringify({
          userId: currentUser._id,
          status: "canceled",
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error("Failed to update status");
      }

      const updatedNotification = await res.json();
      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) =>
          notification._id === notificationId
            ? { ...notification, status: updatedNotification.notification.status }
            : notification
        )
      );
    } catch (err) {
      console.error("Error updating notification status:", err);
      setError("There was an error canceling the notification.");
    }
  };

  if (loading) return <div className="text-center text-gray-500">Loading notifications...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto mt-8 p-4">
      <h1 className="text-3xl font-semibold text-center mb-6">My Notifications</h1>
      {notifications.length === 0 ? (
        <p className="text-center text-gray-500">You don't have any notifications yet.</p>
      ) : (
        <ul className="space-y-6">
          {notifications.map((notification) => (
            <NotificationItem
              key={notification._id}
              notification={notification}
              handleConfirm={handleConfirm}
              handleCancel={handleCancel}
              isSender={notification.sender._id === currentUser._id} // Sender flag
            />
          ))}
        </ul>
      )}
    </div>
  );
}
