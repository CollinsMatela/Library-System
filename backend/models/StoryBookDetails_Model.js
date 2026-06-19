import mongoose from "mongoose";

const StoryBookSchema = new mongoose.Schema(
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
    genre: { type: String, required: true },
    storySeries: { type: String, required: true },
    storyVolume: { type: String, required: true },
  },
  {
    timestamps: true
  }
);

const StoryBookDetails_Model = mongoose.model("StoryBookDetails", StoryBookSchema);
export default StoryBookDetails_Model;