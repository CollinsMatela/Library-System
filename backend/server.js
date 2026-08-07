import dotenv from 'dotenv';
dotenv.config();

import { connectCloudinary } from "./config/cloudinary.js";
connectCloudinary(); // 👈 IMPORTANT: run AFTER dotenv

import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import dns from "dns";

dns.setServers(["8.8.8.8", "1.1.1.1"]);

import User_Registration_Route from "./routes/User_Registration_Route.js";
import Fetch_Users_Route from "./routes/Fetch_Users_Route.js";
import Delete_Student_Route from './routes/Delete_Student_Route.js';
import Edit_Student_Route from './routes/Edit_Student_Route.js';
import Login_Route from './routes/Login_Route.js';
import Upload_Manually_Route from './routes/Upload_Manually_Route.js'
import Change_Password_Route from './routes/Change_Password_Route.js'

import Fetch_Books_Route from './routes/Fetch_Books_Route.js'
import Fetch_BookById_Route from './routes/Fetch_BookById_Route.js'


import Fetch_One_Story_Route from './routes/Fetch_One_Story_Route.js'
import Change_Avatar_Route from './routes/Change_Avatar_Route.js';

import EditBookPageRoute from './routes/EditBookPageRoute.js'
import EditBookInformationRoute from './routes/EditBookInformationRoute.js'
import DeleteBookRoute from './routes/DeleteBookRoute.js'

import Borrow_Route from './routes/Borrow_Route.js'
import Fetch_BorrowById_Route from './routes/Fetch_BorrowById_Route.js';
import Fetch_AllBorrow_Route from './routes/Fetch_AllBorrow_Route.js'
import Update_Borrow_Route from './routes/Update_Borrow_Route.js';
import ApproveBorrowRoute from './routes/ApproveBorrowRoute.js'
import ReturnBorrowRoute from './routes/ReturnBorrowRoute.js'
import DeleteUserRequestRoute from './routes/DeleteUserRequestRoute.js'
import DeleteBorrow_Route from './routes/DeleteBorrow_Route.js'

import SummarizationRoute from './routes/SummarizationRoute.js'
import LogBookRoute from "./routes/LogBookRoute.js";
import FetchLogBookRoute from "./routes/FetchLogBookRoute.js"
import UpdateLeaveRoute from "./routes/UpdateLeaveRoute.js"

console.log("🔥 SERVER FILE STARTED");
const app = express();

app.set("trust proxy", 1);

app.use(cors({
  origin: process.env.LOCAL_URL,
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB connection
let isConnected = false;

const connectDB = async () => {
  if (isConnected || mongoose.connection.readyState === 1) {
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);

    isConnected = true;

    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
    throw error;
  }
};

app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Database connection failed"
    });
  }
});

// Routes
app.use("/", User_Registration_Route);
app.use("/", Fetch_Users_Route);
app.use("/", Delete_Student_Route);
app.use("/", Edit_Student_Route);
app.use("/", Login_Route);
app.use("/", Upload_Manually_Route);
app.use("/", Change_Password_Route);

app.use("/", Fetch_Books_Route);
app.use("/", Fetch_BookById_Route);

app.use("/", Fetch_One_Story_Route);
app.use("/", Change_Avatar_Route);

app.use("/", EditBookPageRoute);
app.use("/", EditBookInformationRoute);
app.use("/", DeleteBookRoute);

app.use("/", Borrow_Route);
app.use("/", Fetch_BorrowById_Route);
app.use("/", Fetch_AllBorrow_Route);
app.use("/", Update_Borrow_Route);
app.use("/", ApproveBorrowRoute);
app.use("/", ReturnBorrowRoute);
app.use("/", DeleteUserRequestRoute);
app.use("/", DeleteBorrow_Route);

app.use("/", SummarizationRoute);

app.use("/", LogBookRoute);
app.use("/", FetchLogBookRoute);
app.use("/", UpdateLeaveRoute);

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

const PORT = 5000

app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});

export default app;