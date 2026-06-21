import mongoose from "mongoose";

const WorkBookSchema = new mongoose.Schema(
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
    workbookEdition: { type: String, required: true },
    workbookType: { type: String, required: true },
    workbookTopic: { type: String, required: true },
    workbookSubject: { type: String, required: true },
  },
  {
    timestamps: true
  }
);

const WorkBookDetails_Model = mongoose.model("WorkBookDetails", WorkBookSchema);
export default WorkBookDetails_Model;