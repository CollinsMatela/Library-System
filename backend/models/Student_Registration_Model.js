import mongoose from "mongoose";

const StudentRegistrationSchema = new mongoose.Schema({
      id: {type: String, required:true},

      lastname: {type: String, required:true},
      firstname: {type: String, required:true},
      middlename: {type: String, required:true},
      extensionname: {type: String, default: ""},

      year: {type: String, required:true},
      month: {type: String, required:true},
      day: {type: String, required:true},
      age: {type: String, required:true},

      sex: {type: String, required:true},

      placeOfBirth: {type: String, required:true},
      motherTongue: {type: String, required:true},

      currentAddressHouseNo: {type: String, required:true},
      currentStreetName: {type: String, required:true},
      currentBarangay: {type: String, required:true},
      currentMunicipality: {type: String, required:true},
      currentProvince: {type: String, required:true},
      currentCountry: {type: String, required:true},
      currentZipCode: {type: String, required:true},

      permanentAddressHouseNo: {type: String, default: ""},
      permanentStreetName: {type: String, default: ""},
      permanentBarangay: {type: String, default: ""},
      permanentMunicipality: {type: String, default: ""},
      permanentProvince: {type: String, default: ""},
      permanentCountry: {type: String, default: ""},
      permanentZipCode: {type: String, default: ""},

      fatherLastname: {type: String, default: ""},
      fatherFirstname: {type: String, default: ""},
      fatherMiddlename: {type: String, default: ""},
      fatherContact: {type: String, default: ""},
      
      motherLastname: {type: String, default: ""},
      motherFirstname: {type: String, default: ""},
      motherMiddlename: {type: String, default: ""},
      motherContact: {type: String, default: ""},

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