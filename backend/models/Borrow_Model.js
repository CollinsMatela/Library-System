import mongoose from "mongoose";

const BorrowSchema = new mongoose.Schema(
  {
    userId: {type: String, required: true},
    name: {type: String},
    bookId: {type: String, required: true},
    title: {type: String},
    borrowDate: {type: String},
    returnDate: {type: String},
    status: {type: String, enum: ['Pending', 'Approved', 'Rejected', 'Borrowed'], default: 'Pending'},
    quantity: {type: String},
  },
  {
    timestamps: true
  }
);

const Borrow_Model = mongoose.model("Borrow_Model", BorrowSchema);
export default Borrow_Model;