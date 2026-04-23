import Student_Registration_Model from "../models/Student_Registration_Model.js";
import bcrypt from "bcrypt";

const Student_Registration_Controller = async (req, res) => {
    const { lastname, firstname, middlename, year, month, day, age, gender, parentLastname, parentFirstname, parentMiddlename, parentEmail, parentContact, parentRelationship, gradeLevel, branch } = req.body;

    const StudentId = `${new Date().getFullYear()}-${Math.floor(Math.random() * 1000) + 1000}`;
    const PIN = `${Math.floor(Math.random() * 1000) + 1000}`;
    const hashedPassword = await bcrypt.hash(PIN, 10);

    try {

        const newStudent = await Student_Registration_Model.create({
            id: StudentId,
            student: {
                lastname: lastname,
                firstname: firstname,
                middlename: middlename,
                year: year,
                month: month,
                day: day,
                age: age,
                gender: gender
            },
            parent: {
                parentLastname: parentLastname,
                parentFirstname: parentFirstname,
                parentMiddlename: parentMiddlename,
                parentEmail: parentEmail,
                parentContact: parentContact,
                parentRelationship: parentRelationship
            },
            school: {
                role: "Student",
                gradeLevel: gradeLevel,
                branch: branch
            },
            account: {
                username: StudentId,
                password: hashedPassword
            }
        });

        const AccountData = {
              name: `${firstname} ${lastname}`,
              role: "Student",
              username: StudentId,
              pin: PIN
        }
        
        res.status(201).json({ message: "Student registered successfully", isSuccess: true, account: AccountData});
    } catch (error) {
        console.error("Error registering student:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
export default Student_Registration_Controller;