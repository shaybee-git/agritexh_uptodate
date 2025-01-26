import express from "express";
import Notification from "../models/notification.model.js";
import { updateNotificationStatus, getNotifications, markNotificationAsRead } from "../controllers/notification.controller.js";

const router = express.Router();

// Create a new notification
router.post("/", async (req, res) => {
  const { recipient, sender, listing, firstName, lastName, emailAddress, phone, address, city, zipCode, listingDetails, startDate, endDate } = req.body;

  try {
    const notification = new Notification({
      recipient,
      sender,
      listing,
      firstName,
      lastName,
      emailAddress,
      phone,
      address,
      city,
      zipCode,
      listingDetails,
      startDate,
      endDate
    });

    await notification.save();
    res.status(201).json(notification);
  } catch (error) {
    console.error("Error creating notification:", error);
    res.status(400).json({ message: "Error creating notification", error: error.message });
  }
});

// Get notifications for a specific recipient (receiver)
router.get("/:userId", async (req, res) => {
  try {
    const notifications = await Notification.find({
      recipient: req.params.userId,
    }).populate("sender listing");
    res.json(notifications);
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ message: "Error fetching notifications", error: error.message });
  }
});

// Get notifications sent by a specific sender
router.get("/sent/:senderId", async (req, res) => {
  try {
    const notifications = await Notification.find({ sender: req.params.senderId })
      .populate("recipient listing");
    res.json(notifications);
  } catch (error) {
    console.error("Error fetching sent notifications:", error);
    res.status(500).json({ message: "Error fetching sent notifications", error: error.message });
  }
});

// Update notification status (confirm or cancel)
router.patch("/update/:id", updateNotificationStatus);

export default router;
