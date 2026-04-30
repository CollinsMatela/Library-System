import express from 'express'
import Change_Password_Controller from '../controllers/Change_Password_Controller.js'

const router = express.Router();
router.post("/change-password", Change_Password_Controller)

export default router;