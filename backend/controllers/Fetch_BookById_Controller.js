
import Fiction_Model from '../models/Fiction_Model.js'
import NonFiction_Model from '../models/NonFiction_Model.js'

const Fetch_BookById_Controller = async (req, res) => {
  const { id } = req.params;

  try {
    let book = null;

    book = await Fiction_Model.findById(id);
    if (book) return res.status(200).json({message:`Successfully fetch ${book.title}`, book});

    book = await NonFiction_Model.findById(id);
    if (book) return res.status(200).json({message:`Successfully fetch ${book.title}`, book});

    return res.status(404).json({ message: "Book not found" });

  } catch (error) {
    return res.status(500).json({ message: "Internal Error" });
  }
};

export default Fetch_BookById_Controller;