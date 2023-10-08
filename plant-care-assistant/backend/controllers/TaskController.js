const TaskModel = require("../models/Task")

module.exports.getTasks = async (req, res) => {
    const tasks = await TaskModel.find()
    res.send(tasks)
}

module.exports.getTasksByPlantId = async (req, res) => {
    const { plantId } = req.params;
  
    const tasks = await TaskModel.find({ plantId })
    res.send(tasks)
  }

  module.exports.getTaskById = async (req, res) => {
    const { id } = req.params;
  
    const tasks = await TaskModel.find({ _id: id })
    res.send(tasks)
  }
  

module.exports.saveTask = (req, res) => {
    const {title, description, plantId} = req.body;
    console.log("Title: ", title);
    console.log("Description: ", description);
    TaskModel.create({ title, description, plantId })
    .then((data) => {
        console.log("Saved successfully...");
        res.status(201).send(data);
    }).catch((err) => {
        console.log(err);
        res.send({error: err, msg: "Something went wrong!"})
    })
};

module.exports.updateTask = (req, res) => {
    const {id} = req.params;
    const {title, description, observation, progress} = req.body;
    
    TaskModel.findByIdAndUpdate(id, {title, description, observation, progress})
    .then(() => res.send("Updated successfully"))
    .catch((err) => {
        console.log(err);
        res.send({error: err, msg: "Something went wrong!"})
    });
};

module.exports.deleteTask = (req, res) => {
    const {id} = req.params;
    
    TaskModel.findByIdAndDelete(id)
    .then(() => res.send("Deleted successfully"))
    .catch((err) => {
        console.log(err);
        res.send({error: err, msg: "Something went wrong!"})
    });
};