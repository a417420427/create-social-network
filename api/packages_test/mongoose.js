var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var db = require('./mongooseConnect').db;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(a, b, c) {
  console.log(a, b, c);
  schemaTest();
});

function schemaTest() {
  var blogSchema = new Schema({
    title: String,
    author: String,
    body: String,
    comments: [{ body: String, date: Date }],
    date: { type: Date, default: Date.now },
    hidden: Boolean,
    meta: {
      votes: Number,
      favs: Number,
    },
  });

  var Blog = mongoose.model('Blog', blogSchema);
}
