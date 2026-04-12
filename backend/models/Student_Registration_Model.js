import mongoose from "mongoose";

const StudentRegistrationSchema = new mongoose.Schema({
      id: {type: String, required:true},
      lastname: {type: String, required:true},
      firstname: {type: String, required:true},
      middlename: {type: String, required:true},
      year: {type: String, required:true},
      month: {type: String, required:true},
      day: {type: String, required:true},
      age: {type: String, required:true},
      gender: {type: String, required:true},
      parentLastname: {type: String, required:true},
      parentFirstname: {type: String, required:true},
      parentMiddlename: {type: String, required:true},
      parentEmail: {type: String, required:true},
      parentContact: {type: String, required:true},
      parentRelationship: {type: String, required:true},
      gradeLevel: {type: String, required:true},
      branch: {type: String, required:true},
      username: {type: String, required:true},
      password: {type: String, required:true},
}, {timestamps: true});

const Student_Registration_Model = mongoose.model("Student_Registration", StudentRegistrationSchema);
export default Student_Registration_Model;