const mongoose = require('mongoose')

const listSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User'
    },
}, { timestamps: true });


const listModel = mongoose.model('list', listSchema);

module.exports = listModel;

