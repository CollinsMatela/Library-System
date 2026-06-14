import Books_Model from '../models/Books_Model.js'

const Fetch_Stories_Controller = async (req, res) => {

    try {
        const stories = await Books_Model.find();
        res.status(201).json({message: "Successfully fetched stories", isSucess: true, stories: stories})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Internal Server Error"})
    }
      
    
}
export default Fetch_Stories_Controller