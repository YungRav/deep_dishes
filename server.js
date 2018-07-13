const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");

// const users = require("./routes/api/users");
// const profile = require("./routes/api/profile");
const stores = require("./routes/api/stores");

const app = express();

// Body Parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB Config
const db = require("./config/keys").mongoURI;

//Connect to Mongoose
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log("MongoDB connected!");
  })
  .catch(err => {
    console.log(err);
  });

//Passport Middleware
app.use(passport.initialize());

//Passport Config
// require("./config/passport")(passport);

//Use Routes
// app.use("/api/users", users);
// app.use("/api/profile", profile);
app.use("/api/stores", stores);

// Server static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on Port: ${port}`);
});