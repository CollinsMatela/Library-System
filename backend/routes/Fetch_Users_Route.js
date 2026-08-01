import express from "express"
import Fetch_Users_Controller from "../controllers/Fetch_Users_Controller.js"
import { generalLimiter } from '../middleware/rateLimiter.js'

const router = express.Router()

router.get("/get-users", generalLimiter, Fetch_Users_Controller)

export default router;