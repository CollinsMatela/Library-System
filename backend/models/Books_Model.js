import mongoose from "mongoose";

const BookSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    title: { type: String, required: true },
    author: { type: String, required: true },
    description: { type: String, required: true },
    genre: { type: String, required: true },
    gradeCategory: { type: String, required: true },
    language: {type: String, required: true},
    publication: {type: String, required: true},
    type: {type: String, required: true},
    pages: [{
             pageText: {type: String, required: true},
             pageImage: {type: String}
    }],
    summary: { type: String, required: true },
    cover: { type: String, required: true },
  },
  {
    timestamps: true
  }
);

const Books_Model = mongoose.model("Books", BookSchema);
export default Books_Model;