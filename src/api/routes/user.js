import express from "express";
import { getAllUsers, getUserByID } from "../controllers/user.controller.js";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

//get all users
router.get('/getAll', verifyAdmin, getAllUsers)

//get User by ID
router.get('/:id', verifyUser, getUserByID)

export default router;