var express = require('express');
var router = express.Router();
var Lesson = require('../models/lessons');
var User = require('../models/user');

var isAuthenticated = function (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler 
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects
	if (req.isAuthenticated())
		return next();
	// if the user is not authenticated then redirect him to the login page
	res.redirect('/');
}

module.exports = function(passport){

	/* GET login page. */
	router.get('/', function(req, res){
		//res.render('index',{message: req.flash('message')});
		res.sendfile("public/app/index.html");
	});
	
	router.post('/signin', function(req, res, next) {
		//console.log(req.body);
		User.findOne({ 'username' :  req.param('username') }, function(err, user){
                    console.log(req.param('username'));
                    // In case of any error, return using the done method
                    if (err){
                        console.log('Error in SignIn: '+err);
                        return done(err);
                    }
                    // already exists
                    if (user) {
                    	if(user.password == req.param('password')){
                    		console.log("Okey");
                    		//res.send(user);
                            res.json(user);
                    	}
                    	else {
                    		console.log("incorrected password");
                    		res.json(500)
                    	}
                        //return done(null, false, req.flash('message','User Already Exists'));
                    } else {
                        console.log("user not found");
                        res.json(500);
                    }
                });		
	  // passport.authenticate('login', function(err, user, info) {
	  //   /*if (err) { return next(err); }*/
	  //   if (!user) { return res.sendStatus(500);}
	  //   req.logIn(user, function(err) {
	  //   	// res.json(res.user);
	  //     if (err) { return next(err); }
	  //     console.log("auth");
	  //     res.end();
	  //     // res.sendfile("./public/app/profile.html");/* res.redirect('/home');*//*res.json(req.user);*/
	  //   });
	  // })(req, res, next);
	});

	router.get('/addlesson', function(req, res){

            User.findOne({ 'username' :  req.param('studentUserName') }, function(err, userStudent){
                        // In case of any error, return using the done method
                        if (err){
                            console.log('Error in reqistrate new lesson: '+err);
                            return done(err);
                        }
                        if (userStudent) {
                            console.log("Such student is finded");
                            var newLesson = new Lesson();
                            newLesson.idStudent = userStudent._id;
                            newLesson.idTeacher = req.param('idTeacher');
                            newLesson.languag = req.param('languag');
                            newLesson.date = req.param('date');
                            newLesson.tim = req.param('tim');
                            User.findOne({ '_id' :  req.param('idTeacher') }, function(err, userTeacher){
                                    if (userTeacher) {
                                        res.json({studentUserName: userStudent.username, teacherUserName: userTeacher.username,
                                            languag: req.param('languag'), date: req.param('date'), tim: req.param('tim')});
                                    }
                                });
                            
                        } else {
                            console.log("Such student is  not finded");
                            res.json(500);
                        }
            });
    });

router.post('/signup', function(req, res){
		User.findOne({ 'username' :  req.param('username') }, function(err, user){
                    // In case of any error, return using the done method
                    if (err){
                        console.log('Error in SignUp: '+err);
                        return done(err);
                    }
                    console.log(req.param('username'));
                    // already exists
                    if (user) {
                        console.log('User already exists with username: '+ user.username);
                        res.json(500);
                        //return done(null, false, req.flash('message','User Already Exists'));
                    } else {
                        // if there is no user with that email
                        // create the user
                        var newUser = new User();
                        console.log(req.param('username'));
                        // set the user's local credentials
                        newUser.username = req.param('username');
                        newUser.password = (req.param('password'));
                        newUser.email = req.param('useremail');
                        newUser.firstName = req.param('firstname');
                        newUser.lastName = req.param('lastname');
                        newUser.country = req.param('country');
                        // save the user
                        newUser.save(function(err) {
                            if (err){
                                console.log('Error in Saving user: '+err);  
                                throw err;  
                            }
                            console.log('User Registration succesful');    
                            //return done(newUser);
                            res.json(newUser);
                        });
                    }});
		
	});

	// router.post('/signup', function(req, res, next) {
	//   passport.authenticate('signup', function(err, user, info) {
	//     /*if (err) { return next(err); }*/
	//     if (user) { return res.sendStatus({name: "hello"});}
	//     req.logIn(user, function(err) {
	//     	// res.json(res.user);
	//       if (err) { return next(err); }
	//       res.json(user);/* res.redirect('/home');*//*res.json(req.user);*/
	//     });
	//   })(req, res, next);
	// });

	/* GET Home Page */
	// router.get('/home', isAuthenticated, function(req, res){
	// 	res.json({ user: req.user });
	// 	console.log(req.user);
	// 	//res.end();
	// 	/*res.json({user: req.user.firstName});*/
	// });

	/* Handle Logout */
	router.get('/signout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

	return router;
}





