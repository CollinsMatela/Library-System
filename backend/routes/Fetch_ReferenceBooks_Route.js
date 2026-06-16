// routes/booksRoutes.js

import express from "express";

import Fetch_ReferenceBooks_Controller from "../controllers/Fetch_ReferenceBooks_Controller.js";

const router = express.Router();

router.get("/get-referencebooks", Fetch_ReferenceBooks_Controller);

export default router;