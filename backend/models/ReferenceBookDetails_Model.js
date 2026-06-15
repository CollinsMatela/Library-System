import mongoose from "mongoose";

const ReferenceBookSchema = new mongoose.Schema(
  {
    bookId: { type: mongoose.Schema.Types.ObjectId, ref: "Books"},
    referenceType: { type: String, required: true },
    subjectArea: { type: String, required: true },
    referenceEdition: { type: String, required: true },
    referenceVolume: { type: String, required: true }
  },
  {
    timestamps: true
  }
);

const ReferenceBookDetails_Model = mongoose.model("ReferenceBookDetails", ReferenceBookSchema);
export default ReferenceBookDetails_Model;