import Borrow_Model from "../models/Borrow_Model.js";
import Fiction_Model from "../models/Fiction_Model.js";
import NonFiction_Model from "../models/NonFiction_Model.js";
import User_Model from "../models/User_Registration_Model.js"
import mongoose from "mongoose";

const Update_Borrow_Controller = async (req, res) => {
    const {
        id,
        borrowDate,
        returnDate,
        status,
        quantity,
        bookId,
        userId,
    } = req.body;

    try {
        if (!id) {
            return res.status(400).json({
                message: "Request ID is required.",
            });
        }

        const request = await Borrow_Model.findById(id);
        const user = await User_Model.findById(userId);
       
        let book = await Fiction_Model.findById(bookId);
            if (!book) {
                book = await NonFiction_Model.findById(bookId);
            }

        if (!user) {
            return res.status(400).json({
                message: "User not found.",
            });
        }
        if (!book) {
            return res.status(400).json({
                message: "Book is required.",
            });
        }

        if (book.copies < Number(quantity)) {
            return res.status(400).json({
                message: "Not enough copies available."
            });
        }

        if (!request) {
            return res.status(404).json({
                message: "Borrow request not found.",
            });
        }
        
        const updatedBorrow = await Borrow_Model.findByIdAndUpdate(
            id,
             {
                borrowDate,
                returnDate,
                status,
                quantity,
            },
            {
                new: true,
                runValidators: true,
            }
        );

        if (status === "Borrowed") {
            if (book.type.toLowerCase() === "fiction") {
                await Fiction_Model.findByIdAndUpdate(bookId, {
                    $inc: {
                        copies: -Number(quantity)
                    }
                });
            } else if (book.type.toLowerCase() === "non-fiction") {
                await NonFiction_Model.findByIdAndUpdate(bookId, {
                    $inc: {
                        copies: -Number(quantity)
                    }
                });
            }
        }

        return res.status(200).json({
            message: "Borrow request updated successfully.",
            user: user
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Internal Server Error.",
        });
    }
};

export default Update_Borrow_Controller;