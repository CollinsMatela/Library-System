import User_Registration_Model from '../models/User_Registration_Model.js'
import EmployeeModel from '../models/Employee_Registration_Model.js'
import bcrypt from 'bcrypt';

const Change_Password_Controller = async (req, res) => {
    const {id, role, newPassword} = req.body;

    console.log(id)
    console.log(role)
    console.log(newPassword)

    try {
        if (!id || !newPassword) {
            return res.status(400).json({ message: "Missing required fields", isSuccess: false });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        if(role.toLowerCase() === "user"){
           const updateStudent = await User_Registration_Model
           .findOneAndUpdate(
            {_id: id},
            {password: hashedPassword, isChangePassword: true},
            {new: true}
            )

            if(!updateStudent){
                return res.status(404).json({ message: "Student not found", isSuccess: false });
            }
        
        } else {
            res.status(400).json({message: "Invalid Role", isSuccess: false});
        }

        res.status(200).json({message: "Successfully changed password", isSuccess: true});

    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Internal Server Error"});  
    }
    
}
export default Change_Password_Controller