import express from "express";
import Status from "../models/status.model.js";
const statusRouter = express.Router();

// Update notification status
statusRouter.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!["pending", "confirmed"].includes(status)) {
    return res.status(400).json({ error: "Invalid status value" });
  }

  try {
    const notification = await Status.findByIdAndUpdate(
      id,
      { status },
      { new: true } // Return the updated document
    );

    if (!notification) {
      return res.status(404).json({ error: "Notification not found" });
    }

    res.json(notification);
  } catch (error) {
    console.error("Error updating notification:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default statusRouter;
