var express = require('express');
var router = express.Router();
var loginReq = require('../libs/loginRequired');
var postModel = require('../models/PostModel');
var commentModel = require('../models/commentModel');

// CSRF 셋팅
var csrf = require('csurf');
var csrfProtection = csrf({ cookie : true });
var bodyParser = require('body-parser');
var parseForm = bodyParser.urlencoded({ extended : false });

function myMiddle(req, res, next){

  req.test = "Test middle ...";

  next();

}

// 이미지를 저장하는 위치 설정

var fs = require('fs');
var path = require('path');
var strUploadPath = path.join(__dirname, '../uploads');

// Multer 설정

var multer = require('multer');
var storage = multer.diskStorage({

  'destination' : function(req, file, callback){

    callback(null, strUploadPath);

  },
  'filename' : function(req, file, callback){

    callback(null, 'posts-' + Date.now() + '.' + file.mimetype.split('/')[1]);

  }

});

var upload = multer({'storage' : storage});

/* GET home page. */
router.get('/', myMiddle, (req, res, next) => {

  //res.send('<b style="color:skyblue; font-size:40px;">Post app</b>');

  postModel.find({}, function(err, arrData){

    res.render('posts/list', { 'posts' : arrData });

  });

});

router.get('/write', loginReq, parseForm, csrfProtection, function(req, res){

  var postData = {};

  res.render('posts/edit', {'post' : postData, 'csrfToken' : req.csrfToken()});

})

router.post('/write', loginReq, upload.single('thumbnail'), csrfProtection, function(req, res){

  var reqData = req.body;
  var reqFileData = req.file;

  var post = new postModel({

    'title' : reqData.title,
    'content' : reqData.content,
    'thumbnail' : (reqFileData) ? reqFileData.filename : "",
    'username' : req.user.username

  });

  var validateError = post.validateSync();

  if(validateError){

    res.send(validateError);

  }
  else{

    post.save(function(err){

      res.redirect('/posts');

    });

  }

  // res.send(req.body);

});

router.get('/detail/:id', function(req, res){

  // var numPostIdx = req.params.id;
  //
  // postModel.findOne({'id' : numPostIdx}, function(err, postData){
  //
  //   commentModel.find({'post_id' : numPostIdx}, function(err, commentData){
  //
  //     res.render('posts/detail', {'post' : postData, 'comment' : commentData});
  //
  //   });
  //
  // });`

  var post;
  var numPostIdx = req.params.id;
  postModel.findOne({'id' : numPostIdx}).exec().then(function(date){

    post = date;

    return commentModel.find({'post_id' : numPostIdx}).exec();

  })
  .then(function(data){

    res.render('posts/detail', {'post' : post, 'comments' : data})

  })

});

router.get('/edit/:id', loginReq, parseForm, csrfProtection, function(req, res){

  postModel.findOne({'id' : req.params.id}, function(err, postData){

    res.render('posts/edit', {'post' : postData, 'csrfToken' : req.csrfToken()});

  });

});

router.post('/edit/:id', loginReq, upload.single('thumbnail'), csrfProtection, function(req, res){

  var formBody = req.body;
  var getParams = req.params;
  var fileParams = req.file;

  postModel.findOne( {id : getParams.id} , function(err, post){

        if(fileParams){  //요청중에 파일이 존재 할시 지운다.

            var strBeforePath = post.thumbnail;

            if(strBeforePath){

              fs.unlinkSync( strUploadPath + '/' + strBeforePath );

            }

        }

        var query = {

          'title' : formBody.title,
          'content' : formBody.content,
          'thumbnail' : (fileParams) ? fileParams.filename : post.thumbnail

        };

        postModel.update({'id' : getParams.id}, {'$set' : query}, function(){

          res.redirect('/posts/detail/' + getParams.id);

        });
    });

});

router.get('/delete/:id', function(req, res){

  postModel.remove({'id' : req.params.id}, function(err){

    res.redirect('/posts');

  });

});

router.post('/ajax_comment/insert', function(req, res){

  var formBody = req.body;

  var comment = new commentModel({

      'post_id' : Number(formBody.post_id),
      'content' : formBody.content

  });

  comment.save(function(err, cmt){

    res.json({ message : "success" , id : cmt.id , content : cmt.content });

  });

});

router.post('/ajax_comment/delete', function(req, res){

  if(req.xhr){

    commentModel.remove({
      'id' : parseInt(req.body.comment_id)
    }, function(err){

      res.json({  message : "success" });

    });

  }
  else{

    res.status(404).send("Not found ...");

  }

});

router.get('/test', function(req, res){

  res.render('posts/test');

});

module.exports = router;
