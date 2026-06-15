import mongoose from "mongoose";

const ChildrensBookSchema = new mongoose.Schema(
  {
    bookId: { type: mongoose.Schema.Types.ObjectId, ref: "Books"},
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