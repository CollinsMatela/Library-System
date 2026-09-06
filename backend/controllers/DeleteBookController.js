import Books_Model from "../models/Books_Model.js";

const DeleteBookController = async (req, res) => {
    const {bookId} = req.params;
    try {
        const book = await Books_Model.findById(bookId);

        if(!book) {
            return res.status(404).json({message: "Book not found"});
        }

        await Books_Model.findByIdAndDelete(bookId);
        res.status(200).json({message: "Fiction book deleted successfully"});
        
        
    } catch (error) {
        res.status(500).json({message: "Internal server error"});
    }
}
export default DeleteBookController;