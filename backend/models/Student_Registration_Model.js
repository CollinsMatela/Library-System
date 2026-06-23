import mongoose from "mongoose";

const StudentRegistrationSchema = new mongoose.Schema({
      id: {type: String, required:true},

      lastname: {type: String, required:true},
      firstname: {type: String, required:true},
      middlename: {type: String, required:true},
      extensionname: {type: String, required:true},

      year: {type: String, required:true},
      month: {type: String, required:true},
      day: {type: String, required:true},
      age: {type: String, required:true},

      sex: {type: String, required:true},

      placeOfBirth: {type: String, required:true},
      motherTounge: {type: String, required:true},

      disability: {type: String, required:true},

      currentAddressHouseNo: {type: String, required:true},
      currentStreetName: {type: String, required:true},
      currentBarangay: {type: String, required:true},
      currentMunicipality: {type: String, required:true},
      currentProvince: {type: String, required:true},
      currentCountry: {type: String, required:true},
      currentZipCode: {type: String, required:true},

      permanentAddressHouseNo: {type: String, required:true},
      permanentStreetName: {type: String, required:true},
      permanentBarangay: {type: String, required:true},
      permanentMunicipality: {type: String, required:true},
      permanentProvince: {type: String, required:true},
      permanentCountry: {type: String, required:true},
      permanentZipCode: {type: String, required:true},

      fatherLastname: {type: String, required:true},
      fatherFirstname: {type: String, required:true},
      fatherMiddlename: {type: String, required:true},
      fatherContact: {type: String, required:true},
      
      motherLastname: {type: String, required:true},
      motherFirstname: {type: String, required:true},
      motherMiddlename: {type: String, required:true},
      motherContact: {type: String, required:true},

      legalLastname: {type: String, required:true},
      legalFirstname: {type: String, required:true},
      legalMiddlename: {type: String, required:true},
      legalContact: {type: String, required:true},

      role: {type: String, required:true},
      gradeLevel: {type: String, required:true},
      branch: {type: String, required:true},

      username: {type: String, required:true},
      password: {type: String, required:true},

      isChangePassword: { type: Boolean, default: false },
      avatar: { type: String, default: "" },
      }, 
      {
      timestamps: true  
      });

const Student_Registration_Model = mongoose.model("Student_Registration", StudentRegistrationSchema);
export default Student_Registration_Model;