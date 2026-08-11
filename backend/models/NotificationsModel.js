import mongoose from 'mongoose'

const NotificationSchema = new mongoose.Schema({
     recipient: {type: String},
     type: {type: String, enum: ['Book Upload', 'Pending', 'Approved', 'Borrowed', 'Due', 'Over Due']},
     title: {type: String},
     message: {type: String},
     requestId: {type: String, default: null},
     isRead: {type: Boolean, default: false},
},
{
     timestamps: {
            createdAt: {
                type: Date,
                expires: 604800
            },
            updatedAt: true
        }
})
const NotificationModel = new mongoose.model('NotificationsModel', NotificationSchema)
export default NotificationModel