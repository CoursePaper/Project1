//'use strict';

var globalUser = {uname: 0,
				ulname: 0,
				ufname: 0,
				ucountry: 0,
				_id: 0};
var globalLesson = {
	studentUserName: 0,
	teacherUserName: 0,
	Languag: 0,
	date: 0,
	tim: 0
}
var rCtrl = angular.module('rCtrl', ['registrationServices']);
//var eCtrl = angular.module('eCtrl', ['enterenceServices']);

rCtrl.controller('rCtrl', ['$location', '$scope', 'User',
	function ($location, $scope, User) {
		$scope.signUp = function () {
			User.registration($scope.username, $scope.firstname, $scope.lastname,
				$scope.useremail, $scope.password, $scope.country).then(function (data) {
				if (data.data == 500) {
					console.log("sup error");
					//$location.path('/sup');
					$('p#error').remove();
					$('#login-pass').val('');
					$('<p>Error! Such user name is allready exist!</p>').attr('id','error').insertBefore('div.ln');
				} else {
					console.log(data);
					$location.path('/prof');
					globalUser.uname = data.data.username;
					globalUser.ulname = data.data.lastName;
					globalUser.ufname = data.data.firstName;
					globalUser.ucountry = data.data.country;
					globalUser._id = data.data._id;
					//console.log("It's response!");
				}				
			});
		};
		$scope.user = globalUser;
// 	}
// ]);

// eCtrl.controller('eCtrl', ['$location', '$scope', 'User',
// 	function ($location, $scope, User) {

		$scope.signIn = function () {
			User.enterence($scope.username, $scope.password).then(function (data) {
				if (data.data == 500) {
					console.log("sin error");
					$location.path('/sin');
					$('p#error').remove();
					$('<p>Error! Invalid user name or password!</p>').attr('id','error').insertBefore('button#login');

				} else {
					console.log(data);
					$location.path('/prof');
					globalUser.uname = data.data.username;
					globalUser.ulname = data.data.lastName;
					globalUser.ufname = data.data.firstName;
					globalUser.ucountry = data.data.country;
					globalUser._id = data.data._id;
					console.log("It's response!");
				}
			});
		};
		$scope.user = globalUser;

		$scope.addLesson = function () {
			if ($('#addlesson').text() == "Close") {
				$('#inviz').css("display", "none");
				$('#addlesson').text("Create new lesson");
			} else {
				$('#inviz').css("display", "block");
				$('#addlesson').text("Close");
			}

			//$('#inviz').css("display", "block");
		};

		$scope.createLesson = function () {
			User.addlesson($scope.studentUserName, $scope.user._id, $scope.languag, $scope.date, $scope.tim).then(function (data) {
				console.log(data.data);
				if (data.data == 500) {
					$('p#error').remove();
					$('<p>Error! Invalid user name of student!</p>').attr('id','error').insertBefore('div#inviz');
				} else {
					globalLesson.studentUserName = data.data.studentUserName;
					globalLesson.teacherUserName = data.data.teacherUserName;
					globalLesson.languag = data.data.languag;
					globalLesson.date = data.data.date;
					globalLesson.tim = data.data.tim;

					$('p#error').remove();
					$('<p>Error! Invalid user name or password!</p>').attr('id','error').insertBefore('div#inviz');
					$('#inviz').css("display", "none");
				}
			});
		}
		$scope.lesson = globalLesson;
	}
]);

//"C:\Program Files\MongoDB\Server\3.0\bin\mongod.exe" --dbpath "D:\webrtc-v1\Project1\data\db"
