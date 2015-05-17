var globalUser = {
	uname: 0,
	ulname: 0,
	ufname: 0,
	ucountry: 0,
	_id: 0
};
var globalLesson = {
	studentUserName: 0,
	teacherUserName: 0,
	Languag: 0,
	date: 0,
	tim: 0
}
var lessonsArray = [];
var template = [{
	date: '---',
	tim: '---',
	languag: '---',
	teacher: {
		teacheUserNAme: '---'
	},
	student: {
		studentUserName: '---'
	}
}]
var rCtrl = angular.module('rCtrl', ['registrationServices']);

rCtrl.controller('rCtrl', ['$location', '$scope', 'User',
	function ($location, $scope, User) {
		$scope.signUp = function () {
			User.registration($scope.username, $scope.firstname, $scope.lastname,
				$scope.useremail, $scope.password, $scope.country).then(function (data) {
				if (data.data == 500) {
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
				}				
			});
		};
		$scope.user = globalUser;
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
					//loadLessons();
				}
			});
		};
		$scope.user = globalUser;











		$scope.sendMessage = function () {
			//console.log("!!!!!!!!!!!!Chat!!!!!!!!!!!");
			User.sendmess($scope.message, $scope.user).then(function (data) {
				/*if (data.data == 500) {
					console.log("Message error!");

				} else {
					console.log("Message okey!");
				}*/
			});
		};











		$scope.hideCreatingLessons = function () {
			$('#inviz').css("display", "none");
		};
		$scope.openCreationLessons = function() {
			$('#inviz').css("display", "block");
		}

		$scope.createLesson = function () {
			User.addlesson($scope.studentUserName, $scope.user._id, $scope.languag, $scope.date, $scope.tim).then(function (data) {
				console.log(data.data);
				if (data.data == 500) {
					$('p#error').remove();
					$('<p>Error! Invalid user name of student!</p>').attr('id','error').insertBefore('div#inviz');
				} else {
					if (data.data == 400) {
						$('p#error').remove();
						$('<p>Error! Such lesson is already exist!</p>').attr('id','error').insertBefore('div#inviz');
					} else {
						globalLesson.studentUserName = data.data.student.studentUserName;
						globalLesson.teacherUserName = data.data.teacher.teacherUserName;
						globalLesson.languag = data.data.languag;
						globalLesson.date = (data.data.date.day + '.' + data.data.date.month + '.' + data.data.date.year);
						globalLesson.tim = data.data.tim;
						console.log(data.data);
						$('p#error').remove();
						$('<p>Success! The lesson were added!</p>').attr('id','error').insertBefore('form.login-form');
						$scope.loadLessons();
					}
				}
			});
		}
		$scope.lesson = globalLesson;

		// $scope.enterLesson = function () {

		// }
		$scope.loadLessons = function () {
			User.loadlessons($scope.user._id).then(function (data){
				if (data.data != 500) {
					lessonsArray = data.data;
					//delete lessonsArray[lessonsArray-1];
					console.log(data);
					$scope.lesArray = lessonsArray;
				} else {
					lessonsArray = template;
					$scope.lesArray = template;
				}
			});
		}
		$scope.lesArray = lessonsArray;

		$scope.main = function () {
			function hasGetUserMedia() {
			return !!(navigator.getUserMedia ||
				navigator.webkitGetUserMedia ||
				navigator.mozGetUserMedia ||
				navigator.msGetUserMedia);
			}
			if (hasGetUserMedia) {
				console.log('GUM is supported in your brouser!');
			}
			else {
				console.log('GUM is NOT supported in your brouser!');
			}
			navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
			videoElement = document.querySelector('#localVideo');
			subVideoElement = document.querySelector('#remoteVideo');

			function successCallback(stream) {
			  window.stream = stream;
			  videoElement.src = window.URL.createObjectURL(stream);
			  videoElement.play();
			  subVideoElement.src = window.URL.createObjectURL(stream);
			  subVideoElement.play();
			  console.log('U should see the image of you camera');

			 //  $scope.peer = new Peer($scope.user._id);
			 //  // Call a peer, providing our mediaStream
			 //  if ($scope.lesson.studentUserName == $scope.user._id) {
			 //  	Id = $scope.lesson.teacherUserName;
			 //  } else {
			 //  	Id = $scope.lesson.studentUserName;
			 //  }
			 //  $scope.call = peer.call($scope.lesson.Id, stream);
			 //  //answer
			 //  peer.on(call, function(call) {
				// // Answer the call, providing our mediaStream
				// call.answer(stream);
			 //  });
			 //  call.on(stream, function(stream) {
			 //     // `stream` is the MediaStream of the remote peer.
				//  // Here you'd add it to an HTML video/canvas element.
			 //  });
			}

			function errorCallback(error){
			  console.log('navigator.getUserMedia error: ', error);
			}

			function start(){
			  navigator.getUserMedia({video:true}, successCallback, errorCallback);
			}
			console.log('before GUM');
			start();
			console.log('after GUM');
		}

	}
]);

//"C:\Program Files\MongoDB\Server\3.0\bin\mongod.exe" --dbpath "D:\webrtc-v1\Project1\data\db"

// var peer = new Peer($scope.user._id ,{port: 3000, debug: 1});
// //peer.on('connection',function(conn){});//data conection
// //
// // Call a peer, providing our mediaStream
// var call = peer.call('dest-peer-id',mediaStream);

// //peer.on(event, callback);
// peer.on('call', function(call) {
//   // Answer the call, providing our mediaStream
//   call.answer(mediaStream);
// });

// call.on('stream', function(stream) {
//   // `stream` is the MediaStream of the remote peer.
//   // Here you'd add it to an HTML video/canvas element.
// });


// Connecting peer
// var peer = new Peer('anotherid', {key: 'apikey'});
// var conn = peer.connect('someid');
// conn.on('open', function(){
//   conn.send('hi!');
// });
