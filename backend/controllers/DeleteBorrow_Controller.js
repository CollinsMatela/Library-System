import Borrow_Model from '../models/Borrow_Model.js'
const DeleteBorrowController = async (req, res) => {
    const {requestId} = req.params;
    try {

        if(!requestId) {
            console.log('Missing Request Id Found');
            res.status(400).json({message: 'Missing Request Id Found'});
            return
        }

        const deletedBorrow = await Borrow_Model.findByIdAndDelete(requestId);

        if (!deletedBorrow) {
            return res.status(404).json({
                message: 'Borrow request not found'
            });
        }
        
        res.status(200).json({message: 'Successfully deleted the request'})

    } catch (error) {
        res.status(500).json({message: 'Internal Error'});
    }
}

export default DeleteBorrowController