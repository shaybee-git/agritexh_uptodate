import Listing from "../models/listing.model.js";
import { errorHandler } from "../utils/error.js";

//Create Listing
export const createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);
    return res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};

//Delete Listing
export const deleteListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);

  if (!listing) {
    return next(errorHandler(404, "Listing not found!"));
  }

  if (req.user.id !== listing.userRef) {
    return next(errorHandler(401, "You can only delete your own listings!"));
  }

  try {
    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json("Listing has been deleted!");
  } catch (error) {
    next(error);
  }
};

//Update Listing
export const updateListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    return next(errorHandler(404, "Listing not found!"));
  }
  //Check Authenticate User
  if (req.user.id !== listing.userRef) {
    return next(errorHandler(401, "You can only update your own listings!"));
  }

  try {
    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedListing);
  } catch (error) {
    next(error);
  }
};
//Get Listing
export const getListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return next(errorHandler(404, "Listing not found!"));
    }
    res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};
//Search Functionality
export const getListings = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;
    const searchTerm = req.query.searchTerm || "";
    const sort = req.query.sort || "createdAt";
    const order = req.query.order || "desc";

    // Filter to include only listings of type "rent" or "sale"
    const type = { $in: ["sale", "rent"] };

    const listings = await Listing.find({
      name: { $regex: searchTerm, $options: "i" }, // Search by name
      type,
    })
      .sort({ [sort]: order }) // Sort by the specified field
      .limit(limit) // Limit the number of results
      .skip(startIndex); // Skip results for pagination

    return res.status(200).json(listings);
  } catch (error) {
    next(error);
  }
};

// Reserve a Listing
export const reserveListing = async (req, res, next) => {
  const { listingId } = req.params;
  const { startDate, endDate } = req.body;

  try {
    const listing = await Listing.findById(listingId);
    if (!listing) {
      return next(errorHandler(404, "Listing not found!"));
    }

    // Check if listing is "rent"
    if (listing.type !== "rent") {
      return next(errorHandler(400, "Only rental listings can be reserved!"));
    }

    // Check for overlapping reservations
    const overlappingReservation = listing.reservations.some((reservation) => {
      return (
        new Date(startDate) < new Date(reservation.endDate) &&
        new Date(endDate) > new Date(reservation.startDate)
      );
    });

    if (overlappingReservation) {
      return next(
        errorHandler(400, "This listing is already reserved for the selected dates.")
      );
    }

    // Add reservation
    listing.reservations.push({
      user: req.user.id,
      startDate,
      endDate,
    });
    await listing.save();

    res.status(200).json({ message: "Reservation successful!" });
  } catch (error) {
    next(error);
  }
};

