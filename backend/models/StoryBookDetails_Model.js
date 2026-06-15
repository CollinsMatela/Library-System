import mongoose from "mongoose";

const StoryBookSchema = new mongoose.Schema(
  {
    bookId: { type: mongoose.Schema.Types.ObjectId, ref: "Books"},
    genre: { type: String, required: true },
  },
  {
    timestamps: true
  }
);

const StoryBookDetails_Model = mongoose.model("StoryBookDetails", StoryBookSchema);
export default StoryBookDetails_Model;