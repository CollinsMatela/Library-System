import StoriesModel from '../models/Stories_Model.js'

const Fetch_Stories_Controller = async (req, res) => {

    try {
        const stories = await StoriesModel.find();
        res.status(201).json({message: "Successfully fetched stories", isSucess: true, stories: stories})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Internal Server Error"})
    }
      
    
}
export default Fetch_Stories_Controller