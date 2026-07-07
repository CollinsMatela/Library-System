import mongoose from "mongoose";

const UserRegistrationSchema = new mongoose.Schema({
      id: {type: String, required:true},

       // Personal Information
      lastname: { type: String, required: true },
      firstname: { type: String, required: true },
      middlename: { type: String, required: true },
      extensionname: { type: String, default: "" },

      year: { type: String, required: true },
      month: { type: String, required: true },
      day: { type: String, required: true },
      age: { type: Number, required: true },

      sex: { type: String, required: true },

      // Contact Information
      homeAddress: { type: String, required: true },
      city: { type: String, required: true },
      email: { type: String, default: "" },
      contact: { type: String, default: "" },
      institution: { type: String, default: "" },

      // Parent / Guardian Information
      parentName: { type: String, default: "" },
      parentContact: { type: String, default: "" },
      parentRelationship: { type: String, default: "" },

      username: {type: String, required:true},
      password: {type: String, required:true},

      isChangePassword: { type: Boolean, default: false },
      avatar: { type: String, default: "" },
      }, 
      {
      timestamps: true  
      });

const User_Registration_Model = mongoose.model("User_Model", UserRegistrationSchema);
export default User_Registration_Model;