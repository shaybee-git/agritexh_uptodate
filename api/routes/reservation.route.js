import express from "express";
import {
  createReservation,
  getReservations,
  cancelReservation,
} from "../controllers/reservation.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

// Create a reservation
router.post("/", verifyToken, createReservation);

// Get all reservations (User/ Admin)
router.get("/", verifyToken, getReservations);

// Cancel a reservation
router.put("/:id/cancel", verifyToken, cancelReservation);

export default router;
