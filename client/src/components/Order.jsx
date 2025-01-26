import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Order = ({ userId, orderId }) => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(`/api/orders/buyer/${userId}/order/${orderId}`);
        setOrder(response.data.order);
      } catch (error) {
        setError('Error fetching order details');
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [userId, orderId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!order) return <div>Order not found</div>;

  return (
    <div>
      <h3>Order Details</h3>
      <div>
        <h4>Order ID: {order._id}</h4>
        <p><strong>Seller:</strong> {order.firstName}</p>
        <p><strong>Listing:</strong> {order.listingDetails.name}</p>
        <p><strong>Description:</strong> {order.listingDetails.description}</p>
        <p><strong>Price:</strong> ${order.listingDetails.price}</p>
        <p><strong>Order Status:</strong> {order.orderStatus}</p>
        <p><strong>Order Details:</strong> {order.orderDetails}</p>
        <p><strong>Type:</strong> {order.listingDetails.type}</p>
        <p><strong>Order Created At:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default Order;
