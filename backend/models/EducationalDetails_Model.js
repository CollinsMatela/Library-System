import mongoose from "mongoose";

const EducationalBookSchema = new mongoose.Schema(
  {
    bookId: { type: mongoose.Schema.Types.ObjectId, ref: "Books"},
    subject: { type: String, required: true },
    educationalEdition: { type: String, required: true },
  },
  {
    timestamps: true
  }
);

const EducationalBookDetails_Model = mongoose.model("EducationalBookDetails", EducationalBookSchema);
export default EducationalBookDetails_Model;