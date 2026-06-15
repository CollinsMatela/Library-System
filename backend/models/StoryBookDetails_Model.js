import mongoose from "mongoose";

const StoryBookSchema = new mongoose.Schema(
  {
    bookId: { type: mongoose.Schema.Types.ObjectId, ref: "Books"},
    genre: { type: String, required: true },
    ageRecommendation: { type: String, required: true },
  },
  {
    timestamps: true
  }
);

const StoryBook_Model = mongoose.model("StoryBookDetails", StoryBookSchema);
export default StoryBook_Model;