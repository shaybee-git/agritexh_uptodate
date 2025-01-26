import Notification from '../models/notification.model.js';

export const getNotifications = async (req, res, next) => {
  try {
    const notifications = await Notification.find({ recipient: req.user.id })
      .sort({ createdAt: -1 })
      .populate('sender', 'username firstName lastName')
      .populate('listing', 'name description price imageUrls type');

    res.status(200).json(notifications);
  } catch (error) {
    next(error);
  }
};

export const markNotificationAsRead = async (req, res, next) => {
  try {
    const notification = await Notification.findById(req.params.id);

    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    if (notification.recipient.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    notification.read = true;
    await notification.save();

    res.status(200).json({ message: 'Notification marked as read' });
  } catch (error) {
    next(error);
  }
};

export const updateNotificationStatus = async (req, res, next) => {
  try {
    const notification = await Notification.findById(req.params.id);

    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    if (notification.recipient.toString() !== req.body.userId && notification.sender.toString() !== req.body.userId) {
      return res.status(403).json({ message: "Not authorized to update" });
    }

    if (req.body.status === "confirmed") {
      notification.status = "confirmed";
    } else if (req.body.status === "canceled") {
      notification.status = "canceled";
    }

    await notification.save();
    res.status(200).json({ message: "Notification updated successfully", notification });
  } catch (error) {
    res.status(500).json({ message: "Error updating notification", error: error.message });
  }
};
