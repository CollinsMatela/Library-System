import StoryBookDetails_Model from '../models/StoryBookDetails_Model.js';
import ReferenceBookDetails_Model from '../models/ReferenceBookDetails_Model.js';
import EducationalBookDetails_Model from '../models/EducationalDetails_Model.js';
import ChildrensBookDetails_Model from '../models/ChildrensBookDetails_Model.js';
import Books_Model from '../models/Books_Model.js'

const Fetch_StoryBooks_Controller = async (req, res) => {

    try {
        const books = await StoryBookDetails_Model.find();
        res.status(200).json({message: "Successfully fetched books", isSucess: true, books: books})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Internal Server Error"})
    }
      
    
}
export default Fetch_StoryBooks_Controller