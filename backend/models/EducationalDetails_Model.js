import mongoose from "mongoose";

const EducationalBookSchema = new mongoose.Schema(
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
    subject: { type: String, required: true },
    educationalEdition: { type: String, required: true },
  },
  {
    timestamps: true
  }
);

const EducationalBookDetails_Model = mongoose.model("EducationalBookDetails", EducationalBookSchema);
export default EducationalBookDetails_Model;