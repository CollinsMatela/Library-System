import mongoose from "mongoose";

const NonFictionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    description: { type: String, required: true },
    gradeCategory: { type: String, required: true },
    language: {type: String, required: true},
    publication: {type: String, required: true},
    publisher: {type: String, required: true},
    isbn: {type: String, required: true},
    type: {type: String, required: true},
    pages: [{
             pageText: {type: String},
             pageImage: [String]
    }],
    cover: { type: String, required: true },
    availability: { type: Boolean, required: true },
    referenceType: { type: String, required: true },
    subjectArea: { type: String, required: true },
    referenceEdition: { type: String, required: true },
    referenceVolume: { type: String, required: true }
  },
  {
    timestamps: true
  }
);

const NonFiction_Model = mongoose.model("Non-Fiction Model", NonFictionSchema);
export default NonFiction_Model;