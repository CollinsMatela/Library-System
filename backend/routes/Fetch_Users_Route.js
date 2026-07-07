import express from "express"
import Fetch_Users_Controller from "../controllers/Fetch_Users_Controller.js"

const router = express.Router()

router.get("/get-users", Fetch_Users_Controller)

export default router;