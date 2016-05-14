var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
// var config = require('./config');

var User = new Schema({
  id : Number,
  name: String,
  student_id: String,
  college: String,
  department: String,
  grade: String,
  school_email: String,
  email: String,
  phone_number: String,
  success_item: String,
  fail_item: String,
  skill: String,
  youtube_link: String,
  cover_link: String,
  score: {
    success_item_score: Number,
    fail_item_score: Number,
    skill_score: Number,
    youtube_link_score: Number,
    cover_link_score: Number
  }
});

mongoose.model( 'User', User );
mongoose.connect('mongodb://localhost/ntucep8');