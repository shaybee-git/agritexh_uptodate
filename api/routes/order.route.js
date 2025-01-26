import express from 'express';
import Order from '../models/order.model.js';  // Make sure the model path is correct

const router = express.Router();

// POST route to create a new order
router.post('/', async (req, res) => {
  try {
    const { buyerId, sellerId, listingId, listingName, price, firstName, status, createdAt } = req.body;
    
    // Create a new order document
    const newOrder = new Order({
      buyerId,
      sellerId,
      listingId,
      listingName,
      price,
      firstName,
      status,
      createdAt,
    });

    await newOrder.save();

    // Respond with the newly created order
    res.status(201).json(newOrder);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Failed to create order', error: error.message });
  }
});

export default router;
