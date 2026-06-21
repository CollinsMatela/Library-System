import StoryBookDetails_Model from "../models/StoryBookDetails_Model.js";
import ChildrensBookDetails_Model from "../models/ChildrensBookDetails_Model.js";
import ReferenceBookDetails_Model from "../models/ReferenceBookDetails_Model.js";
import EducationalBookDetails_Model from "../models/EducationalDetails_Model.js";
import WorkBookDetails_Model from "../models/WorkBookDetails_Model.js";

const Fetch_BookById_Controller = async (req, res) => {
  const { id } = req.params;

  try {
    let book = null;

    book = await StoryBookDetails_Model.findById(id);
    if (book) return res.status(200).json({message:`Successfully fetch ${book.title}`, book});

     book = await WorkBookDetails_Model.findById(id);
    if (book) return res.status(200).json({message:`Successfully fetch ${book.title}`, book});

    book = await ChildrensBookDetails_Model.findById(id);
    if (book) return res.status(200).json({message:`Successfully fetch ${book.title}`, book});

    book = await ReferenceBookDetails_Model.findById(id);
    if (book) return res.status(200).json({message:`Successfully fetch ${book.title}`, book});

    book = await EducationalBookDetails_Model.findById(id);
    if (book) return res.status(200).json({message:`Successfully fetch ${book.title}`, book});

    return res.status(404).json({ message: "Book not found" });

  } catch (error) {
    return res.status(500).json({ message: "Internal Error" });
  }
};

export default Fetch_BookById_Controller;