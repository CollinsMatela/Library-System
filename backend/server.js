import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import Student_Registration_Route from "./routes/Sudent_Registration_Route.js";
import Employee_Registration_Route from "./routes/Employee_Registration_Route.js";
import Fetch_Student_Route from "./routes/Fetch_Student_Route.js";
import Fetch_Employee_Route from './routes/Fetch_Employee_Route.js';
import Delete_Student_Route from './routes/Delete_Student_Route.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/", Student_Registration_Route);
app.use("/", Employee_Registration_Route);
app.use("/", Fetch_Student_Route);
app.use("/", Fetch_Employee_Route);
app.use("/", Delete_Student_Route);

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));
  
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});