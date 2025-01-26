import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    listing: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Listing",
      required: true,
    },
    firstName: { type: String },
    lastName: { type: String },
    emailAddress: { type: String },
    phone: { type: Number },
    address: { type: String },
    city: { type: String },
    zipCode: { type: Number },
    startDate: {type: Date},
    endDate: {type: Date},
    listingDetails: {
      name: { type: String, required: true },
      price: { type: Number, required: true },
      description: { type: String, required: true },
      type: { type: String, required: true },
      imageUrls: { type: [String], required: true },
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "canceled"],
      default: "pending",
    },
    read: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true } // Include timestamps for createdAt and updatedAt
);

const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;
