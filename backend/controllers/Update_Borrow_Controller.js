import Borrow_Model from "../models/Borrow_Model.js";
import mongoose from "mongoose";

const Update_Borrow_Controller = async (req, res) => {
    const {
        requestId,
        borrowDate,
        returnDate,
        status,
        quantity,
    } = req.body;

    try {
        if (!requestId) {
            return res.status(400).json({
                message: "Request ID is required.",
            });
        }

        const updatedBorrow = await Borrow_Model.findByIdAndUpdate(
            requestId,
            {
                borrowDate,
                returnDate,
                status,
                $inc: {
                    quantity: -quantity
                },
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedBorrow) {
            return res.status(404).json({
                message: "Borrow request not found.",
            });
        }

        return res.status(200).json({
            message: "Borrow request updated successfully.",
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Internal Server Error.",
        });
    }
};

export default Update_Borrow_Controller;