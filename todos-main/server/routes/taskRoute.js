const express = require("express");
const router = express.Router();
const routeControllers = require("../controllers/taskController")

router.route("/").get(routeControllers.getTasks).post(routeControllers.createTask);
router.route("/:id").patch(routeControllers.updateTaskFields).delete(routeControllers.deleteTask);

module.exports = router;