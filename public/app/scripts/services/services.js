//'use strict';

// angular.module('webrtcServices', ['ngResource'])
// //.factory('feed'
// 	.service('feed','$http',
// 	// function($resource){
// 	// 	return $resource(
// 	// 		'/:Id',
// 	// 		{Id:'@Id'},{'review': {'method':'GET',isArray:true}}
// 	// 	);
// 	// }
// 	function getuser($http) {
// 		//
// 		return $http({
// 			method: 'post',
// 			url: '/sss',
// 			params: {
// 				//
// 			}
// 		});
// 	}
// );

var registrationServices = angular.module('registrationServices', []);
//var enterenceServices = angular.module('enterenceServices', []);

registrationServices.service('User', ['$http', '$q',
 function ($http, $q) {
 	return ({
 		registration: registration,
 		enterence: enterence
 	});

 	function registration (username, firstname, lastname, useremail, password, country) {
 		return $http({
 			method: 'post',
 			url: 'signup',
 			params: {
 				username: username,
 				useremail: useremail,
 				firstname: firstname,
 				lastname:lastname,
 				password: password,
 				country: country
 			}
 		});
 	}
// }]);

// enterenceServices.service('User', ['$http', '$q',
//  function ($http, $q) {
//  	return ({
//  		enterence: enterence
//  	});

 	function enterence (username, password) {
 		return $http({
 			method: 'post',
 			url: 'signin',
 			params: {
 				username: username,
 				password: password
 			}
 		});
 	}
 }]);