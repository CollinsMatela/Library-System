import express from 'express'
import Fetch_ChildrensBooks_Controller from "../controllers/Fetch_ChildrensBooks_Controller.js";


const router = express.Router();

router.get(
  "/get-childrensbooks",
  Fetch_ChildrensBooks_Controller
);

export default router;