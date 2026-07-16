import Borrow_Model from '../models/Borrow_Model.js'
const DeleteBorrowController = async (req, res) => {
    const {id} = req.params;
    try {
        if(!id){
            res.status(400).json({message: 'Book Id is not found'});
            return;
        }

        await Borrow_Model.findByIdAndDelete(id);
        res.status(200).json({message: 'Successfully deleted borrow request.'});

    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Internal Error'});
    }
}
export default DeleteBorrowController