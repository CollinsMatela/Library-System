import Book_Model from "../models/Books_Model.js";

const EditBookInformationController = async (req, res) => {
    const {bookId} = req.params;
    const {bookDetails} = req.body;

    console.log("Received book details for update:", bookDetails);

    try {
    const book = await Book_Model.findById(bookId);

    if(!book) {
        return res.status(404).json({message: "Book not found"});
    }
    if(!bookDetails) {
        return res.status(404).json({message: "Book information is empty."});
    }

      const updatedBook = await Book_Model.findByIdAndUpdate(
        bookId,
        {$set: bookDetails},
       {new: true}
      );

      if(!updatedBook) {
        return res.status(404).json({message: "Failed to update book information"});
      }
      
      res.status(200).json({message: "Fiction book information updated successfully", book: updatedBook});
    
    
    } catch (error) {
        console.error("Error updating book information:", error);
        res.status(500).json({message: "Error updating book information", error: error.message});
    }
}
export default EditBookInformationController;