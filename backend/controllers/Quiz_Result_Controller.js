import Quiz_Model from "../models/Quiz_Modal.js";

const Quiz_Result_Controller = async (req, res) => {
      const { userId, storyId, score, exp, correctAnswers, totalQuestions, accuracy, answeredQuestions } = req.body;

      try {

        const quizResult = await Quiz_Model.create({
            userId,
            storyId,
            score,
            exp,
            correctAnswers,
            totalQuestions,
            accuracy,
            answeredQuestions
        });
        
        res.status(201).json({ message: "Quiz result saved successfully", quizResult });
        
      } catch (error) {
        res.status(500).json({ message: "Internal server error" });
      }
}
export default Quiz_Result_Controller;