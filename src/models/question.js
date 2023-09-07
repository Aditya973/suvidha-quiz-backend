const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    a: {
        type: String,
        required: true,
    },
    b: {
        type: String,
        required: true,
    },
    c: {
        type: String,
        required: true,
    },
    d: {
        type: String,
        required: true,
    },
    correct: {
        type: String,
        required: true
    }
},{timestamps: true});

const Question = mongoose.model('Question',questionSchema);

module.exports = Question;