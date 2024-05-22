import express from "express";
import roleRoute from "./role.js";
import authRoute from "./auth.js"
import userRoute from "./user.js"
const router = express.Router();

// Role Routes
router.use("/role", roleRoute);

//Auth Routes 
router.use('/auth', authRoute);

//User Route
router.use('/user', userRoute)

export default router;