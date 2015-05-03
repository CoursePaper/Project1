
var mongoose = require('mongoose');

module.exports = mongoose.model('Lesson',{
	/*idTeacher: String,
	username: String,
	password: String,
	email: String,
	firstName: String,
	lastName: String,
	country: String*/
	language: String
});