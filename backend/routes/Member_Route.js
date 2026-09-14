import express from "express";
import {Add_Member_Controller, Fetch_Members_Controller, Delete_Member_Controller, Update_Role_Librarian_Controller} from "../controllers/Member_Controller.js";

const router = express.Router();

router.get("/fetch-members", Fetch_Members_Controller);
router.post("/add-member", Add_Member_Controller);
router.delete("/delete-member/:id", Delete_Member_Controller);
router.put("/update-role-librarian/:id", Update_Role_Librarian_Controller);

export default router;
