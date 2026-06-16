import EducationalBookDetails_Model from "../models/EducationalDetails_Model.js";

const Fetch_EducationalBooks_Controller = async (req, res) => {
  try {

    const educationalBooks = await EducationalBookDetails_Model.find();

    res.status(200).json({
      message: "Successfully fetched educational books",
      educationalBooks
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export default Fetch_EducationalBooks_Controller;