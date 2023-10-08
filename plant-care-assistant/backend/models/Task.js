const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    observation: {
        type: String
    },
    progress: {
        type: Number,
        validate: {
            validator: Number.isInteger,
            message: 'value is not an integer value'
          }
    },
    plantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user-plants'
    }
});

module.exports = mongoose.model("tasks", taskSchema)