const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UrlSchema = new Schema({
    original_url: {
        type: String,
        required: true
    },
    short_url: String
});

module.exports = mongoose.model('Url', UrlSchema);