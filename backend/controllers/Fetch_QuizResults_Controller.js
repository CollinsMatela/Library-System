import QuizResult_Model from "../models/QuizResult_Model.js";

const Fetch_QuizResults_Controller = async (req, res) => {
      try {
        const quizResults = await QuizResult_Model.find();
        res.status(200).json({message: "Quiz results fetched successfully", results: quizResults, total: quizResults.length});

      } catch (error) {
        res.status(500).json({message: "Error fetching quiz results", error: error.message});
      }
}

export default Fetch_QuizResults_Controller;