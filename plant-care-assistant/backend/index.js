const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const routes = require("./routes/TaskRoutes");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = process.env.PORT || 8080

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true, // Allow cookies
  };

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: false}));
app.use(cors(corsOptions));

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected..."))
    .catch((err) => console.log(err));

app.use("/api", routes);

app.listen(PORT, () => console.log(`Listening at ${PORT}`));