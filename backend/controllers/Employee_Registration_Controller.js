import Employee_Registration_Model from "../models/Employee_Registration_Model.js";
import bcrypt from "bcrypt";
import {nanoid} from 'nanoid';

const Employee_Registration_Controller = async (req, res) => {
    const { lastname, firstname, middlename, year, month, day, age, gender, email, contact, role, gradeLevel, branch } = req.body;

    const username = `${lastname}.${Math.floor(Math.random() * 1000) + 1000}@lmlc.edu`;
    const defaultPassword = nanoid(10);

    const hashedPassword = await bcrypt.hash(defaultPassword, 10);

      try {

        const newEmployee = await Employee_Registration_Model.create({
            id: crypto.randomUUID(),
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
            role: role,
            gradeLevel: gradeLevel,
            branch: branch,
            username: username,
            password: hashedPassword 
        })

        const accountDetail = {
              name: `${firstname} ${lastname}`,
              role: role,
              username: username,
              password: defaultPassword
        }

        res.status(201).json({message: "Employee registered successfully", isSuccess: true, account: accountDetail});
        
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
      }
}
export default Employee_Registration_Controller;