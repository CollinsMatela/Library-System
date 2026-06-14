import Books_Model from "../models/Books_Model.js";

const Update_Question_Controller = async (req, res) => {
      const {questionId, question, choices, answer} = req.body;
      const {storyId} = req.params;

      console.log("Update Question Controller:", storyId);
      console.log("Update Question Controller:", questionId);

      if(!storyId) {
        return res.status(400).json({message: "Story ID is required."});
      }
      if(!questionId) {
        return res.status(400).json({message: "Question ID is required."});
      }
      if(!question || !choices || !answer){
        return res.status(400).json({message: "All fields are required."});
      }

      try {
        const updateQuestion = await Books_Model.findOneAndUpdate(
            {id: storyId, "questionnaire.questionId": questionId},
            {$set: {
                "questionnaire.$.question": question,
                "questionnaire.$.choices": choices,
                "questionnaire.$.answer": answer
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