import express from "express";
const router = express.Router();
import wrapAsync from "../utils/wrapAsync.js";
import movieController from "../Controllers/movieController.js";
//Add movie Router
router.post("/addMovie", wrapAsync(movieController.addMovie));
//get all movies
router.get("/getMovies", wrapAsync(movieController.getAllMovies));
//getMoveis by id
router.get("/:id", wrapAsync(movieController.getMovieById));
export default router;
