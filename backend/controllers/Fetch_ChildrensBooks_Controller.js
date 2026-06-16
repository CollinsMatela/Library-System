import ChildrensBookDetails_Model from "../models/ChildrensBookDetails_Model.js";

const Fetch_ChildrensBooks_Controller = async (req, res) => {
    try {
        const childrensBooks = await ChildrensBookDetails_Model.find();

    res.status(200).json({
      message: "Successfully fetched childrens books",
      isSuccess: true,
      childrensBooks
    });
    } catch (error) {
        console.log(error);

    res.status(500).json({
      message: "Internal Server Error",
    });
    }
}
export default Fetch_ChildrensBooks_Controller