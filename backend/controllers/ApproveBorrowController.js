import Borrow_Model from '../models/Borrow_Model.js'
const ApproveBorrowController = async (req, res) => {
    const {id, status} = req.body;

    try {
        if(!id){
            res.status(400).json({message: 'Borrow Id is not existing'});
            return;
        }

        const borrowRequest = await Borrow_Model.findOneAndUpdate(
            {_id: id},
            {status: status},
            {new: true}
        );

         if (!borrowRequest) {
            return res.status(404).json({
                message: "Borrow request not found."
            });
        }

        return res.status(200).json({
            message: "Borrow request is approved successfully.",
            borrowRequest
        });


    } catch (error) {
        res.status(500).json({message: "Internal Error"})
    }
}
export default ApproveBorrowController