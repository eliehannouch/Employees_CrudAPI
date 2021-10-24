const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: [true, "Please enter the employee name"],
      trim: true,
      minLength: 3,
    },
    username: {
      type: String,
      required: [true, "Please enter a unique username"],
      unique: true,
      trim: true,
      minLength: 5,
      maxLength: 20,
    },
    email: {
      type: String,
      required: [true, "Please enter a unique email"],
      trim: true,
      unique: true,
      lowercase: true,
    },
    age: {
      type: Number,
    },
    job: {
      type: String,
      required: [true, "Please enter the job name"],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Employee", employeeSchema);
