import StudentModel from '../models/Student_Registration_Model.js'
import EmployeeModel from '../models/Employee_Registration_Model.js'
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const Login_Controller = async (req, res) => {
      const {username, password} = req.body;

      try {

        const Student = await StudentModel.findOne({"account.username": username})
        const Employee = await EmployeeModel.findOne({"account_information.username": username})

        if (!Student && !Employee) {
            return res.status(404).json({ message: "User not found" });
        }

        let User = null;
        let Role = null;

        if(Student){
            const isMatch = await bcrypt.compare(password, Student.account.password);
            if(!isMatch){
                return res.status(401).json({ message: "Invalid credentials" });
            }
            User = Student;
            Role = "Student";
        } 
        else if(Employee){
            const isMatch = await bcrypt.compare(password, Employee.account_information.password);
            if(!isMatch){
                return res.status(401).json({message: "Invalid credentials"});
            }
            User = Employee;
            Role = "Employee"
        } 

        const token = jwt.sign(
            {id: User.id, role: Role},
            process.env.JWT_SECRET,
            {expiresIn: "1h"}
        )

        await res.status(200).json({isSuccess: true, message: `Successfully logged in ${Role}`, Token: token})
        
      } catch (error) {
        console.error(error);
        res.status(500).json({message: "Internal Server Error"})
      }
}
export default Login_Controller