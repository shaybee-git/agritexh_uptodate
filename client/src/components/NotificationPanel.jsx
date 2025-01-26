import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import NotificationItem from "./NotificationItem";

const NotificationPanel = () => {
  const [notifications, setNotifications] = useState([]);
  const { currentUser } = useSelector((state) => state.user);

  // Fetch notifications when the component mounts
  useEffect(() => {
    const fetchNotifications = async () => {
      if (!currentUser) return;

      try {
        const res = await fetch("/api/notifications", {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch notifications");
        }

        const data = await res.json();
        setNotifications(data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, [currentUser]);

  // Mark notification as read
  const markAsRead = async (notificationId) => {
    try {
      const res = await fetch(`/api/notifications/${notificationId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to mark notification as read");
      }

      setNotifications((prev) =>
        prev.map((notification) =>
          notification._id === notificationId
            ? { ...notification, read: true }
            : notification
        )
      );
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  return (
    <div className="notification-panel">
      <h2>Notifications</h2>
      {notifications.length === 0 ? (
        <p>No notifications</p>
      ) : (
        <ul>
          {notifications.map((notification) => (
            <li
              key={notification._id}
              className={notification.read ? "read" : "unread"}
            >
              {/* Pass notification as a prop to NotificationItem */}
              <NotificationItem notification={notification} />
              <button onClick={() => markAsRead(notification._id)}>
                Mark as Read
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NotificationPanel;
