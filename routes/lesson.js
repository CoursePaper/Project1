var express = require('express');
var router = express.Router();
var Lesson = require('../models/lessons');
var User = require('../models/user');

router.get('/addlesson', function(req, res){
    console.log("Hello new lesson!");
		/*var newLesson = new Lesson();
		newLesson.language = "English lesson " + i;

		newLesson.save(function(err) {
                            if (err){
                                console.log('Error in Saving lesson: '+err);  
                                throw err;  
                            }
                            console.log('Lesson ' + i + ' Registration succesful');
                            i++;    
                            return res.end();
        });
*/
});

module.exports = router;