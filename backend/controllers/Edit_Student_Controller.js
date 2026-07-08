import StudentModel from "../models/User_Registration_Model.js"

const Edit_Student_Controller = async (req, res) => {
    const { id } = req.params
    const {     lastname,
                firstname,
                middlename,
                year,
                month,
                day,
                sex,
                email,
                contact,
                parentName,
                parentContact,
                parentRelationship} = req.body;
    try {
        const findStudent = await StudentModel.findOne({_id: id})
        if(!findStudent) {
            return res.status(404).json({message: "Student not found"});
        }

        const updatedStudent = await StudentModel.findOneAndUpdate({_id: id}, 
            {
                lastname,
                firstname,
                middlename,
                year,
                month,
                day,
                sex,
                email,
                contact,
                parentName,
                parentContact,
                parentRelationship
             })
             res.status(200).json({message: "Student account updated successfully", updatedStudent: updatedStudent});
        
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Internal Server Error"});
    }
}
export default Edit_Student_Controller