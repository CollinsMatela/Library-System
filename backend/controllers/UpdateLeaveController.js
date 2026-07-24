import LogBook_Modal from '../models/LogBook_Model.js'

const UpdateLeaveController = async (req, res) => {
      const {id} = req.body;
      console.log(id);
      if (!id) {
            return res.status(400).json({
            message: 'ID is required.'
            });
        }

      try {
        const updateLeave = await LogBook_Modal.findByIdAndUpdate(id, {leaveTime: new Date().toISOString()});
        await res.status(200).json({message: 'Successfully updated leaving time of visitor.'})
      } catch (error) {
        console.log(error.message);
        res.status(500).json({message: 'Internal Error'});
      }
}

export default UpdateLeaveController