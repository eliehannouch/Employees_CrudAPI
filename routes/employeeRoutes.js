const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/employeesController");

router.get("/getEmployee/:id", employeeController.getEmployeeById);
router.get("/allEmployees", employeeController.getAllEmployees);
router.post("/newEmployee", employeeController.createEmployee);
router.patch("/updateEmployee/:username", employeeController.updateEmployee);

router.delete("/deleteAllEmployees", employeeController.deleteAllEmployees);
router.delete("/removeEmployee/:id", employeeController.deleteEmployee);

module.exports = router;
