import express from "express";
const router = express.Router();
import bookingController from "../Controllers/bookingController.js";
import wrapAsync from "../utils/wrapAsync.js";

//get booking by id
router.get("/:id", wrapAsync(bookingController.getBookingById));
//delete booking
router.delete("delete/:id", wrapAsync(bookingController.deleteBooking));
//booking Seat
router.post("/newBooking", wrapAsync(bookingController.newBooking));

export default router;
