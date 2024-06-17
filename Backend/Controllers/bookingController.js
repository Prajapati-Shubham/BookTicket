import Booking from "../models/bookings.js";
import Movie from "../models/movie.js";
import User from "../models/user.js";
import mongoose from "mongoose";
const bookingController = {
  newBooking: async (req, res, next) => {
    const { movie, date, seatNumber, user } = req.body;

    let existingMovie;
    let existingUser;
    try {
      existingMovie = await Movie.findById(movie);
      existingUser = await User.findById(user);
    } catch (error) {
      return console.error(error);
    }
    if (!existingMovie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }
    let booking;
    try {
      booking = new Booking({
        movie,
        date: new Date(`${date}`),
        seatNumber,
        user,
      });
      const session = mongoose.startSession();
      await session.startTransaction();
      existingUser.bookings.push(booking);
      existingMovie.bookings.push(booking);
      await existingUser.save({ session });
      await existingMovie.save({ session });
      await booking.save({ session });
      session.commitTransaction();
    } catch (error) {
      return console.error(error);
    }
    if (!booking) {
      return res.status(500).json({ message: "Unable to create booking" });
    }
    return res.status(200).json({ booking });
  },

  getBookingById: async (req, res, next) => {
    const id = req.params.id;

    let booking;
    try {
      booking = await Booking.findById(id);
    } catch (error) {
      return console.log(error);
    }
    if (!booking) {
      return res.status(500).json({ message: "Unexpected Error" });
    }
    return res.status(200).json({ booking });
  },

  deleteBooking: async (req, res, next) => {
    const id = request.params.id;
    let booking;
    try {
      booking = await Booking.findByIdAndRemove(id).populate("user movie");
      console.log(booking);
      const session = await mongoose.startSession();
      booking.user.bookings.pull(booking);
      booking.movies.bookings.pull(booking);
      await booking.movie.save({ session });
      await booking.user.save({ session });
      session.commitTransaction();
    } catch (error) {
      return console.log(error);
    }
    if (!booking) {
      return res.status(500).json({ message: "Unable to delete" });
    }
    return res.status(200).json({ message: "Succesfully Delete" });
  },
};

export default bookingController;
