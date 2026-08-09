import mongoose from 'mongoose'

const NotificationSchema = new mongoose.Schema({
     recipient: {type: String},
     type: {type: String, enum: ['Book Upload', 'Pending', 'Approved', 'Borrowed', 'Due', 'Over Due']},
     title: {type: String},
     message: {type: String},
     isRead: {type: Boolean, default: false},
     expiresAt: {type: Date, default: null}
},
{
     timestamps: true
})
const NotificationModel = new mongoose.model('NotificationsModel', NotificationSchema)
export default NotificationModel