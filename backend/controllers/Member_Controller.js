import bcrypt from "bcrypt";
import LibrarianModel from "../models/Librarian_Model.js";
import {nanoid} from 'nanoid'

export const Fetch_Members_Controller = async (req, res) => {
       try {

         const members = await LibrarianModel.find().select('-password');
         res.status(200).json({message: 'Successfully fetched all members', members: members}) 
       } catch (error) {
         console.error("Failed to fetch all member:", error);
         return res.status(500).json({ message: "Internal server error." });
       }
}

export const Delete_Member_Controller = async (req, res) => {
       try {
         const {id} = req.params;
         console.log(id)
         
         if(!id){
          console.log('Account Id cannot found')
          res.status(400).json({message: 'Account Id cannot found'})
          return
         }
         
         const deletedMember = await LibrarianModel.findByIdAndDelete(id);

        if (!deletedMember) {
            return res.status(404).json({
                message: 'Librarian account not found',
                isSuccess: false
            });
        }

        return res.status(200).json({
            message: 'Successfully deleted account',
            isSuccess: true
        });

       } catch (error) {
         console.error("Failed to delete account:", error);
         return res.status(500).json({ message: "Internal server error." });
       }
}

export const Add_Member_Controller = async (req, res) => {
  const {
    lastname,
    firstname,
    middlename = "",
    suffix = "",
    role,
    email,
  } = req.body.form ?? {};

  if (!lastname || !firstname || !role || !email) {
    return res.status(400).json({ message: "Please complete all required fields." });
  }

  try {
    const existingMember = await LibrarianModel.findOne({
      email: email.trim().toLowerCase(),
    });

    if (existingMember) {
      return res.status(409).json({ message: "A member with this email already exists." });
    }
    
    const randomPassword = nanoid(10);
    const hashedPassword = await bcrypt.hash(randomPassword, 10);

    const newLibrarian = await LibrarianModel.create({
      lastname: lastname.trim(),
      firstname: firstname.trim(),
      middlename: middlename.trim(),
      suffix: suffix.trim(),
      role,
      email: email.trim().toLowerCase(),
      password: hashedPassword,
    });

    return res.status(201).json({ message: "Member added successfully.", librarian: newLibrarian, tempPassword:randomPassword  });
  } catch (error) {
    console.error("Failed to add member:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

