import Fiction_Model from '../models/Fiction_Model.js';
import NonFiction_Model from '../models/NonFiction_Model.js';

const DeleteBookController = async (req, res) => {
    const {bookId} = req.params;
    try {
        let book = await Fiction_Model.findById(bookId) || await NonFiction_Model.findById(bookId);

        if(!book) {
            return res.status(404).json({message: "Book not found"});
        }

        if(book.type.toLowerCase() === 'fiction') {
            await Fiction_Model.findByIdAndDelete(bookId);
            res.status(200).json({message: "Fiction book deleted successfully"});
        }
        else {
            await NonFiction_Model.findByIdAndDelete(bookId);
            res.status(200).json({message: "Non-fiction book deleted successfully"});
        }
    } catch (error) {
        res.status(500).json({message: "Internal server error"});
    }
}
export default DeleteBookController;