'use strict';
//проверка на существование GUM
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