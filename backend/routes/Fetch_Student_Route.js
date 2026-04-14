import express from "express"
import Fetch_Students_Controller from "../controllers/Fetch_Students_Controller.js"

const router = express.Router()

router.get("/get-students", Fetch_Students_Controller)

export default router;