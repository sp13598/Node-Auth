import User from "../models/User.js"

export const getAllUsers = async(req, res) => {
    try {
        const users = await User.find();
        return res.status(200).json( { message: "List Of Users!", users})
    } catch (error) {
        return res.status(500).send("Something Went Wrong..!");
    }
}

export const getUserByID = async(req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if(!user)
            return res.status(404).send("User Not Found..!");
        return res.status(200).json({ message: "User Details", user})
    } catch (error) {
        return res.status(500).send("Something Went Wrong..!");
    }
}