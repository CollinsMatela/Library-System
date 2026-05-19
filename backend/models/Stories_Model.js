import mongoose from "mongoose";

const StoriesSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    title: { type: String, required: true },
    author: { type: String, required: true },
    description: { type: String, required: true },
    genre: { type: String, required: true },
    gradeCategory: { type: String, required: true },
    fullStory: { type: String, required: true },
    summaryStory: { type: String, required: true },
    image: { type: String, required: true },

    questionnaire: [
      {
        questionId: { type: String, required: true },
        question: { type: String, required: true },
        choices: [{ type: String, required: true }],
        answer: { type: String, required: true }
      }
    ]
  },
  {
    timestamps: true
  }
);

const Stories_Model = mongoose.model("Stories", StoriesSchema);
export default Stories_Model;