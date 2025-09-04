const Task = require("../models/Task.js");

module.exports.getTasks = async (req, res) => {
    let tasks = await Task.find();
    if (!tasks) {
        return res.json({
            message: "No Task Created"
        })
    }
    return res.json({ tasks });
}

module.exports.createTask = async (req, res) => {
    try {
        let newTask = new Task({
            ...req.body
        });

        let svdTask = await newTask.save();

        res.status(201).json({
            success: true,
            message: "Task created successfully",
            task: svdTask,
        });
    } catch {
        console.error("Task Creation Error:", err);
        res.status(500).json({
            success: false,
            message: "Internal server error while creating task",
            error: err.message,
        });
    }
}

module.exports.updateTaskFields = async (req, res) => {
    try {
        let { id } = req.params;
        let updatedTask = await Task.findByIdAndUpdate(id, req.body, { new: true });
        return res.status(200).json({
            success: true,
            message: "Task Updated Successfully"
        });
    } catch (err) {
        console.error("Task Updation Error:", err);
        res.status(500).json({
            success: false,
            message: "Internal server error while creating task",
            error: err.message,
        });
    }
}

module.exports.deleteTask = async (req, res) => {
    let { id } = req.params;
    let task = await Task.findByIdAndDelete(id);
    res.json(task)
}