//'use strict';

// angular.module('MainCtrl', ['webrtcServices'])
// 	.controller('MainCtrl', ['$scope', 'feed', '$location', function($scope,feed,$location) {
// 	// $scope.awesomeThings = [
// 	//   'HTML5 Boilerplate',
// 	//   'AngularJS',
// 	//   'Karma'
// 	// ];
    
// 	// $scope.UserNamesLoad = function() {
// 	// 	var data = feed.review({'Id':'1'},
// 	// 		function(){
// 	// 			$scope.UserName = data;
// 	// 		}
// 	// 	);
// 	// };

// 	//var _ID=0;

// 	//Вход в систему-----------------------------------------------
// 	// $scope.getuser = function() {
// 	// 	//
// 	// 	return $http({
// 	// 		method: 'post',
// 	// 		url: '/sss',
// 	// 		params: {
// 	// 			//
// 	// 		}
// 	// 	});
// 	// }
// 	// $scope.blablabla = function(user)
// 	// {


// 	// 	console.log(user);
// 	// 	$location.path('/cont');
// 		//console.log(user.firstName + " " + user.firstName);
// 		// var data = feed.review({'Id':'json/logins.json'},function()
// 		// {
// 		// 	// Получение введенных данных
// 		// 	$scope.gdata = data;
// 		// 	var user_login = jQuery('#_login').val();
// 		// 	console.log(user_login);
// 		// 	var user_password = jQuery('#_passw').val();
// 		// 	console.log(user_password);
// 		// 	var P = false;
			
// 		// 	// Проверка корректности введенных данных
// 		// 	for (var i = 0; i < data.length; i++)
// 		// 	{
// 		// 		if ((user_login===data[i].login)&&(user_password===data[i].password))
// 		// 		{
// 		// 			P=true;
// 		// 			$.getJSON('json/profiles/ID' + data[i].id + '.json', function(tmp){
// 		// 				console.log("hi");
// 		// 				//Задание адреса ссылок для перехода на свой профиль
// 		// 				// jQuery("header .enter").text(profile.name+" "+profile.surname);
// 		// 				// jQuery("header .enter").attr("href","javascript:profile("+profile.id+")");
// 		// 				// jQuery("#MyProfile").attr("href","javascript:profile("+profile.id+")");
// 		// 				_ID=data[i].id;
// 		// 				console.log(_ID);
// 		// 				console.log('hello, ' + tmp.name);
// 		// 			});
						
// 		// 			//Отправка обработки в событие 
// 		// 			// $scope.$emit('Enter',data);
// 		// 			break;
// 		// 		}
// 		// 	}
			
// 		// 	//Если имя и пароль введены неверно
// 		// 	// if (P) {}	else jQuery('#condition').text('Неверное имя пользователя или пароль!');
// 		// 	if (P) {
				
// 		// 	} else {
// 		// 		console.log('error, uncorrect data');
// 		// 	}
// 		//});

// 	//};
// }]);
var globalUser = {uname: 0,
				ulname: 0,
				ufname: 0,
				ucountry: 0,
				id: 0};
var rCtrl = angular.module('rCtrl', ['registrationServices']);
//var eCtrl = angular.module('eCtrl', ['enterenceServices']);

rCtrl.controller('rCtrl', ['$location', '$scope', 'User',
	function ($location, $scope, User) {
		$scope.signUp = function () {
			User.registration($scope.username, $scope.firstname, $scope.lastname,
				$scope.useremail, $scope.password, $scope.country).then(function (data) {
				$location.path('/prof');
				globalUser.uname = data.data.username;
				globalUser.ulname = data.data.lastName;
				globalUser.ufname = data.data.firstName;
				globalUser.ucountry = data.data.country;
				globalUser.id = data.data._id;
				console.log("It's response!");
			});
		};
		$scope.user = globalUser;
// 	}
// ]);

// eCtrl.controller('eCtrl', ['$location', '$scope', 'User',
// 	function ($location, $scope, User) {

		$scope.signIn = function () {
			User.enterence($scope.username, $scope.password).then(function (data) {
				//console.log(data.data);
				console.log("1133546896486");
				$location.path('/prof');
				globalUser.uname = data.data.username;
				globalUser.ulname = data.data.lastName;
				globalUser.ufname = data.data.firstName;
				//globalUser.ucountry = data.data.country;
				globalUser.id = data.data._id;
				//$scope.uname = data.data.userName;
				console.log("It's response!");
			});
		};
		$scope.user = globalUser;
	}
]);

//"C:\Program Files\MongoDB\Server\3.0\bin\mongod.exe" --dbpath "D:\webrtc-v1\Project1\data\db"
