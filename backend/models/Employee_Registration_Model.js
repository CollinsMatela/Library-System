import mongoose from "mongoose";

const Employee_Registration_Schema = new mongoose.Schema({
    id: { type: String, required: true },

    lastname: { type: String, required: true },
    firstname: { type: String, required: true },
    middlename: { type: String, required: true },
    year: { type: String, required: true },
    month: { type: String, required: true },
    day: { type: String, required: true },
    age: { type: String, required: true },
    gender: { type: String, required: true },
    email: { type: String, required: true },
    contact: { type: String, required: true },

    role: { type: String, required: true },
    gradeLevel: { type: String, required: true },
    branch: { type: String, required: true },

    username: { type: String, required: true },
    password: { type: String, required: true },

    isChangePassword: { type: Boolean, default: false },
    
}, { timestamps: true });

const Employee_Registration_Model = mongoose.model("Employee_Registration", Employee_Registration_Schema);
export default Employee_Registration_Model;