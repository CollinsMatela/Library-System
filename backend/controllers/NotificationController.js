import NotificationModel from "../models/NotificationsModel.js"

export const FetchNotification = async (req, res) => {
        try {
        const notifications = await NotificationModel.find();
        
        if(!notifications){
          res.status(400).json({message: 'No found notifications'});
          return
        }

        res.status(200).json({message: 'Successfully fetched notification', notifications: notifications});
       } catch (error) {
        res.status(500).json({message: 'Internal Error in Notification'})
       }
}

export const BookUploadNotification = async (req, res) => {
       const {bookTitle} = req.body;
       const expireDate = new Date();
        expireDate.setDate(expireDate.getDate() + 7)

       try {
        const notification = await NotificationModel.create({
            recipient: null,
            type: 'Book Upload',
            title: 'New Uploaded Book',
            message: `Try to read this newly book ${bookTitle}`,
            expiresAt: expireDate
        })
        res.status(200).json({message: 'Successfully created upload notification'});
       } catch (error) {
        res.status(500).json({message: 'Internal Error in Notification'})
       }
}

export const ApprovedNotification = async (req, res) => {
      const {userId} = req.params;
      const expireDate = new Date();
        expireDate.setDate(expireDate.getDate() + 7)

      try {
        const notification = await NotificationModel.create({
            recipient: userId,
            type: 'Approved',
            title: 'Your Request has been approved',
            message: `Please proceed to library and bring 1 valid Id`,
            expiresAt: expireDate
        })
        res.status(200).json({message: 'Successfully created upload notification'});
       } catch (error) {
        res.status(500).json({message: 'Internal Error in Notification'})
       }
}
export const BorrowedNotification = async (req, res) => {
      const {userId, bookTitle, returnDate} = req.body;


      console.log(userId, bookTitle, returnDate)

      const expireDate = new Date();
        expireDate.setDate(expireDate.getDate() + 7)

      try {
        const notification = await NotificationModel.create({
            recipient: userId,
            type: 'Borrowed',
            title: `Successfully borrowed the ${bookTitle}.`,
            message: `Please return the book before ${returnDate}.`,
            expiresAt: expireDate
        })
        res.status(200).json({message: 'Successfully created borrowed notification'});
       } catch (error) {
        res.status(500).json({message: 'Internal Error in Notification'})
       }
}
export const DueNotification = async (req, res) => {
      const {userId, bookTitle, returnDate} = req.body;

      const dueDate = new Date(returnDate);
      const todayDate = new Date();
      const isOverDue = todayDate > dueDate;

      const expireDate = new Date();
        expireDate.setDate(expireDate.getDate() + 7)

      try {
        const notification = await NotificationModel.create({
            recipient: userId,
            type: `${isOverDue ? 'Over Due' : 'Due'}`,
            title: `${isOverDue ? "Over due!" : `Due is on ${returnDate}`}`,
            message: `Please return the book.`,
            expiresAt: expireDate
        })
        res.status(200).json({message: 'Successfully created borrowed notification'});
       } catch (error) {
        res.status(500).json({message: 'Internal Error in Notification'})
       }
}
export const markAsReadNotification = async (req, res) => {
      const {notificationId} = req.params;

      try {
        const notification = await NotificationModel.findByIdAndUpdate(
            notificationId, 
            {
              isRead: true
            },
            {
                new: true
            }
            )
            if (!notification) {
            return res.status(404).json({
                message: "Notification not found"
            });
        }

        res.status(200).json({message: 'Successfully isRead notification'});
       } catch (error) {
        res.status(500).json({message: 'Internal Error in Notification'})
       }
}