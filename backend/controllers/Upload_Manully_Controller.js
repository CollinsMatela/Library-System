import Stories_Model from "../models/Stories_Model.js"
import { nanoid } from "nanoid";
const Upload_Manually_Controller = async (req, res) =>{
      const {title, author, description, genre, gradeCategory, textStory} = req.body;
      

      try {
        // 👇 Cloudinary gives you this
        const imageUrl = req.file?.path; 
        const questionnaire = JSON.parse(req.body.questionnaire);
        
        const story = await Stories_Model.create({
                      id: `STORY${nanoid(10)}`,
                      title: title,
                      author: author,
                      description: description,
                      genre: genre,
                      gradeCategory: gradeCategory,
                      textStory: textStory,
                      image: imageUrl,
                      questionnaire: questionnaire.map((q) => ({
                                                            question: q.question,
                                                            choices: q.choices,
                                                            answer: q.answer
                                                            }))
        })
        res.status(200).json({message: "Successfully added new story", isSuccess: true})
      } catch (error) {
        console.log(error)
        res.status(500).json({message: "Internal Error Server"})
      }
}
export default Upload_Manually_Controller