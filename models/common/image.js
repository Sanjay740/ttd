const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    imageName: { type: String },
    imageId: { type: String },
})

module.exports = imageSchema;