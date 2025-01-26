import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  // Buyer (User)
  listing: { type: mongoose.Schema.Types.ObjectId, ref: 'Listing', required: true },  // Associated Listing
  orderDetails: { 
    type: mongoose.Schema.Types.Mixed, 
    required: true 
  },  // Details about the order (e.g., quantity, size, etc.)
  orderStatus: { type: String, required: true },  // Order Status: 'Pending', 'Shipped', 'Delivered', etc.
  buyerFirstName: { type: String, required: true },  // First name of the buyer (change name to avoid confusion)
  listingDetails: {  // Listing details: name, price, etc.
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    type: { type: String, required: true }
  },
  createdAt: { type: Date, default: Date.now }
});

// Create the Order model for the Buyer
const Order = mongoose.model('Order', orderSchema);

export default Order;
