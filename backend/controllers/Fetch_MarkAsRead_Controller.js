import MarkAsRead_Model from "../models/MarkAsRead_Model.js";

const Fetch_MarkAsRead_Controller = async (req, res) => {
      const {userId, storyId} = req.query;
      
      if(!userId || !storyId){
        return res.status(400).json({message: "User Id and Story Id are not found"})
      }

      try {
        const marked = await MarkAsRead_Model.findOne({userId, storyId});

        let isRead = false;
        if (marked) {
        isRead = true;
        }
         
        return res.status(200).json({message: `successfully fetched mark as read.}`,
                                    isRead: isRead 
                            })
      } catch (error) {
        res.status(500).json({message: "Internal Error on Fetching Marked as read."})
      }
}
export default Fetch_MarkAsRead_Controller;