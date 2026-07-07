import StudentModel from "../models/User_Registration_Model.js"

const Edit_Student_Controller = async (req, res) => {
    const { id } = req.params
    const { lastname, firstname, middlename, year, month, day, gender, parentLastname, parentFirstname, parentMiddlename, parentEmail, parentContact, parentRelationship, gradeLevel, branch } = req.body;
    console.log(id);
    try {
        const findStudent = await StudentModel.findOne({_id: id})
        if(!findStudent) {
            return res.status(404).json({message: "Student not found"});
        }

        const updatedStudent = await StudentModel.findOneAndUpdate({_id: id}, 
            {
                lastname: lastname,
                firstname: firstname,
                middlename: middlename,
                year: year,
                month: month,
                day: day,
                gender: gender,
                parentLastname: parentLastname,
                parentFirstname: parentFirstname,
                parentMiddlename: parentMiddlename,
                parentEmail: parentEmail,
                parentContact: parentContact,
                parentRelationship: parentRelationship,
                gradeLevel: gradeLevel,
                branch: branch
             })
             res.status(200).json({message: "Student account updated successfully", updatedStudent: updatedStudent});
        
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Internal Server Error"});
    }
}
export default Edit_Student_Controller