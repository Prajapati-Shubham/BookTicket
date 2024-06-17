import User from "../models/user.js";
import bcrypt from "bcryptjs";

const userController = {
  register: async (req, res, next) => {
    console.log("Api hits");
    try {
      const { name, username, password } = req.body;
      const registerUser = new User({
        name,
        username,
      });
      // console.log(registerUser)
      const registered = await User.register(registerUser, password);
      // console.log(registered);
      req.login(registered, (err) => {
        if (err) {
          return next(err);
        }
        res.status(200).json({ message: "Registered Successfully" });
      });
    } catch (error) {
      res.status(500).json({ message: "Internal server error", data: error });
    }
  },
  login: async (req, res, next) => {
    try {
      if (req.isAuthenticated()) {
        let data = req.user;
        return res.status(200).json({ message: "Login Succesfull", data });
      } else {
        console.log(req.user);
        return res.status(400).json({ message: "Authentication Failed" });
      }
    } catch (err) {
      return res.status(500).json({ message: "Internal server Error" });
    }
  },

  getBookinOfUser: async (req, res, next) => {
    const id = req.params.id;
    let bookings;
    try {
      bookings = await bookings.find({ user: id });
    } catch (error) {
      return console.error(error);
    }
    if (!bookings) {
      return res.status(500).json({ message: "Unable to get bookings" });
    }
    return res.status(200).json({ bookings });
  },
};

export default userController;
