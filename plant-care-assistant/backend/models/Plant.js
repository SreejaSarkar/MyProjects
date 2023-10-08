const mongoose = require("mongoose");

const plantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    appearance: {
        type: String,
        required: true
    },
    growthCare: {
        type: String,
        required: true
    },
    usage: {
        type: String,
        required: true
      },
    areas: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("plants", plantSchema)