import express from "express";
import {Add_Member_Controller, Fetch_Members_Controller, Delete_Member_Controller} from "../controllers/Member_Controller.js";

const router = express.Router();

router.get("/fetch-members", Fetch_Members_Controller);
router.post("/add-member", Add_Member_Controller);
router.delete("/delete-member/:id", Delete_Member_Controller);

export default router;
