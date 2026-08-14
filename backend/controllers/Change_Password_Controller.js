import User_Registration_Model from '../models/User_Registration_Model.js'
import bcrypt from 'bcrypt';

export const firstTime_Password = async (req, res) => {
    const {id, role, newPassword} = req.body;

    try {
        if (!id || !newPassword) {
            return res.status(400).json({ message: "Missing required fields", isSuccess: false });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        if(role.toLowerCase() === "user"){
           const updateUser = await User_Registration_Model
           .findOneAndUpdate(
            {_id: id},
            {password: hashedPassword, isChangePassword: true},
            {new: true}
            )

            if(!updateUser){
                return res.status(404).json({ message: "User not found", isSuccess: false });
            }
        
        } else {
            res.status(400).json({message: "Invalid Role", isSuccess: false});
        }

        res.status(200).json({message: "Successfully changed password", isSuccess: true});

    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Internal Server Error: First time Password"});  
    }
    
}

export const ChangePassword = async (req, res) => {
       try {
         const {id, currentPassword, newPassword} = req.body;
         console.log('Check Id:', id);
         console.log('Check Current:', currentPassword);
         console.log('Check New:', newPassword);

         const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{12,}$/;
         if(!passwordRegex.test(newPassword)){
            res.status(400).json({message: "Backend: New Password did not match the requirements."});
            return;
         }

         const user = await User_Registration_Model.findById(id);
         if(!user){
            res.status(400).json({message: "The user can't found."});
            return  
         }
         
         const isMatch = await bcrypt.compare(currentPassword, user.password);
         if(!isMatch){
            res.status(400).json({message: "Current password does not match."});
            return  
         } 

         const hashedPassword = await bcrypt.hash(newPassword, 10)

         user.password = hashedPassword;

         await user.save();
         res.status(200).json({message: "successfully changed password."})

         
       } catch (error) {
         console.error(error);
         res.status(500).json({message: "Internal Server Error: Change Password"});  
       }
}
