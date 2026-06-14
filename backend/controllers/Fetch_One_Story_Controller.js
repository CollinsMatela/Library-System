import Books_Model from "../models/Books_Model.js";

const Fetch_One_Story_Controller = async (req, res) => {
      const {id} = req.params;

      try {
        if(!id){
            return res.status(400).json({message: "The story ID is null"});
        }
        const story = await Books_Model.findOne({id: id});
        if (!story) {
            return res.status(404).json({ message: "Story not found" });
        }
        res.status(200).json({message: `Successfully fetched ${story.title}`,
                                    story: story
        })
      } catch (error) {
        console.error(error);
        res.status(500).json({message: "Internal Server Error"});
      }
}
export default Fetch_One_Story_Controller;