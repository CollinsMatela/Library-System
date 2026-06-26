import Student_Registration_Model from "../models/Student_Registration_Model.js";
import bcrypt from "bcrypt";
import { nanoid } from 'nanoid'

const Student_Registration_Controller = async (req, res) => {
    const {
    // Student Information
    lastname,
    firstname,
    middlename,
    extensionname,

    year,
    month,
    day,
    age,
    sex,
    placeOfBirth,
    motherTongue,

    // Current Address
    currentAddressHouseNo,
    currentStreetName,
    currentBarangay,
    currentMunicipality,
    currentProvince,
    currentCountry,
    currentZipCode,

    // Permanent Address
    permanentAddressHouseNo,
    permanentStreetName,
    permanentBarangay,
    permanentMunicipality,
    permanentProvince,
    permanentCountry,
    permanentZipCode,

    // Father Information
    fatherLastname,
    fatherFirstname,
    fatherMiddlename,
    fatherContact,

    // Mother Information
    motherLastname,
    motherFirstname,
    motherMiddlename,
    motherContact,

    // Legal Guardian Information
    legalLastname,
    legalFirstname,
    legalMiddlename,
    legalContact,

    // Enrollment Information
    gradeLevel,
    branch
} = req.body;

    const username = `${lastname}.${Math.floor(Math.random() * 1000) + 1000}@lmlc.edu`;
    const defaultPassword = nanoid(10);
    const hashedPassword = await bcrypt.hash(defaultPassword, 10);

    try {
        console.log("Backend ", motherTongue)
        const isFullname = await Student_Registration_Model.findOne({lastname: lastname, firstname: firstname});
        if(isFullname) {
            return res.status(409).json({message: "The user is already existing."});
        }

        const newStudent = await Student_Registration_Model.create({
            id: crypto.randomUUID(),

            // Student Information
            lastname,
            firstname,
            middlename,
            extensionname,

            year,
            month,
            day,
            age,
            sex,
            placeOfBirth,
            motherTongue,

            // Current Address
            currentAddressHouseNo,
            currentStreetName,
            currentBarangay,
            currentMunicipality,
            currentProvince,
            currentCountry,
            currentZipCode,

            // Permanent Address
            permanentAddressHouseNo,
            permanentStreetName,
            permanentBarangay,
            permanentMunicipality,
            permanentProvince,
            permanentCountry,
            permanentZipCode,

            // Father Information
            fatherLastname,
            fatherFirstname,
            fatherMiddlename,
            fatherContact,

            // Mother Information
            motherLastname,
            motherFirstname,
            motherMiddlename,
            motherContact,

            // Legal Guardian Information
            legalLastname,
            legalFirstname,
            legalMiddlename,
            legalContact,

            role: "Student",

            // Enrollment Information
            gradeLevel,
            branch,

            // Account Information
            username: username,
            password: hashedPassword
        });

        const AccountData = {
              name: `${firstname} ${lastname}`,
              role: "Student",
              username: username,
              password: defaultPassword
        }
        
        res.status(201).json({ message: "Student registered successfully", isSuccess: true, account: AccountData});
    } catch (error) {
        console.error("Error registering student:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
export default Student_Registration_Controller;