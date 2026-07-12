import Borrow_Model from "../models/Borrow_Model.js";
import Fiction_Model from "../models/Fiction_Model.js"
import NonFiction_Model from "../models/NonFiction_Model.js"

const Borrow_Controller = async (req, res) => {
     const {userId, name, bookId} = req.body;

     console.log(userId)
     console.log(name)
     console.log(bookId)

     try {
          let book = await Fiction_Model.findById({_id: bookId}) ||
                     await NonFiction_Model.findById({_id: bookId});
          if(!book) {
             res.status(404).json({message: 'Book is not found'})
             return;
          } else {
            console.log('book found', book.title)
          }
          const isExistRequest = await Borrow_Model.findOne({
            userId: userId,
            bookId: bookId
          })

          if(isExistRequest){
             res.status(400).json({message: 'Status: Pending'})
             return;
          }

          const borrow = await Borrow_Model.create({
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