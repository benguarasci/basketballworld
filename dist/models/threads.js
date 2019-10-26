"use strict";
var mongoose = require('mongoose');
var threadSchema = new mongoose.Schema({
    _id: {
        type: String
    },
    title: {
        type: String
    },
    body: {
        type: String
    }
});
mongoose.model('Thread', threadSchema);
