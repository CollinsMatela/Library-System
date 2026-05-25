import Stories_Model from "../models/Stories_Model.js";

const Update_Question_Controller = async (req, res) => {
      const {questionId, newQuestion, newChoice1, newChoice2, newChoice3, newChoice4, newCorrectAnswer} = req.body;
      const {storyId} = req.params;

      console.log(storyId);
      console.log(questionId);


      if(!storyId) {
        return res.status(400).json({message: "Story ID is required."});
      }
      if(!questionId) {
        return res.status(400).json({message: "Question ID is required."});
      }
      if(!newQuestion || !newChoice1 || !newChoice2 || !newChoice3 || !newChoice4 || !newCorrectAnswer){
        return res.status(400).json({message: "All fields are required."});
      }

      try {
        const updateQuestion = await Stories_Model.findOneAndUpdate(
            {id: storyId, "questionnaire.questionId": questionId},
            {$set: {
                "questionnaire.$.question": newQuestion,
                "questionnaire.$.choices": [newChoice1, newChoice2, newChoice3, newChoice4],
                "questionnaire.$.answer": newCorrectAnswer
                }
            },
            { new: true }
        );

        res.status(200).json({
            message: "Question updated successfully.",
            updatedQuestion: updateQuestion
        });

        } catch (error) {
        console.error("Error updating question:", error);

        return res.status(500).json({
            message: "An error occurred while updating the question."
        });
        }}

export default Update_Question_Controller;