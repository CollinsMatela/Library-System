
import Book_Model from "../models/Books_Model.js";

const Fetch_BookById_Controller = async (req, res) => {
  const { id } = req.params;

  try {

    const book = await Book_Model.findById(id);
    if (book) return res.status(200).json({message:`Successfully fetch ${book.title}`, book});

    return res.status(404).json({ message: "Book not found" });

  } catch (error) {
    return res.status(500).json({ message: "Internal Error" });
  }
};

export default Fetch_BookById_Controller;