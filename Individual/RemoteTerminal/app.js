/*

일 시 : 2017.03

설 명 : Node.JS Express4 앱의 설정 파일 입니다.

수 정 :

*/

// 0. 필수 Express 모듈 로딩

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// 1. 사용자정의 모듈 로딩

var index = require('./routes/index');
var users = require('./routes/users');
import termRouter from './routes/terminal/terminal';

// 2. Express 객체 생성

var app = express();

// 3. View 엔진 설정 - EJS 템플릿으로 뷰 개발

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// 4. Express4 개발모드로 로거설정

app.use(logger('dev'));

// 5. bodyParser 설정. Post 요청 시 Form의 body로 요청정보가 들어옴.

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// 6. 정적 데이터 처리. JS나 리소스 위치를 참조한다.

app.use(express.static(path.join(__dirname, 'public')));

// 7. 사용자지정 라우팅 경로 설정

app.use('/', index);
app.use('/users', users);
app.use('/terminal', termRouter);

// 8. 에러 발생 시 처리하는 미들웨어

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// 9. 에러 발생 시 처리하는 핸들러

app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// 10. Express 객체를 export 함. bin/www에서 import하여 사용한다.

module.exports = app;
