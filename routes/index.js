var express = require('express');
var router = express.Router();
var userModule=require('../modules/user');


function checkUsername(req,res,next){
  var username=req.body.username;
  var checkexitusername= userModule.findOne({username:username});
  checkexitusername.exec((err,data)=>{
    if(err) throw err;
    if(data){
    return  res.render('signup', { title: 'Passsword Management System Sign Up ' , msg: 'email already exhistt' });
    }
    next();
  });
}

function checkEmail(req,res,next){
  var email=req.body.email;
  var checkexitemail= userModule.findOne({email:email});
  checkexitemail.exec((err,data)=>{
    if(err) throw err;
    if(data){
    return  res.render('signup', { title: 'Passsword Management System Sign Up ' , msg: 'email already exhistt' });
    }
    next();
  });
}



router.get('/', function(req, res, next) {
  res.render('index', { title: 'Passsword Management System' });
});

router.get('/signup', function(req, res, next) {
  res.render('signup', { title: 'Passsword Management System Sign Up ' , msg:'' });
});

router.post('/signup' ,checkUsername,checkEmail, function(req, res, next) {
  var username=req.body.username;
  var email=req.body.email;
  var password=req.body.password;
  var confpassword=req.body.confpassword;

  // confpassword
  if(password !=confpassword){
    res.render('signup', { title: 'Passsword Management System Sign Up ' , msg: 'rpassword not match' });
  }else{

  var userDetails = new userModule({
    username:username,
    email:email,
    password:password
  });
  userDetails.save((err,res)=>{
    if(err) throw err;
    res.render('signup', { title: 'Passsword Management System Sign Up ' , msg: 'register sucessfully' });
  });
}

});


router.get('/passwordCategory', function(req, res, next) {
  res.render('passwordCategory', { title: 'Passsword cat. ' });
});

router.get('/addNewCategory', function(req, res, next) {
  res.render('addNewCategory', { title: 'Add New Catagory' });
});

router.get('/addNewPassword', function(req, res, next) {
  res.render('addNewPassword', { title: 'password management system' });
});

router.get('/viewAllPassword', function(req, res, next) {
  res.render('viewAllPassword', { title: 'password management system' });
});

module.exports = router;
