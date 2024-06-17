import mongoose from "mongoose";
const Schema = mongoose.Schema;
import passportLocalMongoose from "passport-local-mongoose";

const adminSchema = new Schema(
  {
    addedMovies: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Movie",
      },
    ],
  },
  {
    timestamps: true,
  }
);

adminSchema.plugin(passportLocalMongoose);

const Admin = mongoose.model("Admin", adminSchema);
export default Admin;
