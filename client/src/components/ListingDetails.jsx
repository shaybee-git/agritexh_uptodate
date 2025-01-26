import React, { useState } from 'react';
import { useSelector } from 'react-redux'; // Assuming you're using Redux for state management

const ListingDetails = ({ listing }) => {
  const [message, setMessage] = useState('');
  const { currentUser  } = useSelector((state) => state.user); // Access current user from Redux store
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendNotification = async (recipientId, listingId, message) => {
    try {
      const response = await fetch('/api/notifications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          recipient: recipientId,
          sender: currentUser ._id, // Assuming you have the current user's ID
          listing: listingId,
          message: message,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send notification');
      }

      const data = await response.json();
      console.log('Notification sent:', data);
      return data;
    } catch (error) {
      console.error('Error sending notification:', error);
      throw error;
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      await sendNotification(listing.userRef, listing._id, message); // Send notification to the seller
      setMessage(''); // Clear the message input
      alert('Message sent successfully!');
    } catch (error) {
      setError('Failed to send message. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!currentUser ) {
    return <p>Please log in to Order.</p>; // Ensure the user is logged in
  }

  return (
    <div>
      {/* Other listing details */}
      <h2>{listing.title}</h2>
      <p>{listing.description}</p>
      {/* Message sending form */}
      <form onSubmit={handleSendMessage}>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message here..."
          required
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Sending...' : 'Send Message'}
        </button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
    </div>
  );
};

export default ListingDetails;