import Borrow_Model from '../models/Borrow_Model.js'
const Fetch_AllBorrow_Controller = async (req, res) => {
     try {
        const borrows = await Borrow_Model.find();
        res.status(200).json({
            message: 'Fetched all borrowing', 
            borrows: borrows})
     } catch (error) {
        res.status(500).json({message: "Internal Error"})
     }
}
export default Fetch_AllBorrow_Controller;