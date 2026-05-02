import StudentModel from "../models/Student_Registration_Model.js"

const Edit_Student_Controller = async (req, res) => {
    const { studentId } = req.params
    const { lastname, firstname, middlename, year, month, day, gender, parentLastname, parentFirstname, parentMiddlename, parentEmail, parentContact, parentRelationship, gradeLevel, branch } = req.body;

    try {
        const findStudent = await StudentModel.findOne({id: studentId})
        if(!findStudent) {
            return res.status(404).json({message: "Student not found"});
        }

        const updatedStudent = await StudentModel.findOneAndUpdate({id: studentId}, 
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