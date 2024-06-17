import mongoose from "mongoose";
const Schema = mongoose.Schema;

const movieSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    showTime: {
      type: String,
      required: true,
    },
    releaseDate: {
      type: Date,
      required: true,
    },
    posterUrl: {
      type: String,
      required: true,
    },
    featured: {
      type: Boolean,
    },
    actors: [{ type: String, required: true }],
    bookings: [{ type: mongoose.Types.ObjectId, ref: "Booking" }],
    admin: {
      type: mongoose.Types.ObjectId,
      ref: "Admin",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const Movie = mongoose.model("Movie", movieSchema);
export default Movie;
