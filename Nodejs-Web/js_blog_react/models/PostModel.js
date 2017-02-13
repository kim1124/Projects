var mongoose = require('mongoose');
var schema = mongoose.Schema;
var autoIncre = require('mongoose-auto-increment');

var postSchema = new schema({

  'title' : {

    'type' : String,
    'required' : [true, '제목은 필수입력 항목입니다.']

  },
  'content' : {

    'type' : String,
    'required' : [true, '내용은 필수입력 항목입니다.']

  },
  'thumbnail' : String,
  'created_at' : {

    'type' : Date,
    'default' : Date.now()

  },
  'username' : String

});

postSchema.virtual('getDate').get(function(){

  var dataObject = new Date(this.created_at);

  return {

    'year' : dataObject.getFullYear(),
    'month' : dataObject.getMonth() + 1,
    'day' : dataObject.getDate()

  };

});

postSchema.plugin(autoIncre.plugin, {

  'model' : 'post',
  'field' : 'id',
  'startAt' : 1

});

module.exports = mongoose.model('post', postSchema);
