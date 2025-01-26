import Message from '../models/message.model.js';
import Chat from '../models/chat.model.js';
import Notification from '../models/notification.model.js';
import Listing from '../models/listing.model.js';

export const createMessage = async (req, res, next) => {
  try {
    const { chatId, content } = req.body;
    const senderId = req.user.id;

    const newMessage = new Message({
      chat: chatId,
      sender: senderId,
      content,
    });

    await newMessage.save();

    // Find the chat and update lastMessage
    await Chat.findByIdAndUpdate(chatId, { lastMessage: newMessage._id });

    // Find the listing associated with this chat
    const chat = await Chat.findById(chatId).populate('listing');
    const listing = chat.listing;

    // Create a notification for the listing owner
    if (listing.userRef.toString() !== senderId) {
      const notification = new Notification({
        recipient: listing.userRef,
        sender: senderId,
        listing: listing._id,
        message: `New message for your listing: ${listing.name}`,
      });
      await notification.save();
    }

    res.status(201).json(newMessage);
  } catch (error) {
    next(error);
  }
};

// ... (other existing functions)