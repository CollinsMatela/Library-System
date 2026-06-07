import StudentModel from "../models/Student_Registration_Model.js";
import EmployeeModel from "../models/Employee_Registration_Model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const Login_Controller = async (req, res) => {
  const { username, password } = req.body;

  const admin = username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD

  try {
    let user = null;
    let role = null;

    if(admin){
      console.log('Correct')
      user = "admin";
      role = "admin";

      const token = jwt.sign(
        { user: user,
          role: role
        },
        process.env.JWT_SECRET,
        {expiresIn: "1h"}
      )
      return res.status(200).json({isSuccess: true,
                                   message: "Admin Logged In",
                                   token,
                                   user,
                                   role
                                  })
    }

    const student = await StudentModel.findOne({username: username,});
    const employee = await EmployeeModel.findOne({username: username,});

    // 2. If no user found at all
    if (!student && !employee) {
      return res.status(404).json({ message: "User not found" });
    }

    // 3. Student login
    if (student) {
      const isMatch = await bcrypt.compare(password, student.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Login failed. Please try again." });
      }
      user = student;
      role = "Student";
    }

    // 4. Employee login
    else if (employee) {
      const isMatch = await bcrypt.compare(password, employee.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Login failed. Please try again." });
      }
      user = employee;
      role = "Teacher";
    }

    // 5. Safety check (prevents crashes)
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials or user not found" });
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