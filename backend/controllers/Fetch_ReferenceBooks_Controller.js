import ReferenceBook_Model from "../models/ReferenceBookDetails_Model.js";

const Fetch_ReferenceBooks_Controller = async (req, res) => {
  try {

    const referenceBooks = await ReferenceBook_Model.find();

    res.status(200).json({
      message: "Successfully fetched reference books",
      referenceBooks
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export default Fetch_ReferenceBooks_Controller;