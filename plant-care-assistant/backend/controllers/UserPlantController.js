const UserPlantModel = require("../models/UserPlant")

module.exports.getPlants = async (req, res) => {
    const plants = await UserPlantModel.find()
    res.send(plants)
}

module.exports.getPlantsByEmailId = async (req, res) => {
    const { userEmail } = req.params;
    const plants = await UserPlantModel.find({ userEmail})
    res.send(plants)
}

module.exports.savePlant = (req, res) => {
    const {name, description, imageName, userEmail} = req.body;
    const image = {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      };
    console.log("Title: ", name);
    console.log("Description: ", description);
    console.log("Image: ", image);
    UserPlantModel.create({ name, description, image, imageName, userEmail })
    .then((data) => {
        console.log("Saved successfully...");
        res.status(201).send(data);
    }).catch((err) => {
        console.log(err);
        res.send({error: err, msg: "Something went wrong!"})
    })
};

module.exports.updatePlant = (req, res) => {
    const {id} = req.params;
    const {name, description} = req.body;
    let updateData = { name, description };
    if (req.file) {
        // If req.file exists (an image is being uploaded)
        updateData.image = {
          data: req.file.buffer,
          contentType: req.file.mimetype,
        };
      }
    UserPlantModel.findByIdAndUpdate(id, updateData)
    .then(() => res.send("Updated successfully"))
    .catch((err) => {
        console.log(err);
        res.send({error: err, msg: "Something went wrong!"})
    });
};

module.exports.deletePlant = (req, res) => {
    const {id} = req.params;
    
    UserPlantModel.findByIdAndDelete(id)
    .then(() => res.send("Deleted successfully"))
    .catch((err) => {
        console.log(err);
        res.send({error: err, msg: "Something went wrong!"})
    });
};

