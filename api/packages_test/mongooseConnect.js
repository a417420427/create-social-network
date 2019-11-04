var mongoose = require('mongoose');
var MONGO_URL = `mongodb://localhost:27017/test`;
mongoose.connect(MONGO_URL);

module.exports.db = mongoose.connection;
