const mongoose = require('mongoose');

const connectionSchema = new mongoose.Schema({
    Quantity: Number,
    ConnectionTypeID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ConnectionType',
    },
    CurrentTypeID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CurrentType',
    },
    LevelID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Level',
    },
});

module.exports = mongoose.model('Connection', connectionSchema);