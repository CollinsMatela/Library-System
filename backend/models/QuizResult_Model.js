import mongoose from "mongoose";

const QuizResultSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    storyId: { type: String, required: true },
    title: { type: String, required: true },
    score: { type: Number, required: true },
    totalQuestions: { type: Number, default: 0 },
    answeredQuestions: [{ questionId: String, selectedChoice: String, isCorrect: Boolean }],
    completedAt: { type: Date, default: Date.now }
});

const QuizResult_Model = mongoose.model("QuizResult", QuizResultSchema);
export default QuizResult_Model;