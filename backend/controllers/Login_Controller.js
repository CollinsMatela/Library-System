import StudentModel from "../models/Student_Registration_Model.js";
import EmployeeModel from "../models/Employee_Registration_Model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const Login_Controller = async (req, res) => {
  const { username, password } = req.body;

  try {
    
    // 1. Find user in both collections
    const student = await StudentModel.findOne({
      "account.username": username,
    });

    const employee = await EmployeeModel.findOne({
      "account_information.username": username,
    });

    console.log("STUDENT:", student);
    console.log("EMPLOYEE:", employee);

    // 2. If no user found at all
    if (!student && !employee) {
      return res.status(404).json({ message: "User not found" });
    }

    let user = null;
    let role = null;

    // 3. Student login
    if (student) {
        console.log("STUDENT PASSWORD FIELD:", student.account.password);
      const isMatch = await bcrypt.compare(
        password,
        student.account.password
      );

      if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      user = student;
      role = "Student";
    }

    // 4. Employee login
    else if (employee) {
        console.log("EMPLOYEE PASSWORD FIELD:", employee.account_information.password);
      const isMatch = await bcrypt.compare(
        password,
        employee.account_information.password
      );

      if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      user = employee;
      role = "Administrator";
    }

    // 5. Safety check (prevents crashes)
    if (!user) {
      return res
        .status(401)
        .json({ message: "Invalid credentials or user not found" });
    }

    // 6. Generate JWT
    const token = jwt.sign(
      {
        id: user.id,
        role: role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // 7. Response
    return res.status(200).json({
      isSuccess: true,
      message: `Successfully logged in ${role}`,
      token,
      user,
      role,
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export default Login_Controller;