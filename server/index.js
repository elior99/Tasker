const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "./.env") });

const app = express();
const port = process.env.PORT || 5000;


app.use(
  cors({
    origin: ['https://tasker-gamma.vercel.app'], // Add your frontend URLs here
  })
);

app.use(express.json());

const uri = process.env.ATLAS_URI;

mongoose.connect(uri, { useNewUrlParser: true });

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});



const usersRouter = require("./routes/users");
const tasksRouter = require("./routes/tasks");
const cookieParser = require("cookie-parser");
const session = require("express-session");


app.use("/users", usersRouter);
app.use("/tasks", tasksRouter);


app.use(cookieParser());
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: true, // Enable this if using HTTPS
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 24 hours (in milliseconds)
    },
  })
);


app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
