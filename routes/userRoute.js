import express from "express";
import {
  createnewUser,
  deleteUser,
  getalluser,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/createuser", createnewUser);
router.get("/getalluser", getalluser);
router.delete("/deleteuser/:id", deleteUser);

export default router;
