import MarkAsReadModel from "../models/MarkAsRead_Model.js";
const MarkAsRead_Controller = async (req, res) => {
    const {userId, storyId} = req.body;

    if(!userId || !storyId){
        return res.status(400).json({message: "User ID and Story ID are required."});
    } else {
        console.log("Received Mark as Read request with data:", {userId, storyId});
    }

    try{
      const isExisting = await MarkAsReadModel.findOne({userId, storyId});

      if(isExisting){
        return res.status(400).json({message: "Story already marked as read."});
      }

      const markedAsRead = await MarkAsReadModel.create({userId, storyId});
      return res.status(200).json({message: "Story marked as read successfully."});

    } catch (error){
        return res.status(500).json({message: "An error occurred while marking the story as read."});
    }
}
export default MarkAsRead_Controller;