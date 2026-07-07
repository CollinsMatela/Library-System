import User_Registration_Model from "../models/User_Registration_Model.js";
import bcrypt from "bcrypt";
import { nanoid } from 'nanoid'
import { randomUUID } from "crypto";

const User_Registration_Controller = async (req, res) => {
    const {
    // Student Information
    lastname, firstname, middlename, extensionname, year, month, day, age, sex,
    // Contact Information
    homeAddress, city, email, contact, institution,
    // Parent / Guardian
    parentName, parentContact, parentRelationship } = req.body;

    const username = email;
    const defaultPassword = nanoid(10);
    const hashedPassword = await bcrypt.hash(defaultPassword, 10);

    try {
        
        const isEmail = await User_Registration_Model.findOne({email: email});

        if(isEmail) {
            return res.status(409).json({message: "The email is already existing."});
        }

        if(!lastname || !firstname || !middlename || !year || !month || !day || 
           !homeAddress || !city || !email || !contact || !institution
        ) {
            return res.status(409).json({message: "Fill all required information."});
        }

        if (
            Number(age) < 18 &&
            (!parentName || !parentContact || !parentRelationship)
        ) {
            return res.status(400).json({
                message: "Parent/Guardian information is required."
            });
        }

        const contactRegex = /^09\d{9}$/;

        if (contact && !contactRegex.test(contact)) {
            return res.status(400).json({
                message: "Invalid contact number."
            });
        }

        if (parentContact && !contactRegex.test(parentContact)) {
            return res.status(400).json({
                message: "Invalid parent contact number."
            });
        }

        const newUser = await User_Registration_Model.create({
            id: crypto.randomUUID(),

            lastname, firstname, middlename, extensionname,

            year, month, day, age, sex,

            homeAddress, city, email, contact, institution, parentName, parentContact, parentRelationship,
            
            username: username,
            password: hashedPassword
        });

        const AccountData = {
              name: `${firstname} ${lastname}`,
              role: "User",
              username: username,
              password: defaultPassword
        }
        
        res.status(201).json({ message: "User registered successfully", isSuccess: true, account: AccountData});
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: "Internal server error: Error registrating user" });
    }
}
export default User_Registration_Controller;