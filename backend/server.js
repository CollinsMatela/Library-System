import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import Student_Registration_Route from "./routes/Sudent_Registration_Route.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/", Student_Registration_Route);

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