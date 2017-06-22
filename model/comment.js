let mongoose = require('mongoose');

let CommentSchema = new mongoose.Schema({
  text: String,
  article_id : {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'article'
  }
  
});
module.exports = mongoose.model('Comments', CommentSchema);