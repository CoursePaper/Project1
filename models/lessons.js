
var mongoose = require('mongoose');

module.exports = mongoose.model('Lesson',{
	idStudent: String,
	idTeacher: String,
	languag: String,
	date: String,
	tim: String
});