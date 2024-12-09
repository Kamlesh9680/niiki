const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    message: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    type: { type: String }, // Optional: For categorizing notifications
    isRead: { type: Boolean, default: false } // To track read/unread status
});

module.exports = mongoose.model('Notification', NotificationSchema);
