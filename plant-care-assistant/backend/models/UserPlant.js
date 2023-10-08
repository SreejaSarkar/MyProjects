const mongoose = require("mongoose");

const userPlantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        data: Buffer, 
        contentType: String, 
      },
    imageName: {
        type: String,
        required: true
    },
    userEmail: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("user-plants", userPlantSchema)