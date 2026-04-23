import Employee_Registration_Model from "../models/Employee_Registration_Model.js";
import bcrypt from "bcrypt";

const Employee_Registration_Controller = async (req, res) => {
    const { lastname, firstname, middlename, year, month, day, age, gender, email, contact, role, gradeLevel, branch } = req.body;

    const username = `${new Date().getFullYear()}-${Math.floor(Math.random() * 1000) + 1000}`;
    const password = `123456`;

    const hashedPassword = await bcrypt.hash(password, 10);

      try {

        const newEmployee = await Employee_Registration_Model.create({
            id: crypto.randomUUID(),
            personal_information:{
              lastname: lastname,
              firstname: firstname,
              middlename: middlename,
              year: year,
              month: month,
              day: day,
              age: age,
              gender: gender,
              email: email,
              contact: contact,
            },
              employee_information: {
              role: role,
              gradeLevel: gradeLevel,
              branch: branch,
            },
            account_information: {
              username: username,
              password: hashedPassword 
            }
            
            
        })

        res.status(201).json({message: "Employee registered successfully", isSuccess: true});
        
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
      }
}
export default Employee_Registration_Controller;