const Employee = require("../models/employeeModel");

const checkUserExistence = async (req) => {
  try {
    const employeeExist = await Employee.findOne({
      $or: [{ username: req.body.username }, { email: req.body.email }],
    });
    if (employeeExist) return true;
    else return false;
  } catch (err) {
    console.log(err);
  }
};

exports.createEmployee = async (req, res) => {
  try {
    const doesEmployeeExist = await checkUserExistence(req);
    if (doesEmployeeExist) {
      return res.status(409).json({ message: "Employee already exists" });
    }
    const newEmployee = await Employee.create(req.body);

    res.status(201).json({
      status: "success",
      data: newEmployee,
    });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

exports.updateEmployee = async (req, res) => {
  try {
    if (req.body.username || req.body.email) {
      return res.status(400).json({
        message: "You are not allowed to update your email or username",
      });
    }
    const updatedEmployee = await Employee.findOneAndUpdate(
      { username: req.params.username },
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!updatedEmployee) {
      return res.status(404).json({
        message: "Employee with the provided username does not exist",
      });
    }
    return res.status(200).json({
      message: "Employee updated successfully",
      data: updatedEmployee,
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.deleteEmployee = async (req, res) => {
  try {
    const employeeTobeDeleted = await Employee.findByIdAndDelete(req.params.id);
    if (!employeeTobeDeleted) {
      return res.status(404).json({
        message: "Employee with the provided ID does not exist",
      });
    }
    return res
      .status(200)
      .json({ message: "The employee is deleted succcessfully" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.deleteAllEmployees = async (req, res) => {
  try {
    const deletedEmployees = await Employee.deleteMany();
    if (deletedEmployees.deletedCount == 0) {
      return res.status(404).json({
        message: "The employees DB is empty",
        data: deletedEmployees,
      });
    }
    return res
      .status(200)
      .json({ message: "All employees are deleted succcessfully" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findOne({ _id: req.params.id });
    if (!employee) {
      return res.status(404).json({ message: "The employee does not exist" });
    }
    return res.status(200).json({ data: employee });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find({});
    if (employees.length <= 0) {
      return res
        .status(404)
        .json({ message: "There is no employees in the DB" });
    }
    return res.status(200).json({ data: employees });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
