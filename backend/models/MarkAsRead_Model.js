import mongoose from 'mongoose';

const MarkAsReadSchema = new mongoose.Schema({
      userId: {type:String, required: true},
      storyId: {type:String, required: true},
      readAt: {type: Date, default: Date.now}
})

const MarkAsRead = mongoose.model('MarkAsRead', MarkAsReadSchema);
export default MarkAsRead;