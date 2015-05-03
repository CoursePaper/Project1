'use strict';
var wunderlistServices = angular.module('wunderlistServices', [
]);

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

wunderlistServices.service('UserDel', ['$http', '$q',
 function ($http, $q) {
 	return ({
 		addUser: addUser
 	});

 	function addUser (username, firstname, lastname, useremail, password, country) {
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
 }]);