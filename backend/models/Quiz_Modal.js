import mongoose from "mongoose";

const QuizSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    storyId: { type: String, required: true },
    score: { type: Number, required: true },
    exp: { type: Number, required: true },
    correctAnswers: { type: Number, default: 0 },
    totalQuestions: { type: Number, default: 0 },
    accuracy: { type: Number, default: 0 },
    answeredQuestions: [{ questionId: String, selectedChoice: String, isCorrect: Boolean }],
    completedAt: { type: Date, default: Date.now }
});

const Quiz_Model = mongoose.model("Quiz_Modal", QuizSchema);
export default Quiz_Model;