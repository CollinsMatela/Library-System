import Student_Registration_Model from "../models/Student_Registration_Model.js";
import bcrypt from "bcrypt";

const Student_Registration_Controller = async (req, res) => {
    const { lastname, firstname, middlename, year, month, day, age, gender, parentLastname, parentFirstname, parentMiddlename, parentEmail, parentContact, parentRelationship, gradeLevel, branch } = req.body;

    const username = `${firstname}.${Math.floor(Math.random() * 1000) + 1000}@lmlc.com`;
    const password = `${lastname}${firstname}${Math.floor(Math.random() * 1000) + 1000}`;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {

        const newStudent = await Student_Registration_Model.create({
            id: crypto.randomUUID(),
            lastname: lastname,
            firstname: firstname,
            middlename: middlename,
            year: year,
            month: month,
            day: day,
            age: age,
            gender: gender,
            parentLastname: parentLastname,
            parentFirstname: parentFirstname,
            parentMiddlename: parentMiddlename,
            parentEmail: parentEmail,
            parentContact: parentContact,
            parentRelationship: parentRelationship,
            gradeLevel: gradeLevel,
            branch: branch,
            username: username,
            password: hashedPassword
        })
        
        res.status(201).json({ message: "Student registered successfully", student: newStudent});
    } catch (error) {
        console.error("Error registering student:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
export default Student_Registration_Controller;