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
var rCtrl = angular.module('rCtrl', ['registrationServices']);

rCtrl.controller('rCtrl', ['$location', '$scope', 'User',
	function ($location, $scope, User) {

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

			//////////////////////////////////
			var videoElement = document.querySelector('#container video');
			var subVideoElement = document.querySelector('#subVideo video');

			//navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

			function successCallback(stream) {
			  window.stream = stream;
			  videoElement.src = window.URL.createObjectURL(stream);
			  videoElement.play();
			  subVideoElement.src = window.URL.createObjectURL(stream);
			  subVideoElement.play();
			  console.log('U should see the image of you camera');
			}

			function errorCallback(error){
			  console.log('navigator.getUserMedia error: ', error);
			}

			function start(){
			  navigator.getUserMedia({video:true}, successCallback, errorCallback);
			  console.log('after GUM');
			}
			start();
		}

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
					$('<p>Success! The lesson were added!</p>').attr('id','error').insertBefore('form');
				}
			});
		}
		$scope.lesson = globalLesson;

		$scope.enterLesson = function (data) {

		}

		$scope.loadLessons = function (data) {
			User.loadlessons($scope.user.username).then(function(){

			});

		}

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

// $scope.main = function () {
// 			// function hasGetUserMedia() {
// 			// return !!(navigator.getUserMedia ||
// 			// 	navigator.webkitGetUserMedia ||
// 			// 	navigator.mozGetUserMedia ||
// 			// 	navigator.msGetUserMedia);
// 			// }
// 			// if (hasGetUserMedia) {
// 			// 	console.log('GUM is supported in your brouser!');
// 			// }
// 			// else {
// 			// 	console.log('GUM is NOT supported in your brouser!');
// 			// }
// 			navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
// 			$scope.videoElement = document.querySelector('#container video');
// 			$scope.subVideoElement = document.querySelector('#subVideo video');

// 			$scope.successCallback = function (stream) {
// 			  window.stream = stream;
// 			  $scope.videoElement.src = window.URL.createObjectURL(stream);
// 			  $scope.videoElement.play();
// 			  subVideoElement.src = window.URL.createObjectURL(stream);
// 			  subVideoElement.play();
// 			  console.log('U should see the image of you camera');
// 			}

// 			$scope.errorCallback = function (error){
// 			  console.log('navigator.getUserMedia error: ', error);
// 			}

// 			$scope.start = function (){
// 			  navigator.getUserMedia({video:true}, $scope.successCallback, $scope.errorCallback);
// 			}
// 			console.log('before GUM');
// 			$scope.start();
// 			console.log('after GUM');
// 		}
