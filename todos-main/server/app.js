const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 8080;
const connectDb = require("./config/db");

connectDb()

// Routes
let taskRoutes = require("./routes/taskRoute");


const corsOptions = {
  // origin: 'https://todos-qci4.onrender.com',
  origin: "*"
}

// middlewares
app.use(cors(corsOptions));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// Task Routes
app.use("/api/tasks/", taskRoutes)

app.listen(PORT , () => {
    console.log(`Server is listing on PORT ${PORT}`)
})