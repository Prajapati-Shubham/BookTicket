import Movie from "../models/movie.js";
import jwt from "jsonwebtoken";
import Admin from "../models/admin.js";
import mongoose from "mongoose";
const movieController = {
  addMovie: async (req, res, next) => {
    const extractToken = req.headers.authorization.split(" ")[1];
    if (!extractToken && extractToken.trim() === "") {
      return res.status(404).json({ message: "Token not found" });
    }
    // console.log(extractToken)
    let adminId;

    //veriy token
    jwt.verify(extractToken, process.env.SECRET, (err, decrypted) => {
      if (err) {
        return res.status(400).json({ message: err.message });
      } else {
        adminId = decrypted.id;
        return;
      }
    });

    //create new movie

    const {
      title,
      description,
      genre,
      showTime,
      releaseDate,
      posterUrl,
      featured,
      actors,
    } = req.body;
    if (
      !title &&
      title.trim() === "" &&
      !description &&
      description.trim() === "" &&
      !posterUrl &&
      posterUrl.trim() === ""
    ) {
      return res.status(422).json({ message: "Invalid Inputs" });
    }
    let movie;
    try {
      movie = new Movie({
        title,
        description,
        genre,
        showTime,
        releaseDate: new Date(`${releaseDate}`),
        posterUrl,
        featured,
        actors,
        admin: adminId,
      });
      const session = await mongoose.startSession();
      const adminUser = await Admin.findById(adminId);
      session.startTransaction();
      await movie.save({ session });
      adminUser.addedMovies.push(movie);
      await adminUser.save({ session });
      await session.commitTransaction();
    } catch (error) {
      return console.log(error);
    }
    if (!movie) {
      return res.status(500).json({ message: "Request failed" });
    }
    return res.status(201).json({ movie });
  },

  getAllMovies: async (req, res, next) => {
    let movies;
    try {
      movies = await Movie.find({});
    } catch (error) {
      return console.log(error);
    }
    if (!movies) {
      return res.status(500).josn({ message: "Request failed" });
    }
    return res.status(200).json({ movies });
  },

  getMovieById: async (req, res, next) => {
    const id = req.params.id;
    let movie;
    try {
      movie = await Movie.findById(id);
    } catch (error) {
      return console.log(error);
    }
    if (!movie) {
      return res.status(404).json({ message: "Invalid Movie Id" });
    }
    return res.status(200).json({ movie });
  },
};

export default movieController;
