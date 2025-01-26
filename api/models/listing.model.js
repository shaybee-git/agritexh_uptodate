import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
});

const listingSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    address: { type: String, required: true },
    regularPrice: { type: Number, required: true },
    type: { type: String, required: true }, // "rent" or "sale"
    imageUrls: { type: Array, required: true },
    userRef: { type: String, required: true },
    supplierEmail: { type: String },
    supplierContact: { type: String },
    reservations: [reservationSchema], // New field for reservations
  },
  { timestamps: true }
);

const Listing = mongoose.model("Listing", listingSchema);
export default Listing;
