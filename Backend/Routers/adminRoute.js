import express from "express";
import passport from "passport";
const router = express.Router();
import adminController from "../Controllers/adminController.js";
import wrapAsync from "../utils/wrapAsync.js";
//admin register
router.post("/register", wrapAsync(adminController.register));
// admin login
router.post("/login", passport.authenticate("Admin"), adminController.login);
//get all admins
router.get("/getAdmins",wrapAsync(adminController.getAdmins));
export default router;
