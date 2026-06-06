import MarkAsRead_Model from '../models/MarkAsRead_Model.js'

const Fetch_All_Marked_Controller = async (req, res) => {
      
    try {
        const allMarkAsRead = await MarkAsRead_Model.find();
        res.status(200).json({message: "fetching all mark as read.", MarkAsReads: allMarkAsRead})
    } catch (error) {
        return res.sstatus(500).json({message: "Internal Error 500 on fetching all mark as read"});
    }
}
export default Fetch_All_Marked_Controller;