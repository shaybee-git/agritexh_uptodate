import { useState } from 'react';

export default function Cart({ cartItems, onRemoveItem, onCheckout }) {
  const [isCheckout, setIsCheckout] = useState(false);

  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

  const handleRemove = (itemId) => {
    onRemoveItem(itemId); // Call the remove function passed from the parent
  };

  const handleCheckout = () => {
    setIsCheckout(true);
    alert('Proceeding to checkout');
    onCheckout(); // Call checkout function
  };

  return (
    <div className="font-sans bg-white p-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-4">Your Cart</h2>

        {cartItems.length === 0 ? (
          <p className="text-gray-600">Your cart is empty.</p>
        ) : (
          <>
            <div className="space-y-4">
              {cartItems.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-4 border rounded shadow-sm bg-gray-50"
                >
                  <div>
                    <h4 className="text-lg font-bold">{item.name}</h4>
                    <p className="text-gray-600">${item.price.toFixed(2)}</p>
                  </div>
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <h3 className="text-xl font-semibold">Total: ${totalPrice.toFixed(2)}</h3>
              <button
                onClick={handleCheckout}
                className="mt-4 bg-green-500 text-white p-3 rounded-lg hover:opacity-90"
              >
                Checkout
              </button>
            </div>
          </>
        )}

        {isCheckout && (
          <div className="mt-6">
            <h3 className="text-xl font-bold">Checkout process initiated...</h3>
          </div>
        )}
      </div>
    </div>
  );
}
