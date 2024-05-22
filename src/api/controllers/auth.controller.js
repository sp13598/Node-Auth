import Role from "../models/Role.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { firstName, lastName, userName, email, password } = req.body;
    const existingUser = await User.findOne({
      $or: [{ email }, { userName }],
    });

    if (existingUser) {
      return res
        .status(400)
        .send("User with this email or username already exists!");
    }
    const role = await Role.find({ role: "User" });
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      firstName: firstName,
      lastName: lastName,
      userName: userName,
      email: email,
      password: hashPassword,
      roles: role,
    });
    await newUser.save();
    return res.status(200).send("User Registed Successfully!");
  } catch (error) {
    return res.status(500).send("Something Went Wrong!");
  }
};

export const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email })
    .populate("roles", "role");

    const { roles } = user;
    if (!user) {
      return res.status(404).send("User Not Found!");
    }
    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect) {
      return res.status(400).send("Password Incorrect!");
    }
    const token = jwt.sign( 
        { id: user._id, isAdmin: user.isAdmin, roles: roles },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    )

    res.cookie("access_token", token, { httpOnly: true })
    .status(200).json({ message: "Login Success!", token });
  } catch (error) {
    console.log(error)
    return res.status(500).send("Something Went Wrong!");
  }
};

export const registerAdmin = async (req, res) => {
    try {
        const role = await Role.find({});
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);
        const newUser = new User({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          userName: req.body.userName,
          email: req.body.email,
          password: hashPassword,
          isAdmin: true,
          roles: role,
        });
        await newUser.save();
        return res.status(200).send("Admin Registed Successfully!");
      } catch (error) {
        return res.status(500).send("Something Went Wrong!");
      }
}