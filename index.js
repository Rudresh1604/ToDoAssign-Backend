require("dotenv").config();
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("./config/dbConfig");

// ! required route file
const userRoute = require("./Routes/user");
app.use(express.json());
app.use(cors({ origin: "*" }));

// ! porting the routes
app.use(cors());

app.use(cookieParser());
app.use("/api/users", userRoute);

app.listen(3001, () => {
  console.log("Server Started ...");
});
