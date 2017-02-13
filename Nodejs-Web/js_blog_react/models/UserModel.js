var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autoIncre = require('mongoose-auto-increment');

var UserSchema = new Schema({

  'username' : {

    'type' : String,
    'required' : [true, '아이디는 필수입니다.']

  },
  'password' : {

    'type' : String,
    'required' : [true, '패스웓는 필수항목입니다.']

  },
  'created_at' : {

        'type' : Date,
        'default' : Date.now()

    }

});

UserSchema.plugin( autoIncre.plugin , { model : "user", field : "id" , startAt : 1 } );
module.exports = mongoose.model('user' , UserSchema);
