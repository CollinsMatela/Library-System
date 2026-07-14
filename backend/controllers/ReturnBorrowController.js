import Borrow_Model from "../models/Borrow_Model.js";
import Fiction_Model from "../models/Fiction_Model.js";
import NonFiction_Model from "../models/NonFiction_Model.js";

const ReturnBorrowController = async (req, res) => {
    const { id, status } = req.body;

    try {
        if (!id) {
            return res.status(400).json({
                message: "Borrow request ID is required.",
            });
        }

        const borrowRequest = await Borrow_Model.findById(id);

        if (!borrowRequest) {
            return res.status(404).json({
                message: "Borrow request not found.",
            });
        }

        const updatedBorrow = await Borrow_Model.findByIdAndUpdate(
            id,
            { status },
            {
                new: true,
                runValidators: true,
            }
        );

        let fictionBook = await Fiction_Model.findById(borrowRequest.bookId);

        if (fictionBook) {
            await Fiction_Model.findByIdAndUpdate(
                borrowRequest.bookId,
                {
                    $inc: {
                        copies: + Number(borrowRequest.quantity),
                    },
                }
            );
        } else {
            const nonFictionBook = await NonFiction_Model.findById(
                borrowRequest.bookId
            );

            if (!nonFictionBook) {
                return res.status(404).json({
                    message: "Book not found.",
                });
            }

            await NonFiction_Model.findByIdAndUpdate(
                borrowRequest.bookId,
                {
                    $inc: {
                        copies: + Number(borrowRequest.quantity),
                    },
                }
            );
        }

        return res.status(200).json({
            message: "Book returned successfully.",
            borrow: updatedBorrow,
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Internal Server Error.",
        });
    }
};

export default ReturnBorrowController;