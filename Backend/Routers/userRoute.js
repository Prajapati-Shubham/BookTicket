import express from "express";
const router = express.Router();
import passport from "passport";
import userController from "../Controllers/userController.js";
import wrapAsync from "../utils/wrapAsync.js";
//registration route
router.post("/register", wrapAsync(userController.register));
//login route
router.post("/login", passport.authenticate("User"), userController.login);
//getALl booking of user
router.get("/bookings/:id", wrapAsync(userController.getBookinOfUser));

export default router;
