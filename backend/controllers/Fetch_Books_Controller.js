import Fiction_Model from '../models/Fiction_Model.js'
import NonFiction_Model from '../models/NonFiction_Model.js'

const Fetch_Books_Controller = async (req, res) => {

    try {
        const [fiction, non_fiction] = await Promise.all([
              Fiction_Model.find(),
              NonFiction_Model.find()
        ])

        const books = [...fiction, ...non_fiction];

        res.status(200).json({message: "Successfully fetched books", isSucess: true, books: books})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Internal Server Error"})
    }
      
    
}
export default Fetch_Books_Controller