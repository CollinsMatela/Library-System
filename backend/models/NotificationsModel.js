import mongoose from 'mongoose'

const NotificationSchema = new mongoose.Schema({
     recipient: {type: String},
     type: {type: String, enum: ['Book Upload', 'Pending', 'Approved', 'Borrowed', 'Deleted', 'Due', 'Over Due']},
     title: {type: String},
     message: {type: String},
     requestId: {type: String, default: null},
     isRead: {type: Boolean, default: false},
},
{
     timestamps: true
})
     // Purpsoe is to be deleted after 7 days
     NotificationSchema.index(
     { createdAt: 1 },
     { expireAfterSeconds: 604800 }
     );

const NotificationModel = new mongoose.model('NotificationsModel', NotificationSchema)
export default NotificationModel