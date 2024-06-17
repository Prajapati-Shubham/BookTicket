import Admin from "../models/admin.js";
import jwt from "jsonwebtoken";

const adminController = {
  register: async (req, res, next) => {
    console.log("Api hits");
    try {
      const { username, password } = req.body;
      if (!username || !password) {
        return res
          .status(400)
          .json({ message: "Username and password are required" });
      }
      const registerAdmin = new Admin({
        username,
      });
      // console.log(registerUser)
      const registered = await Admin.register(registerAdmin, password);
      // console.log(registered);
      req.login(registered, (err) => {
        if (err) {
          return next(err);
        }
        res.status(200).json({ message: "Registered Successfully" });
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Internal server error", data: error.message });
    }
  },
  login: async (req, res, next) => {
    try {
      if (req.isAuthenticated()) {
        const token = jwt.sign({ id: req.user._id }, process.env.SECRET, {
          expiresIn: "7d",
        });
        return res
          .status(200)
          .json({ message: "Login Succesfull", token, id: req.user._id });
      } else {
        console.log(req.user);
        return res.status(400).json({ message: "Authentication Failed" });
      }
    } catch (err) {
      return res.status(500).json({ message: "Internal server Error" });
    }
  },
  getAdmins: async (req, res, next) => {
    let admins;
    try {
      admins = await Admin.find({});
    } catch (error) {
      return console.log(error);
    }
    if (!admins) {
      return res.status(404).json({ message: "Internal server error" });
    }
    return res.status(200).json({ admins });
  },
};

export default adminController;
