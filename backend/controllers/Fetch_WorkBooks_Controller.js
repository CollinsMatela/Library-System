
import WorkBooksDetails_Model from '../models/WorkBookDetails_Model.js'

const Fetch_WorkBooks_Controller = async (req, res) => {

    try {
        const books = await WorkBooksDetails_Model.find();
        res.status(200).json({message: "Successfully fetched books", isSucess: true, books: books})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Internal Server Error"})
    }
      
    
}
export default Fetch_WorkBooks_Controller