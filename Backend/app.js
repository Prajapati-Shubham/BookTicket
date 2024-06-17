import dotenv from "dotenv";
if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

import express from "express";
const app = express();
import mongoose from "mongoose";
import LocalStrategy from "passport-local";
import passport from "passport";
import cors from "cors";
import MongoStore from "connect-mongo";
import session from "express-session";
import User from "./models/user.js";
import Admin from "./models/admin.js";
import userRoute from "./Routers/userRoute.js";
import adminRoute from "./Routers/adminRoute.js";
import movieRoute from "./Routers/movieRouter.js";
import bookingRoute from "./Routers/bookingRoute.js";
import ExpressError from "./utils/expressError.js";

// DB connection
// const DBURL = "mongodb://127.0.0.1:27017/movieBook";
const DBURL = `mongodb+srv://prajapatishubham575:${process.env.DBPASS}@cluster0.yktdszf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
main()
  .then(() => {
    console.log("Connected to db");
  })
  .catch((err) => {
    console.log("Error in connection", err.message);
  });
async function main() {
  await mongoose.connect(DBURL);
}

// Express session
const store = MongoStore.create({
  mongoUrl: DBURL,
  crypto: {
    secret: process.env.SECRET,
  },
  touchAfter: 24 * 3600,
});

store.on("error", (err) => {
  console.error("Failed to connect to Mongo session store", err.message);
});

const sessionOptions = {
    store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      expires: Date.now() * 7 * 24 * 60 * 60 * 1000,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    },
};

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(session(sessionOptions));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Configure Passport to use the local strategy
passport.use("User", new LocalStrategy(User.authenticate()));
// Serialize and deserialize user instances to and from the session
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Configure Passport to use the local strategy
passport.use("Admin", new LocalStrategy(Admin.authenticate()));
// Serialize and deserialize user instances to and from the session
passport.serializeUser(Admin.serializeUser());
passport.deserializeUser(Admin.deserializeUser());

// User route
app.use("/user", userRoute);
//admin route
app.use("/admin", adminRoute);
//movie route
app.use("/movie", movieRoute);
//bookign Route
app.use("/booking", bookingRoute);
// Root route
app.get("/", (req, res) => {
  res.send("Root path");
});

// Catch all other routes
app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page not found"));
});

// Custom error handling
app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Something went wrong" } = err;
  res.status(statusCode).json({ message });
});

// Server port settings
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
