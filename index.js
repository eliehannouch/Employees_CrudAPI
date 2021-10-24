const express = require("express");
const dotenv = require("dotenv");
const DB = require("./database").connectDB;
const app = express();
dotenv.config();

// define the employee routes
const employeeRoutes = require("./routes/employeeRoutes");

// connect to DB
DB();

// tell the server that we are dealing with json data
app.use(express.json());

app.use("/api/employees", employeeRoutes);

// listen to a given port
app.listen(process.env.PORT, () => {
  console.log("listening on port " + process.env.PORT);
});
