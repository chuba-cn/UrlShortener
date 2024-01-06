const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UrlSchema = new Schema({
    originalUrl: {
        type: String,
        required: true
    },
    shortUrl: String
});

module.exports = mongoose.model('Url', UrlSchema);