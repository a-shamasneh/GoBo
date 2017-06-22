var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//create new instance of the mongoose.schema. the schema takes an 
//object that shows the shape of your database entries.
var ArticleSchema = new Schema({
 content: String,
 comment:{
    type : Array,
    }
});
//export our module to use in server.js
module.exports = mongoose.model('Article', ArticleSchema);
