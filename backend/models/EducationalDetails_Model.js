import mongoose from "mongoose";

const EducationalBookSchema = new mongoose.Schema(
  {
    bookId: { type: mongoose.Schema.Types.ObjectId, ref: "Books"},
    subject: { type: String, required: true },
    edition: { type: String, required: true },
  },
  {
    timestamps: true
  }
);

const EducationalBook_Model = mongoose.model("EducationalBookDetails", EducationalBookSchema);
export default EducationalBook_Model;