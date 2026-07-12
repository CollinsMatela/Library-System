import Borrow_Model from "../models/Borrow_Model.js";

const Fetch_BorrowById_Controller = async (req, res) => {
    const { userId } = req.params;
    console.log("UserId");
    try {
        const request = await Borrow_Model.find({ userId: userId });

        return res.status(200).json({
            message: "Borrow requests retrieved successfully.",
            request
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Internal Error: Failed to retrieve borrow requests."
        });
    }
};

export default Fetch_BorrowById_Controller;