import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';  // Changed to useNavigate for React Router v6

const Orders = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();  // Using useNavigate to handle redirects in v6

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/orders/${currentUser._id}`, {
          method: 'GET',
          credentials: 'include',
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch orders');
        }

        setOrders(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (currentUser) {
      fetchOrders();
    } else {
      navigate('/login');  // Redirect to login page if user is not logged in
    }
  }, [currentUser, navigate]);  // Make sure to add navigate to the dependency array

  return (
    <div className="font-sans bg-white p-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-8">My Orders</h2>

        {loading && <p>Loading your orders...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {orders.length === 0 && !loading && (
          <p>No orders placed yet. Start shopping!</p>
        )}

        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order._id} className="p-4 border border-gray-300 rounded-md">
              <h3 className="text-xl font-bold">{order.listingName}</h3>
              <p className="text-gray-600">Price: ${order.price}</p>
              <p className="text-gray-600">Status: {order.status}</p>
              <p className="text-gray-600">Ordered on: {new Date(order.createdAt).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Orders;
