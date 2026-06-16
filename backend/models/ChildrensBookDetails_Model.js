import mongoose from "mongoose";

const ChildrensBookSchema = new mongoose.Schema(
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
    readingLevel: { type: String, required: true },
    illustrator: { type: String, required: true },
    moralTheme: { type: String, required: true },
    storyType: { type: String, required: true }
  },
  {
    timestamps: true
  }
);

const ChildrensBookDetails_Model = mongoose.model("ChildrensBookDetails", ChildrensBookSchema);
export default ChildrensBookDetails_Model;