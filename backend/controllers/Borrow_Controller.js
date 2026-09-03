import Borrow_Model from "../models/Borrow_Model.js";
import Book_Model from "../models/Books_Model.js";

const Borrow_Controller = async (req, res) => {
     const {userId, name, bookId} = req.body;

     try {
          const book = await Book_Model.findById(bookId);

          if(!book) {
             res.status(404).json({message: 'Book is not found'})
             return;
          } else {
            console.log('book found', book.title)
          }

          // const isExistRequest = await Borrow_Model.findOne({
          //   userId: userId,
          //   bookId: bookId
          // })

          const activeRequest = await Borrow_Model.findOne({
            userId,
            bookId,
            status: {
              $in: ["Pending", "Approved", "Borrowed"],
            },
          });

          if (activeRequest) {
            return res.status(400).json({
              message: "Already in process.",
            });
          }

          await Borrow_Model.create({
            userId: userId,
            name: name,
            bookId: bookId,
            title: book.title,
          })

          res.status(200).json({message: 'Successfully Request the Book'});

     } catch (error) {
        res.status(500).json({message: 'Internal Error: Error Borrow Request'});
     }
}

export default Borrow_Controller