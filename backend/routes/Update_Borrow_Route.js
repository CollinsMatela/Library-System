import express from "express";
import Update_Borrow_Controller from "../controllers/Update_Borrow_Controller.js";

const Update_Borrow_Route = express.Router();

Update_Borrow_Route.put("/update-borrow", Update_Borrow_Controller);

export default Update_Borrow_Route;