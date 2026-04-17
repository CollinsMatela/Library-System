import StudentModel from "../models/Student_Registration_Model.js"

const Edit_Student_Controller = async (req, res) => {
    const { studentId } = req.params
    const { lastname, firstname, middlename, year, month, day, gender, parentLastname, parentFirstname, parentMiddlename, parentEmail, parentContact, parentRelationship, gradeLevel, branch } = req.body;

    try {
        const findStudent = await StudentModel.findOne({"student.id": studentId})
        if(!findStudent) {
            return res.status(404).json({message: "Student not found"});
        }

        const updatedStudent = await StudentModel.findOneAndUpdate({"student.id": studentId}, 
            {
                "student.lastname": lastname,
                "student.firstname": firstname,
                "student.middlename": middlename,
                "student.year": year,
                "student.month": month,
                "student.day": day,
                "student.gender": gender,
                "parent.lastname": parentLastname,
                "parent.firstname": parentFirstname,
                "parent.middlename": parentMiddlename,
                "parent.email": parentEmail,
                "parent.contact": parentContact,
                "parent.parentRelationship": parentRelationship,
                "school.gradeLevel": gradeLevel,
                "school.branch": branch
             })
             res.status(200).json({message: "Student account updated successfully", updatedStudent: updatedStudent});
        
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Internal Server Error"});
    }
}
export default Edit_Student_Controller