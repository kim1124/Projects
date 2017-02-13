var express = require('express');
var router = express.Router();
var userModel = require('../models/UserModel');
var passwordHash = require('../libs/passwdHash');

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    },
    function(req, username, password, done) {
        userModel.findOne({
            username: username,
            password: passwordHash(password)
        }, function(err, user) {
            if (!user) {
                return done(null, false, {
                    message: '아이디 또는 비밀번호 오류 입니다.'
                });
            } else {
                return done(null, user);
            }
        });
    }
));

router.get('/', function(req, res) {

    res.send("Account routes");

});

router.get('/join', function(req, res) {

    res.render('accounts/join.ejs');

});

router.post('/join', function(req, res) {

    var formBody = req.body;

    var User = new userModel({

        'username': formBody.username,
        'password': passwordHash(formBody.password)

    });

    User.save(function(err) {

        res.send('<script>alert("회원가입에 성공하였습니다."); location.href="/accounts/login";</script>');

    });

});

router.get('/login', function(req, res){

    res.render('accounts/login', { flashMessage : req.flash().error });

});

router.post('/login', passport.authenticate('local', {
        failureRedirect: '/accounts/login',
        failureFlash: true
    }),
    function(req, res){
        res.send('<script>alert("로그인 성공");location.href="/posts";</script>');
    }
);

router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/accounts/login');
});

router.get('/success', function(req, res) {

    res.send("Account success");

});

router.get('/status', function(req, res){

  res.json({  'isLogin' : req.isAuthenticated() });

});

module.exports = router;
