import StudentModel from "../models/User_Registration_Model.js";

const Delete_Student_Controller = async (req, res) => {
    const { id } = req.params;
    console.log(id);
    try {
        const student = await StudentModel.findOneAndDelete({_id: id});
        if(!student){
            res.status(404).json({message: "Student not found"});
        } else {
            res.status(200).json({message: "Student deleted successfully"});
        }
        
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Internal Server Error"});
    }
}
export default Delete_Student_Controller;