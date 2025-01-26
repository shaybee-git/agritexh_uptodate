import Reservation from "../models/reservation.model.js";
import Listing from "../models/listing.model.js";
import { errorHandler } from "../utils/error.js";

// Create Reservation
export const createReservation = async (req, res, next) => {
  try {
    const { listingId, startDate, endDate } = req.body;

    // Validate listing exists and is a rental product
    const listing = await Listing.findById(listingId);
    if (!listing || listing.type !== "rent") {
      return next(errorHandler(400, "Invalid or non-rental listing!"));
    }

    // Create a reservation
    const reservation = await Reservation.create({
      listingId,
      userId: req.user.id,
      startDate,
      endDate,
    });

    res.status(201).json(reservation);
  } catch (error) {
    next(error);
  }
};

// Get All Reservations (for Admin or User)
export const getReservations = async (req, res, next) => {
  try {
    const filter = req.user.isAdmin
      ? {} // Admin gets all reservations
      : { userId: req.user.id }; // User gets their reservations only

    const reservations = await Reservation.find(filter).populate("listingId");
    res.status(200).json(reservations);
  } catch (error) {
    next(error);
  }
};

// Cancel Reservation
export const cancelReservation = async (req, res, next) => {
  try {
    const reservation = await Reservation.findById(req.params.id);

    if (!reservation) {
      return next(errorHandler(404, "Reservation not found!"));
    }

    // Only the user who made the reservation or an admin can cancel it
    if (req.user.id !== reservation.userId.toString() && !req.user.isAdmin) {
      return next(
        errorHandler(403, "Unauthorized to cancel this reservation!")
      );
    }

    reservation.status = "cancelled";
    await reservation.save();

    res.status(200).json({ message: "Reservation cancelled successfully!" });
  } catch (error) {
    next(error);
  }
};
