import dotenv from 'dotenv';
dotenv.config();

import { connectCloudinary } from "./config/cloudinary.js";
connectCloudinary(); // 👈 IMPORTANT: run AFTER dotenv

import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import Student_Registration_Route from "./routes/Sudent_Registration_Route.js";
import Employee_Registration_Route from "./routes/Employee_Registration_Route.js";
import Fetch_Student_Route from "./routes/Fetch_Student_Route.js";
import Fetch_Employee_Route from './routes/Fetch_Employee_Route.js';
import Delete_Student_Route from './routes/Delete_Student_Route.js';
import Delete_Employee_Route from './routes/Delete_Employee_Route.js';
import Edit_Student_Route from './routes/Edit_Student_Route.js';
import Edit_Employee_Route from './routes/Edit_Employee_Route.js'
import Login_Route from './routes/Login_Route.js';
import Upload_Manually_Route from './routes/Upload_Manually_Route.js'
import Change_Password_Route from './routes/Change_Password_Route.js'

import Fetch_Books_Route from './routes/Fetch_Books_Route.js'
import Fetch_ReferenceBooks_Route from './routes/Fetch_ReferenceBooks_Route.js'
import Fetch_EducationalBooks_Route from './routes/Fetch_EducationalBooks_Route.js'
import Fetch_ChildrensBooks_Route from './routes/Fetch_ChildrensBooks_Route.js'

import Fetch_BookById_Route from './routes/Fetch_BookById_Route.js'


import Fetch_One_Story_Route from './routes/Fetch_One_Story_Route.js'
import Change_Avatar_Route from './routes/Change_Avatar_Route.js';
import Quiz_Result_Route from './routes/Quiz_Result_Route.js';
import Update_Question_Route from './routes/Update_Question_Route.js';
import Fetch_QuizResults_Route from './routes/Fetch_QuizResults_Route.js';
import MarkAsRead_Route from './routes/MarkAsRead_Route.js';
import Fetch_MarkAsRead_Route from './routes/Fetch_MarkAsRead_Route.js';
import Fetch_All_Marked_Route from './routes/Fetch_All_Marked_Route.js'
import Fetch_Workbooks_Route from './routes/Fetch_Workbooks_Route.js'

import EditBookPageRoute from './routes/EditBookPageRoute.js'
import EditBookInformationRoute from './routes/EditBookInformationRoute.js'
import DeleteBookRoute from './routes/DeleteBookRoute.js'

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/", Student_Registration_Route);
app.use("/", Employee_Registration_Route);
app.use("/", Fetch_Student_Route);
app.use("/", Fetch_Employee_Route);
app.use("/", Delete_Student_Route);
app.use("/", Delete_Employee_Route);
app.use("/", Edit_Student_Route);
app.use("/", Edit_Employee_Route);
app.use("/", Login_Route);
app.use("/", Upload_Manually_Route);
app.use("/", Change_Password_Route);

app.use("/", Fetch_Books_Route);
app.use("/", Fetch_BookById_Route);

app.use("/", Fetch_One_Story_Route);
app.use("/", Change_Avatar_Route);
app.use("/", Quiz_Result_Route);
app.use("/", Update_Question_Route);
app.use("/", Fetch_QuizResults_Route);
app.use("/", MarkAsRead_Route);
app.use("/", Fetch_MarkAsRead_Route);
app.use("/", Fetch_All_Marked_Route);

app.use("/", EditBookPageRoute);
app.use("/", EditBookInformationRoute);
app.use("/", DeleteBookRoute);

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_LOCAL_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));
  
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});