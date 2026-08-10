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
      const {userId, bookTitle, returnDate, requestId} = req.body;
      console.log(requestId)
      const expireDate = new Date();
        expireDate.setDate(expireDate.getDate() + 7)

      try {
        const notification = await NotificationModel.create({
            recipient: userId,
            type: 'Borrowed',
            title: `Successfully borrowed the ${bookTitle}.`,
            message: `Please return the book before ${returnDate}.`,
            requestId: requestId,
            expiresAt: expireDate
        })
        res.status(200).json({message: 'Successfully created borrowed notification'});
       } catch (error) {
        res.status(500).json({message: 'Internal Error in Notification'})
       }
}
export const DueNotification = async (req, res) => {
      try {
      const {borrows} = req.body;
      console.log(borrows)

      if (borrows.length === 0) {
        return res.status(200).json({
            message: "No borrows to process"
        });
      }

      const today = new Date().toISOString().split("T")[0];;
      const expireDate = new Date();
      expireDate.setDate(expireDate.getDate() + 7)

      const threeDaysFromNow = new Date();
      threeDaysFromNow.setDate(threeDaysFromNow.getDate() + 3);
      const threeDays = threeDaysFromNow.toISOString().split("T")[0];

       const OverDue = borrows.filter((borrow) => borrow.returnDate < today);
       const ComingDue = borrows.filter((borrow) => {
             const returnDate = borrow.returnDate;
             return returnDate >= today && returnDate <= threeDays;
       })

       console.log(OverDue.length, "Total Overdue")
       console.log(ComingDue.length, "Total Coming Due")

        // Overdue notifications
        for (const item of OverDue) {
            const existingNotification = await NotificationModel.findOne({
                recipient: item.userId,
                type: "Over Due",
                requestId: item._id
            });

            if(existingNotification){
              continue;
            }

            await NotificationModel.create({
                recipient: item.userId,
                type: "Over Due",
                title: `Return the Book! ${item.title}`,
                message: "This book is overdue. Please return it as soon as possible.",
                requestId: item._id,
                expiresAt: expireDate
            });
        }

        // Coming due notifications
        for (const item of ComingDue) {
          const existingNotification = await NotificationModel.findOne({
                recipient: item.userId,
                type: "Due",
                requestId: item._id
            });

            if(existingNotification){
              continue;
            }

            await NotificationModel.create({
                recipient: item.userId,
                type: "Due",
                title: `Due is Coming! ${item.title}`,
                message: `The due is on ${new Date(item.returnDate).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric'
                })}.`,
                requestId: item._id,
                expiresAt: expireDate
            });
        }
        
        res.status(200).json({message: 'Successfully created due notification'});
       } catch (error) {
        console.log("DueNotification Error:", error);
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