import Books_Model from "../models/Books_Model.js";

const Fetch_Books_Controller = async (req, res) => {

    try {
        const books = await Books_Model.find().sort({ createdAt: -1 });


        res.status(200).json({message: "Successfully fetched books", isSucess: true, books: books})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Internal Server Error"})
    }
      
    
}
export default Fetch_Books_Controller